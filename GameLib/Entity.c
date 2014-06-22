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
Entity _free_entity=NULL;
Entity Entity_New(){
	Entity e;

	if(!_free_entity){
		e=malloc(sizeof(TEntity));
	}else{
		e=_free_entity;
		_free_entity=e->next;
	}

	e->base=NULL;
	e->type=0;
	vec2_set(e->pos0,0.0f,0.0f);
	vec2_set(e->pos,0.0f,0.0f);
	e->flags=EntityFlag_Collision|EntityFlag_Overlap;
	e->zorder=1;

	vec2_set(e->dir,0.0f,0.0f);

	vec2_set(e->vel,0.0f,0.0f);
	e->radius=1.0f;
	e->width=1.0f;
	e->height=1.0f;
	e->mass=1.0f;
	e->elast=0.0f;
	e->backFric_static=0.0f;
	e->backFric_dynamic=0.0f;
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
	e->B=0;
	e->C=0;
	e->D=0;
	e->child=NULL;

	e->next=NULL;

	return(e);
}


/////////////////////////////
// Entity_Destroy
//
//
void Entity_Destroy(Entity e){
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
Entity Entity_Copy(Entity e){
	Entity n;

	n=Entity_New();

	n->base=e;
	n->type=e->type;
	vec2_set(n->pos,e->pos[0],e->pos[1]);
	n->flags=e->flags;
	n->zorder=e->zorder;

	vec2_set(n->vel,e->vel[0],e->vel[1]);
	n->radius=e->radius;
	n->width=e->width;
	n->height=e->height;
	n->mass=e->mass;
	n->elast=e->elast;
	n->backFric_static=e->backFric_static;
	n->backFric_dynamic=e->backFric_dynamic;
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
	n->B=e->B;
	n->C=e->C;
	n->D=e->D;
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
void Entity_Draw(Entity e,int x,int y,float f){
	vec2 fPos;
	Draw_SetColor(e->color[0],e->color[1],e->color[2],e->color[3]);
	if(e->flags&EntityFlag_UpdatedPos){
		vec2_interpol(fPos,e->pos0,e->pos,f);
		AnimPlay_Draw(&e->anim,fPos[0]+x,fPos[1]+y);
	}else{
		AnimPlay_Draw(&e->anim,e->pos[0]+x,e->pos[1]+y);
	}
}



/////////////////////////////
// Entity_IsVisible
//
//
int Entity_IsVisible(Entity e,int x,int y,int w,int h){
	int xmax,xmin;
	int ymax,ymin;
	int ih,iw;

	AnimPlay_GetSize(&e->anim,&iw,&ih);

	xmin=x-iw;
	xmax=x+w+iw;
	ymin=y-ih;
	ymax=y+h+ih;

	if(e->pos[0]<xmin ||
		e->pos[0]>xmax ||
		e->pos[1]<ymin ||
		e->pos[1]>ymax)
	{
		return(0);
	}
	return(1);
}



/////////////////////////////
// Entity_Process
//
//
void Entity_Process(Entity b,int ft){
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
void Entity_PostProcess(Entity e,int ft){
	float qlen,len;

	vec2_copy(e->pos0,e->pos);

	// Determine if there is movement
	qlen=vec2_dot(e->vel,e->vel);
	if(qlen>0.0f){

		// Update position
		vec2_plus(e->pos,e->pos,e->vel);

		// Apply friction
		len=sqrtf(qlen);
		if(len<e->backFric_static){
			// Stopped by static friction
			vec2_set(e->vel,0,0);
		}else{
			// Apply dynamic friction
			vec2_scale(e->vel,e->vel,
				1.0f-(e->backFric_dynamic+(e->backFric_static/len)));
		}

		// Mark the update of the position.
		vec2_copy(e->oldpos,e->pos);
		e->flags|=EntityFlag_UpdatedPos;
	}

	// Launch method
	if(e->postproc){
		e->postproc(e,ft);
	}

	// Animate
	AnimPlay_IncTime(&e->anim,ft);
}


/////////////////////////////
// Entity_CollisionResponseClircle
//
// Normal response to a collision between circles.
void Entity_CollisionResponseCircle(
	Entity b1,Entity b2,float t,vec2 n)
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
					(fabs(vec2_dot(b1->vel,n))+fabs(vec2_dot(b2->vel,n))))
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
// Entity_CollisionResponseLine
//
// Normal response to a collision with a line.
void Entity_CollisionResponseLine(
	Entity ent,Entity ent2,float t,vec2 norm,int applyFriction)
{
	vec2 pos2,vel2,velFric,intersection;
	float dist,fric_static,fric_dynamic,fricLen;

	// Calculate friction
	fric_static=(ent->fric_static+ent2->fric_static)/2;
	fric_dynamic=(ent->fric_dynamic+ent2->fric_dynamic)/2;

	// Calculate end position
	vec2_scale(vel2,ent->vel,1.0f-t);
	dist=-vec2_dot(norm,vel2);
	vec2_plus(pos2,ent->pos,ent->vel);
	vec2_scaleadd(pos2,pos2,norm,dist);

	// Calculate intersection
	vec2_scaleadd(intersection,ent->pos,ent->vel,t);

	if(applyFriction){
		// Apply friction
		vec2_minus(velFric,pos2,intersection);
		fricLen=sqrtf(vec2_dot(velFric,velFric));
		if(fricLen<fric_static){
			// Apply static friction
			vec2_copy(pos2,intersection);
		}else{
			// Apply dynamic friction
			if(fricLen>0.0f){
				vec2_scaleadd(pos2,intersection,velFric,
					1.0f-(fric_dynamic+(fric_static/fricLen)));
			}else{
				vec2_scaleadd(pos2,intersection,velFric,
					1.0f-fric_dynamic);
			}
		}
	}

	// Apply to velocity
	vec2_scaleadd(pos2,pos2,norm,0.1f);
	vec2_minus(ent->vel,pos2,ent->pos);
}


/////////////////////////////
// Entity_Collide
//
//
int Entity_Collide(Entity b1,Entity b2){
	float t;
	vec2 n,p;
	vec2 vel;
	int flags=b1->flags|b2->flags;

	if(flags&EntityFlag_Platform && !(flags&EntityFlag_Block)){
		// One of the entities is a platform and none is a block
		Entity ent,ent_plat;
		float plat_width;
		vec2 p;

		// Decide who is the platform and who is the ent
		if(b1->mass<=0.0f && b2->mass>0.0f){
			ent=b2;
			ent_plat=b1;
		}else
		if(b2->mass<=0.0f && b1->mass>0.0f){
			ent=b1;
			ent_plat=b2;
		}else{
			// Two static or two dinamic entities?!?
			return(0);
		}


		// Check Top
		vec2_set(n,0,-1);
		vec2_scaleadd(p,ent_plat->pos,n,(ent->height+ent_plat->height)/2);
		plat_width=ent_plat->width+ent->width;
		if(Intersect_RayEdge(ent->pos,ent->vel,
			n,p,plat_width,&t))
		{
			int response=1;
			int rc;

			// Check the collision methods
			if(ent->collision){
				rc=ent->collision(ent,ent_plat,t,n);
				if (rc==0)
					response=0;
				if (rc>1)
					response=2;
			}
			if(ent_plat->collision){
				vec2 n2;
				vec2_scale(n2,n,-1.0f);
				rc=ent_plat->collision(ent_plat,ent,t,n2);
				if (rc==0)
					response=0;
				if (rc>1)
					response=2;
			}

			// Collision response
			if(response==1){
				Entity_CollisionResponseLine(ent,ent_plat,t,n,1);
				return(1);
			}
			if (response==2) {
				return(1);
			}
			return(0);
		}

		return(0);
	}

	if(flags&EntityFlag_Block && !(flags&EntityFlag_Platform)){
		// One of the entities is a block and none is a platform
		Entity ent,ent_block;
		float auxT,block_len;
		vec2 auxN,p;
		int applyFriction;

		// Decide who is the block and who is the ent
		if(b1->mass<=0.0f && b2->mass>0.0f){
			ent=b2;
			ent_block=b1;
		}else
		if(b2->mass<=0.0f && b1->mass>0.0f){
			ent=b1;
			ent_block=b2;
		}else{
			// Two static or two dinamic entities?!?
			return(0);
		}

		// Prepare some variables
		t=1.0f;
		applyFriction=1;

		// Check Top
		vec2_set(auxN,0,-1);
		vec2_scaleadd(p,ent_block->pos,auxN,(ent->height+ent_block->height)/2);
		block_len=ent_block->width+ent->width;
		if(Intersect_RayEdge(ent->pos,ent->vel,
			auxN,p,block_len,&auxT))
		{
			if(auxT<t){
				vec2_copy(n,auxN);
				t=auxT;
				applyFriction=1;
			}
		}

		// Check Bottom
		vec2_set(auxN,0,1);
		vec2_scaleadd(p,ent_block->pos,auxN,(ent->height+ent_block->height)/2);
		block_len=ent_block->width+ent->width;
		if(Intersect_RayEdge(ent->pos,ent->vel,
			auxN,p,block_len,&auxT))
		{
			if(auxT<t){
				vec2_copy(n,auxN);
				t=auxT;
				applyFriction=1;
			}
		}

		// Check Left
		vec2_set(auxN,1,0);
		vec2_scaleadd(p,ent_block->pos,auxN,(ent->width+ent_block->width)/2);
		block_len=ent_block->height+ent->height;
		if(Intersect_RayEdge(ent->pos,ent->vel,
			auxN,p,block_len,&auxT))
		{
			if(auxT<t){
				vec2_copy(n,auxN);
				t=auxT;
				applyFriction=0;
			}
		}

		// Check Right
		vec2_set(auxN,-1,0);
		vec2_scaleadd(p,ent_block->pos,auxN,(ent->width+ent_block->width)/2);
		block_len=ent_block->height+ent->height;
		if(Intersect_RayEdge(ent->pos,ent->vel,
			auxN,p,block_len,&auxT))
		{
			if(auxT<t){
				vec2_copy(n,auxN);
				t=auxT;
				applyFriction=0;
			}
		}

		if(t<1.0f){
			// Handle colision
			int response=1;
			int rc;

			// Check the collision methods
			if(ent->collision){
				rc=ent->collision(ent,ent_block,t,n);
				if (rc==0)
					response=0;
				if (rc>1)
					response=2;
			}
			if(ent_block->collision){
				vec2 n2;
				vec2_scale(n2,n,-1.0f);
				rc=ent_block->collision(ent_block,ent,t,n2);
				if (rc==0)
					response=0;
				if (rc>1)
					response=2;
			}

			// Collision response
			if(response==1){
				Entity_CollisionResponseLine(ent,ent_block,t,n,applyFriction);
				return(1);
			}
			if (response==2) {
				return(1);
			}
			return(0);
		}

		return(0);
	}


	// Test relative to b1
	vec2_minus(vel,b1->vel,b2->vel);
	if(Colision_CircleCircle(b1->pos,b1->radius,vel,b2->pos,b2->radius,&t,n)){
		int response=1;
		int rc;
		vec2 n2;
		vec2_scale(n2,n,-1.0f);

		// Check the collision methods
		if(b1->collision){
			rc=b1->collision(b1,b2,t,n2);
			if (rc==0)
				response=0;
			if (rc>1)
				response=2;
		}
		if(b2->collision){
			rc=b2->collision(b2,b1,t,n);
			if (rc==0)
				response=0;
			if (rc>1)
				response=2;
		}

		// Collision response
		if(response==1){
			if(vec2_dot(b1->vel,b1->vel)>vec2_dot(b2->vel,b2->vel)){
				Entity_CollisionResponseCircle(b1,b2,t,n);
			}else{
				Entity_CollisionResponseCircle(b2,b1,t,n);
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
void Entity_Overlaps(Entity b1,Entity b2){
	vec2 len;

	vec2_minus(len,b1->pos,b2->pos);

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
}


/////////////////////////////
// Entity_GetPos
//
//
void Entity_GetPos(Entity e,vec2 pos){
	vec2_copy(pos,e->pos);
}

/////////////////////////////
// Entity_UpdatePos
//
//
void Entity_UpdatePos(Entity e,vec2 pos){

	// Mark the update of the position.
	vec2_copy(e->oldpos,e->pos);
	e->flags|=EntityFlag_UpdatedPos;

	vec2_copy(e->pos,pos);
}

/////////////////////////////
// Entity_AddVelLimit
//
//
void Entity_AddVelLimit(Entity e,vec2 vel,float limit){
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
void Entity_SetColor(Entity e,float r,float g,float b,float a){
	e->color[0]=r;
	e->color[1]=g;
	e->color[2]=b;
	e->color[3]=a;
}


/////////////////////////////
// Entity_AddColor
//
//
void Entity_AddColor(Entity e,float r,float g,float b,float a){
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
// Entity_SetLight
//
//
void Entity_SetLight(Entity e,float r,float g,float b,float rad){
	e->light[0]=r;
	e->light[1]=g;
	e->light[2]=b;
	e->light[3]=rad;
}



/////////////////////////////
// Entity_Iluminate
//
//
void Entity_Iluminate(Entity e,Entity *elist,int n){
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
			f=1.0f-qdist/qrad;
			Entity_AddColor(e,
				f*elist[i]->light[0],
				f*elist[i]->light[1],
				f*elist[i]->light[2],
				1.0f);
		}
	}
}


/////////////////////////////
// Entity_MarkUpdateLight
//
//
void Entity_MarkUpdateLight(Entity e,Entity *elist,int n){
	if(e->flags&EntityFlag_Light){
		int i;
		vec2 max,min;

		if(e->pos[0]<e->oldpos[0]){
			min[0]=e->pos[0]-e->light[3];
			max[0]=e->oldpos[0]+e->light[3];
		}else{
			min[0]=e->oldpos[0]-e->light[3];
			max[0]=e->pos[0]+e->light[3];
		}
		if(e->pos[1]<e->oldpos[1]){
			min[1]=e->pos[1]-e->light[3];
			max[1]=e->oldpos[1]+e->light[3];
		}else{
			min[1]=e->oldpos[1]-e->light[3];
			max[1]=e->pos[1]+e->light[3];
		}
		for(i=0;i<n;i++){
			if(	min[0]<=elist[i]->pos[0] &&
				max[0]>=elist[i]->pos[0] &&
				min[1]<=elist[i]->pos[1] &&
				max[1]>=elist[i]->pos[1])
			{
				elist[i]->flags|=EntityFlag_UpdateLight;
			}
		}
	}else{
		e->flags|=EntityFlag_UpdateLight;
	}
}


