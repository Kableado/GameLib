// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

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
Entity *_free_entity=NULL;
Entity *Entity_New(){
	Entity *e;

	if(!_free_entity){
		e=malloc(sizeof(Entity));
	}else{
		e=_free_entity;
		_free_entity=e->next;
	}

	e->type=0;
	vec2_set(e->pos,0.0f,0.0f);
	e->flags=EntityFlag_Collision|EntityFlag_Overlap;
	e->zorder=1;

	vec2_set(e->vel,0.0f,0.0f);
	e->radius=1.0f;
	e->mass=1.0f;
	e->elast=0.0f;
	e->fric_static=0.0f;
	e->fric_dynamic=0.0f;

	AnimPlay_SetImg(&e->anim,NULL);

	e->color[0]=e->color[1]=e->color[2]=e->color[3]=1.0f;
	e->light[0]=e->light[1]=e->light[2]=e->light[3]=1.0f;

	e->oncopy=NULL;
	e->ondelete=NULL;
	e->proc=NULL;
	e->postproc=NULL;
	e->collision=NULL;
	e->overlap=NULL;

	e->A=0;
	e->child=NULL;

	e->next=NULL;

	return(e);
}


/////////////////////////////
// Entity_Destroy
//
//
void Entity_Destroy(Entity *e){
	if(e->ondelete){
		e->ondelete(e);
	}
	e->next=_free_entity;
	_free_entity=e;
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
	n->flags=e->flags;
	n->zorder=e->zorder;

	vec2_set(n->vel,e->vel[0],e->vel[1]);
	n->radius=e->radius;
	n->mass=e->mass;
	n->elast=e->elast;
	n->fric_static=e->fric_static;
	n->fric_dynamic=e->fric_dynamic;

	AnimPlay_Copy(&n->anim,&e->anim);
	n->color[0]=e->color[0];
	n->color[1]=e->color[1];
	n->color[2]=e->color[2];
	n->color[3]=e->color[3];
	n->light[0]=e->light[0];
	n->light[1]=e->light[1];
	n->light[2]=e->light[2];
	n->light[3]=e->light[3];

	n->oncopy=e->oncopy;
	n->ondelete=e->ondelete;
	n->proc=e->proc;
	n->postproc=e->postproc;
	n->collision=e->collision;
	n->overlap=e->overlap;

	n->A=e->A;
	n->child=e->child;

	// Call the copy event
	if(n->oncopy){
		n->oncopy(n);
	}

	return(n);
}


/////////////////////////////
// Entity_Draw
//
//
void Entity_Draw(Entity *e,int x,int y){
	Draw_SetColor(e->color[0],e->color[1],e->color[2],e->color[3]);
	AnimPlay_Draw(&e->anim,e->pos[0]+x,e->pos[1]+y);
}


/////////////////////////////
// Entity_Process
//
//
void Entity_Process(Entity *b,int ft){
	b->flags&=~EntityFlag_UpdatedPos;

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


		e->flags|=EntityFlag_UpdatedPos;
	}

	// Animate
	AnimPlay_IncTime(&e->anim,ft);
}


/////////////////////////////
// Entity_CollisionResponse
//
// Normal response to a collision.
void Entity_CollisionResponse(
	Entity *b1,Entity *b2,float t,vec2 n)
{
	float moment;
	vec2 temp;
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
	vec2 vel;

	//if(!(b1->flags&EntityFlag_Collision) || !(b2->flags&EntityFlag_Collision))
	//	return(0);

	// Test relative to b1
	vec2_minus(vel,b1->vel,b2->vel);
	if(vec2_dot(vel,vel)<=0.0f)
		return(0);
	if(Colision_CircleCircle(b1->pos,b1->radius,vel,b2->pos,b2->radius,&t,n)){
		int response=1;
		int rc;

		// Check the collision methods
		if(b1->collision){
			rc=b1->collision(b1,b2,t,n);
			if (rc==0)
				response=0;
			if (rc>1)
				response=2;
		}
		if(b2->collision){
			vec2 n2;
			vec2_scale(n2,n,-1.0f);
			rc=b2->collision(b2,b1,t,n2);
			if (rc==0)
				response=0;
			if (rc>1)
				response=2;
		}

		// Collision response
		if(response==1){
			if(vec2_dot(b1->vel,b1->vel)>vec2_dot(b2->vel,b2->vel)){
				Entity_CollisionResponse(b1,b2,t,n);
			}else{
				Entity_CollisionResponse(b2,b1,t,n);
			}
			return(1);
		}
		if (response==2) {
			return(1);
		}
		return(0);
	}
	return(0);
}


