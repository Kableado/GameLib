// Copyright (C) 2011-2014 Valeriano Alfonso Rodriguez (Kableado)

#ifndef _ENTITY_H_
#define _ENTITY_H_

#include "Util.h"
#include "Draw.h"
#include "Anim.h"


////////////////////////////////////////////////
// Entity
//
#define EntityFlag_Collision 1
#define EntityFlag_Platform 2
#define EntityFlag_Block 4
#define EntityFlag_PlatformCollision 3
#define EntityFlag_BlockCollision 5
#define EntityFlag_Overlap 8
#define EntityFlag_Light 16
#define EntityFlag_UpdateLight 32
#define EntityFlag_UpdatedPos 64
typedef struct TEntity TEntity, *Entity;
struct TEntity {
	Entity base;

	int type;
	vec2 oldpos;
	vec2 pos0;
	vec2 pos;
	int flags;
	int zorder;
	float sortYOffset;

	vec2 dir;

	vec2 vel;
	vec2 bod_offset;
	float radius;
	float width;
	float height;
	float mass;
	float elast;
	float backFric_static;
	float backFric_dynamic;
	float fric_static;
	float fric_dynamic;

	AnimPlay anim;

	float color[4];
	float light[4];
	float defaultColor[4];

	void (*oncopy)(Entity ent);
	void (*ondelete)(Entity ent);
	void (*proc)(Entity ent,int ft);
	void (*postproc)(Entity ent,int ft);
	int (*collision)(Entity ent, Entity ent2, float t,vec2 n);
	void (*overlap)(Entity ent, Entity ent2);

	int A;
	int B;
	int C;
	int D;
	Entity child;

	float maxX,minX;
	float maxY,minY;

	Entity next;
};


/////////////////////////////
// Entity_New
//
Entity Entity_New();


/////////////////////////////
// Entity_Destroy
//
void Entity_Destroy(Entity e);


/////////////////////////////
// Entity_Copy
//
Entity Entity_Copy(Entity e);


/////////////////////////////
// Entity_CalcBBox
//
//
void Entity_CalcBBox(Entity e);


/////////////////////////////
// Entity_BBoxIntersect
//
//
int Entity_BBoxIntersect(Entity ent1,Entity ent2);


/////////////////////////////
// Entity_Draw
//
void Entity_Draw(Entity e,int x,int y,float f);


/////////////////////////////
// Entity_IsVisible
//
int Entity_IsVisible(Entity e,int x,int y,int w,int h);


/////////////////////////////
// Entity_Process
//
void Entity_Process(Entity e,int ft);


/////////////////////////////
// Entity_PostProcess
//
void Entity_PostProcess(Entity e,int ft);


////////////////////////////////////////////////
// CollisionInfo
//
#define CollisionResponse_Circle 1
#define CollisionResponse_Line 2
typedef struct TCollisionInfo TCollisionInfo,*CollisionInfo;
struct TCollisionInfo {
	int responseType;
	Entity ent1;
	Entity ent2;
	float t;
	vec2 n;
	int applyFriction;

	CollisionInfo next;
};


/////////////////////////////
// CollisionInfo_New
//
//
CollisionInfo CollisionInfo_New(int responseType,Entity ent1,Entity ent2,float t,vec2 n,int applyFriction);


/////////////////////////////
// CollisionInfo_Destroy
//
//
void CollisionInfo_Destroy(CollisionInfo *collInfoRef);


/////////////////////////////
// CollisionInfo_Add
//
//
void CollisionInfo_Add(CollisionInfo *collInfo,
	int responseType,Entity ent1,Entity ent2,float t,vec2 n,int applyFriction);


/////////////////////////////
// CollisionInfo_CheckRepetition
//
//
int CollisionInfo_CheckRepetition(CollisionInfo collInfo,Entity ent1,Entity ent2);


/////////////////////////////
// Entity_CheckCollision
//
//
int Entity_CheckCollision(Entity ent1,Entity ent2,CollisionInfo *collInfoRef);


/////////////////////////////
// Entity_CollisionResponseClircle
//
// Normal response to a collision of spheres.
void Entity_CollisionResponseCircle(
	Entity b1,Entity b2,float t,vec2 n);


/////////////////////////////
// Entity_CollisionResponseLine
//
// Normal response to a collision with a line.
void Entity_CollisionResponseLine(
	Entity ent,Entity ent2,float t,vec2 n,int applyFriction);


/////////////////////////////
// Entity_CollisionInfoResponse
//
//
int Entity_CollisionInfoResponse(CollisionInfo collInfo);


/////////////////////////////
// Entity_Overlaps
//
void Entity_Overlaps(Entity b1,Entity b2);


/////////////////////////////
// Entity_GetPos
//
void Entity_GetPos(Entity e,vec2 pos);


/////////////////////////////
// Entity_UpdatePos
//
void Entity_UpdatePos(Entity e,vec2 pos);


/////////////////////////////
// Entity_AddVelLimit
//
void Entity_AddVelLimit(Entity e,vec2 vel,float limit);


/////////////////////////////
// Entity_SetColor
//
void Entity_SetColor(Entity e,float r,float g,float b,float a);


/////////////////////////////
// Entity_AddColor
//
void Entity_AddColor(Entity e,float r,float g,float b,float a);


/////////////////////////////
// Entity_MultColor
//
//
void Entity_MultColor(Entity e,float r,float g,float b,float a);


/////////////////////////////
// Entity_AddColor
//
void Entity_SetLight(Entity e,float r,float g,float b,float rad);


/////////////////////////////
// Entity_SetDefaultColor
//
void Entity_SetDefaultColor(Entity e,float r,float g,float b,float a);


/////////////////////////////
// Entity_AddColor
//
void Entity_Iluminate(Entity e,Entity *elist,int n);


/////////////////////////////
// Entity_MarkUpdateLight
//
void Entity_MarkUpdateLight(Entity e,Entity *elist,int n);


#endif

