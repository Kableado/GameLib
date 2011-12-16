#ifndef _ENTITY_H_
#define _ENTITY_H_

#include "Util.h"
#include "Draw.h"
#include "Anim.h"


////////////////////////////////////////////////
// Entity //
////////////
//
typedef struct Tag_Entity{

	int type;
	vec2 pos;

	vec2 vel;
	vec2 bod_offset;
	float radius;
	float mass;
	float elast;
	float fric_static;
	float fric_dynamic;

	//DrawImg img;
	AnimPlay anim;

	void (*proc)(struct Tag_Entity *ent,int ft);
	void (*postproc)(struct Tag_Entity *ent,int ft);
	int (*collision)(
		struct Tag_Entity *ent,
		struct Tag_Entity *ent2,
		float t,vec2 n);
} Entity;


/////////////////////////////
// Entity_New
//
//
Entity *Entity_New();


/////////////////////////////
// Entity_Destroy
//
//
void Entity_Destroy(Entity *e);


/////////////////////////////
// Entity_Copy
//
//
Entity *Entity_Copy(Entity *e);


/////////////////////////////
// Entity_Draw
//
//
void Entity_Draw(Entity *e);


/////////////////////////////
// Entity_Process
//
//
void Entity_Process(Entity *e,int ft);

/////////////////////////////
// Entity_PostProcess
//
//
void Entity_PostProcess(Entity *e,int ft);


/////////////////////////////
// Entity_Collide
//
//
int Entity_Collide(Entity *b1,Entity *b2);


/////////////////////////////
// Entity_AddVelLimit
//
//
void Entity_AddVelLimit(Entity *e,vec2 vel,float limit);


#endif
