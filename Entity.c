#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "Util.h"
#include "Draw.h"
#include "Anim.h"

#include "Entity.h"


/////////////////////////////
// Entity_New
//
//
Entity *Entity_New(){
	Entity *e;

	e=malloc(sizeof(Entity));

	e->type=0;
	vec2_set(e->pos,0.0f,0.0f);

	vec2_set(e->vel,0.0f,0.0f);
	e->radius=1.0f;
	e->mass=1.0f;
	e->elast=0.0f;
	e->fric_static=1.0f;
	e->fric_dynamic=0.0f;

	//e->img=NULL;
	AnimPlay_SetImg(&e->anim,NULL);

	e->proc=NULL;
	e->postproc=NULL;
	e->collision=NULL;

	return(e);
}


/////////////////////////////
// Entity_Destroy
//
//
void Entity_Destroy(Entity *e){
	free(e);
}


/////////////////////////////
// Entity_Copy
//
//
Entity *Entity_Copy(Entity *e){
	Entity *n;

	n=Entity_New();

	n->type=e->type;
	vec2_set(n->pos,e->pos[0],e->pos[1]);

	vec2_set(n->vel,e->vel[0],e->vel[1]);
	n->radius=e->radius;
	n->mass=e->mass;
	n->elast=e->elast;
	n->fric_static=e->fric_static;
	n->fric_dynamic=e->fric_dynamic;

	//n->img=e->img;
	AnimPlay_Copy(&n->anim,&e->anim);

	n->proc=e->proc;
	n->postproc=e->postproc;
	n->collision=e->collision;

	return(n);
}


/////////////////////////////
// Entity_Draw
//
//
void Entity_Draw(Entity *e){
	//if(e->img)
	//	Draw_DrawImg(e->img,e->pos[0],e->pos[1]);
	AnimPlay_Draw(&e->anim,e->pos[0],e->pos[1]);
}


/////////////////////////////
// Entity_Process
//
//
void Entity_Process(Entity *b,int ft){

	// Launch method
	if(b->proc){
		b->proc(b,ft);
	}
}


/////////////////////////////
// Entity_PostProcess
//
//
void Entity_PostProcess(Entity *e,int ft){
	float qlen,len;

	// Launch method
	if(e->postproc){
		e->postproc(e,ft);
	}

	// Determine if there is movement
	qlen=vec2_dot(e->vel,e->vel);
	if(qlen>0.0f){

		// Update position
		vec2_plus(e->pos,e->pos,e->vel);

		// Aply friction
		len=sqrtf(qlen);
		if(len<e->fric_static){
			// Stopped by static friction
			vec2_set(e->vel,0,0);
		}else{
			// Aply dynamic friction
			vec2_scale(e->vel,e->vel,
				1.0f-(e->fric_dynamic+(e->fric_static/len)));
		}
	}

	// Animate
	AnimPlay_IncTime(&e->anim,ft);
}


/////////////////////////////
// Entity_CollisionResponse
//
// Response to a collision
void Entity_CollisionResponse(
	Entity *b1,Entity *b2,float t,vec2 n)
{
	float moment;
	vec2 temp,temp2;
	float elast;

	if(b1->mass>0.0f && b2->mass>0.0f){
		// Calculate elasticity
		elast=(b1->mass*b1->elast+b2->mass*b2->elast)/
			(b1->mass+b2->mass);

		// Collision between two massed balls
		moment=((1.0f+elast)*b1->mass*b2->mass*
					(vec2_dot(b1->vel,n)+vec2_dot(b2->vel,n)))
				/(b1->mass+b2->mass);
		vec2_scale(temp,n,moment/b1->mass);
		vec2_minus(b1->vel,b1->vel,temp);
		vec2_scale(temp,n,moment/b2->mass);
		vec2_plus(b2->vel,b2->vel,temp);
	}else
	if(b1->mass>0.0f && b2->mass<=0.0f){
		// Collision between a massed ball and a fixed ball
		moment=(1.0f+b1->elast)*
					(vec2_dot(b1->vel,n));
		vec2_scale(temp,n,moment);
		vec2_minus(b1->vel,b1->vel,temp);
	}else
	if(b1->mass<=0.0f && b2->mass>0.0f){
		// Collision between a massed ball and a fixed ball
		// (imposible, but better safe)
		moment=(1.0f+b2->elast)*
					(vec2_dot(b2->vel,n));
		vec2_scale(temp,n,moment);
		vec2_plus(b2->vel,b2->vel,temp);
	}else{
		// Collision between 2 fixed balls
		// (imposible, but better safe)
		vec2_set(b1->vel,0,0);
		vec2_set(b2->vel,0,0);
	}
}


/////////////////////////////
// Entity_Collide
//
//
int Entity_Collide(Entity *b1,Entity *b2){
	float t;
	vec2 n;
	vec2 cir1[2];
	vec2 cir1i,cir2i;
	Entity *b_aux;

	// FIX: Swap colision order based on moving object
	if(vec2_dot(b1->vel,b1->vel)<vec2_dot(b2->vel,b2->vel)){
		b_aux=b1;
		b1=b2;
		b2=b_aux;
	}

	// Prepare testing vectors
	vec2_copy(cir1[0],b1->pos);
	vec2_plus(cir1[1],b1->pos,b1->vel);
	vec2_minus(cir1[1],cir1[1],b2->vel);

	if(Colision_CircleCircle(cir1,b1->radius,b2->pos,b2->radius,&t,n)){
		int response=1;

		// Check the collision methods
		if(b1->collision){
			if(!b1->collision(b1,b2,t,n)){
				response=0;
			}
		}
		if(b2->collision){
			vec2 n2;
			vec2_scale(n2,n,-1.0f);
			if(!b2->collision(b2,b1,t,n2)){
				response=0;
			}
		}

		// Collision response
		if(response){
			Entity_CollisionResponse(b1,b2,t,n);
			return(1);
		}else{
			return(0);
		}
	}
	return(0);
}


/////////////////////////////
// Entity_AddVelLimit
//
//
void Entity_AddVelLimit(Entity *e,vec2 vel,float limit){
	float vlen_orig,vlen;
	vec2 dir,vel_temp;

	// Normalize vel getting vel
	vlen_orig=sqrtf(vec2_dot(vel,vel));
	vec2_scale(dir,vel,1.0f/vlen_orig);

	// Limit velocity
	vlen=vec2_dot(e->vel,dir);
	if(vlen<limit){
		vlen=limit-vlen;
		if(vlen>vlen_orig){
			vlen=vlen_orig;
		}
		vec2_scale(vel_temp,dir,vlen);
		vec2_plus(e->vel,e->vel,vel_temp);
	}

}