/////////////////////////////
// Entity_Overlaps
//
//
void Entity_Overlaps(Entity *b1,Entity *b2){
	vec2 len;

//	if(!(b1->flags&EntityFlag_Overlap) || !(b2->flags&EntityFlag_Overlap))
//		return;

	vec2_minus(len,b1->pos,b2->pos);
#if 0
	if(fabs(len[0])>b1->radius)
		return;
	if(fabs(len[1])>b1->radius)
		return;
	if(fabs(len[0])>b2->radius)
		return;
	if(fabs(len[1])>b2->radius)
		return;
	dist=sqrtf(vec2_dot(len,len));

	if(b1->radius>dist && b1->overlap){
		b1->overlap(b1,b2);
	}
	if(b2->radius>dist && b2->overlap){
		b2->overlap(b2,b1);
	}
#else
	vec2_set(len,fabs(b1->pos[0]-b2->pos[0]),fabs(b1->pos[1]-b2->pos[1]));
	if(b1->overlap){
		if(	len[0]<=b1->radius &&
			len[1]<=b1->radius)
		{
			b1->overlap(b1,b2);
		}
	}
	if(b2->overlap){
		if(	len[0]<=b2->radius &&
			len[1]<=b2->radius)
		{
			b2->overlap(b2,b1);
		}
	}
#endif
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


/////////////////////////////
// Entity_SetColor
//
//
void Entity_SetColor(Entity *e,float r,float g,float b,float a){
	e->color[0]=r;
	e->color[1]=g;
	e->color[2]=b;
	e->color[3]=a;
}


/////////////////////////////
// Entity_AddColor
//
//
void Entity_AddColor(Entity *e,float r,float g,float b,float a){
	e->color[0]+=r;
	if(e->color[0]>1.0f)
		e->color[0]=1.0f;
	e->color[1]+=g;
	if(e->color[1]>1.0f)
		e->color[1]=1.0f;
	e->color[2]+=b;
	if(e->color[2]>1.0f)
		e->color[2]=1.0f;
	e->color[3]+=a;
	if(e->color[3]>1.0f)
		e->color[3]=1.0f;
}


/////////////////////////////
// Entity_AddColor
//
//
void Entity_SetLight(Entity *e,float r,float g,float b,float rad){
	e->light[0]=r;
	e->light[1]=g;
	e->light[2]=b;
	e->light[3]=rad;
}


/////////////////////////////
// Entity_AddColor
//
//
void Entity_Iluminate(Entity *e,Entity **elist,int n){
	int i;
	vec2 vdist;
	float qdist,f;
	float qrad;

	if(!(e->flags&EntityFlag_Light)){
		Entity_SetColor(e,
			e->light[0],
			e->light[1],
			e->light[2],
			1.0f);
	}else{
		Entity_SetColor(e,1.0f,1.0f,1.0f,1.0f);
		return;
	}

	for(i=0;i<n;i++){
		if(e==elist[i] || !(elist[i]->flags&EntityFlag_Light))
			continue;

		vec2_minus(vdist,e->pos,elist[i]->pos);
		qdist=vec2_dot(vdist,vdist);
		qrad=elist[i]->light[3]*elist[i]->light[3];
		if(qdist<qrad){
			//dist=sqrtf(qdist);
			//f=1.0f-dist/elist[i]->light[3];
			f=1.0f-qdist/qrad;
			Entity_AddColor(e,
				f*elist[i]->light[0],
				f*elist[i]->light[1],
				f*elist[i]->light[2],
				1.0f);
		}
	}
}

