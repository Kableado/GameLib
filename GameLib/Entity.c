// Copyright (C) 2011-2014 Valeriano Alfonso Rodriguez (Kableado)

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "Util.h"
#include "Draw.h"
#include "Anim.h"

#include "Entity.h"

#define EntityIntFlag_UpdateLight 1
#define EntityIntFlag_UpdatedPos 2
#define EntityIntFlag_UpdatedColor 4
#define EntityIntFlag_UpdateColor 8
#define EntityIntFlag_UpdatedScale 16

/////////////////////////////
// Entity_New
//
//
Entity _free_entity = NULL;
Entity Entity_New() {
	Entity e;

	if (!_free_entity) {
		// Allocate a big block of entities
		int n = 1024, i;
		TEntity *newEnts = malloc(sizeof(TEntity) * n);
		for (i = 0; i < n; i++) {
			if (i < (n - 1)) {
				newEnts[i].next = &newEnts[i + 1];
			} else {
				newEnts[i].next = NULL;
			}
		}
		_free_entity = newEnts;
	}
	e = _free_entity;
	_free_entity = e->next;

	e->base = NULL;
	e->type = 0;
	vec2_set(e->pos0, 0.0f, 0.0f);
	vec2_set(e->pos, 0.0f, 0.0f);
	e->flags = EntityFlag_Collision | EntityFlag_Overlap;
	e->internalFlags = EntityIntFlag_UpdateColor;
	e->zorder = 1;
	e->sortYOffset = 0;

	vec2_set(e->dir, 0.0f, 0.0f);

	vec2_set(e->vel, 0.0f, 0.0f);
	e->radius = 1.0f;
	e->width = 1.0f;
	e->height = 1.0f;
	e->mass = 1.0f;
	e->elast = 0.0f;
	e->backFric_static = 0.0f;

	e->backFric_dynamic = 0.0f;
	e->fric_static = 0.0f;
	e->fric_dynamic = 0.0f;

	AnimPlay_SetImg(&e->anim, NULL);

	e->color0[0] = e->color0[1] = e->color0[2] = e->color0[3] = 1.0f;
	e->color[0] = e->color[1] = e->color[2] = e->color[3] = 1.0f;

	e->light[0] = e->light[1] = e->light[2] = e->light[3] = 1.0f;
	e->defaultColor[0] = e->defaultColor[1] = e->defaultColor[2] =
		e->defaultColor[3] = 1.0f;

	e->scale0[0] = 1.0f;
	e->scale0[1] = 1.0f;
	e->scale[0] = 1.0f;
	e->scale[1] = 1.0f;

	e->oncopy = NULL;
	e->oninit = NULL;
	e->ondelete = NULL;
	e->proc = NULL;
	e->postproc = NULL;
	e->collision = NULL;
	e->overlap = NULL;

	e->A = 0;
	e->B = 0;
	e->C = 0;
	e->D = 0;
	e->child = NULL;

	e->next = NULL;

	return (e);
}

/////////////////////////////
// Entity_Init
//
Entity Entity_Init(Entity e) {
	if (e->oninit) {
		e->oninit(e);
	}
}

/////////////////////////////
// Entity_Destroy
//
//
void Entity_Destroy(Entity e) {
	if (e->ondelete) {
		e->ondelete(e);
	}
	e->next = _free_entity;
	_free_entity = e;
}

/////////////////////////////
// Entity_Copy
//
//
Entity Entity_Copy(Entity e) {
	Entity n;

	n = Entity_New();

	n->base = e;
	n->type = e->type;
	vec2_set(n->pos, e->pos[0], e->pos[1]);
	n->flags = e->flags;
	n->internalFlags = e->internalFlags;
	n->zorder = e->zorder;
	n->sortYOffset = e->sortYOffset;

	vec2_set(n->vel, e->vel[0], e->vel[1]);
	n->radius = e->radius;
	n->width = e->width;
	n->height = e->height;
	n->mass = e->mass;
	n->elast = e->elast;
	n->backFric_static = e->backFric_static;
	n->backFric_dynamic = e->backFric_dynamic;
	n->fric_static = e->fric_static;
	n->fric_dynamic = e->fric_dynamic;

	AnimPlay_Copy(&n->anim, &e->anim);
	n->color0[0] = e->color0[0];
	n->color0[1] = e->color0[1];
	n->color0[2] = e->color0[2];
	n->color0[3] = e->color0[3];
	n->color[0] = e->color[0];
	n->color[1] = e->color[1];
	n->color[2] = e->color[2];
	n->color[3] = e->color[3];
	n->light[0] = e->light[0];
	n->light[1] = e->light[1];
	n->light[2] = e->light[2];
	n->light[3] = e->light[3];
	n->defaultColor[0] = e->defaultColor[0];
	n->defaultColor[1] = e->defaultColor[1];
	n->defaultColor[2] = e->defaultColor[2];
	n->defaultColor[3] = e->defaultColor[3];

	n->scale0[0] = e->scale[0];
	n->scale0[1] = e->scale[1];
	n->scale[0] = e->scale[0];
	n->scale[1] = e->scale[1];

	n->oncopy = e->oncopy;
	n->oninit = e->oninit;
	n->ondelete = e->ondelete;
	n->proc = e->proc;
	n->postproc = e->postproc;
	n->collision = e->collision;
	n->overlap = e->overlap;

	n->A = e->A;
	n->B = e->B;
	n->C = e->C;
	n->D = e->D;
	n->child = e->child;

	Entity_CalcBBox(n);

	// Call the copy event
	if (n->oncopy) {
		n->oncopy(n);
	}

	return (n);
}

/////////////////////////////
// Entity_CalcBBox
//
//
#define BBox_ExtraMargin 10
#define max(a, b) ((a) > (b) ? (a) : (b))
void Entity_CalcBBox(Entity e) {
	float hHeight = (max(e->height, e->radius) / 2) + BBox_ExtraMargin;
	float hWidth = (max(e->width, e->radius) / 2) + BBox_ExtraMargin;
	if (e->vel[0] > 0) {
		e->maxX = e->pos[0] + e->vel[0] + hWidth;
		e->minX = e->pos[0] - hWidth;
	} else {
		e->minX = (e->pos[0] + e->vel[0]) - hWidth;
		e->maxX = e->pos[0] + hWidth;
	}
	if (e->vel[1] > 0) {
		e->maxY = e->pos[1] + e->vel[1] + hHeight;
		e->minY = e->pos[1] - hHeight;
	} else {
		e->minY = (e->pos[1] + e->vel[1]) - hHeight;
		e->maxY = e->pos[1] + hHeight;
	}
}

/////////////////////////////
// Entity_BBoxIntersect
//
//
int Entity_BBoxIntersect(Entity ent1, Entity ent2) {
	if (ent1->maxX >= ent2->minX && ent1->minX <= ent2->maxX &&
		ent1->maxY >= ent2->minY && ent1->minY <= ent2->maxY) {
		return (1);
	}
	return (0);
}

/////////////////////////////
// Entity_Draw
//
//
void Entity_Draw(Entity e, int x, int y, float f) {
	vec2 fPos;
	float scale[2];
	if (e->internalFlags & EntityIntFlag_UpdatedColor) {
		Draw_SetColor(e->color0[0] - f * (e->color0[0] - e->color[0]),
					  e->color0[1] - f * (e->color0[1] - e->color[1]),
					  e->color0[2] - f * (e->color0[2] - e->color[2]),
					  e->color0[3] - f * (e->color0[3] - e->color[3]));
	} else {
		Draw_SetColor(e->color[0], e->color[1], e->color[2], e->color[3]);
	}
	if (e->internalFlags & EntityIntFlag_UpdatedScale) {
		scale[0] = e->scale0[0] - f * (e->scale0[0] - e->scale[0]);
		scale[1] = e->scale0[1] - f * (e->scale0[1] - e->scale[1]);
	} else {
		scale[0] = e->scale[0];
		scale[1] = e->scale[1];
	}
	if (e->internalFlags & EntityIntFlag_UpdatedPos) {
		vec2_interpol(fPos, e->pos0, e->pos, f);
		AnimPlay_Draw(&e->anim, fPos[0] + x, fPos[1] + y, scale);
	} else {
		AnimPlay_Draw(&e->anim, e->pos[0] + x, e->pos[1] + y, scale);
	}
}

/////////////////////////////
// Entity_IsVisible
//
//
int Entity_IsVisible(Entity e, int x, int y, int w, int h) {
	int xmax, xmin;
	int ymax, ymin;
	int ih, iw;

	AnimPlay_GetSize(&e->anim, &iw, &ih);

	xmin = x - iw;
	xmax = x + w + iw;
	ymin = y - ih;
	ymax = y + h + ih;

	if (e->pos[0] < xmin || e->pos[0] > xmax || e->pos[1] < ymin ||
		e->pos[1] > ymax) {
		return (0);
	}
	return (1);
}

/////////////////////////////
// Entity_Process
//
//
void Entity_Process(Entity e, int ft) {
	e->internalFlags &= ~EntityIntFlag_UpdatedPos;

	if (e->internalFlags & EntityIntFlag_UpdatedScale) {
		e->scale0[0] = e->scale[0];
		e->scale0[1] = e->scale[1];
		e->internalFlags &= ~EntityIntFlag_UpdatedScale;
	}

	// Launch method
	if (e->proc) {
		e->proc(e, ft);
	}
}

/////////////////////////////
// Entity_PostProcess
//
//
void Entity_PostProcess(Entity e, int ft) {
	float qlen, len;

	vec2_copy(e->pos0, e->pos);

	e->color0[0] = e->color[0];
	e->color0[1] = e->color[1];
	e->color0[2] = e->color[2];
	e->color0[3] = e->color[3];
	e->internalFlags &= ~EntityIntFlag_UpdatedColor;

	// Determine if there is movement
	qlen = vec2_dot(e->vel, e->vel);
	if (qlen > 0.0f) {

		// Update position
		vec2_plus(e->pos, e->pos, e->vel);

		// Apply friction
		len = sqrtf(qlen);
		if (len < e->backFric_static) {
			// Stopped by static friction
			vec2_set(e->vel, 0, 0);
		} else {
			// Apply dynamic friction
			vec2_scale(e->vel, e->vel, 1.0f - (e->backFric_dynamic +
											   (e->backFric_static / len)));
		}

		// Mark the update of the position.
		vec2_copy(e->oldpos, e->pos);
		e->internalFlags |= EntityIntFlag_UpdatedPos;

		Entity_CalcBBox(e);
	}

	// Launch method
	if (e->postproc) {
		e->postproc(e, ft);
	}

	// Animate
	AnimPlay_IncTime(&e->anim, ft);
}

/////////////////////////////
// CollisionInfo_New
//
//
CollisionInfo _free_collInfo = NULL;
CollisionInfo CollisionInfo_New(int responseType, Entity ent1, Entity ent2,
								float t, vec2 n, int applyFriction) {
	CollisionInfo collInfo;

	if (!_free_collInfo) {
		collInfo = malloc(sizeof(TCollisionInfo));
	} else {
		collInfo = _free_collInfo;
		_free_collInfo = collInfo->next;
	}
	collInfo->next = NULL;

	collInfo->responseType = responseType;
	collInfo->ent1 = ent1;
	collInfo->ent2 = ent2;
	collInfo->t = t;
	vec2_copy(collInfo->n, n);
	collInfo->applyFriction = applyFriction;

	return collInfo;
}

/////////////////////////////
// CollisionInfo_Destroy
//
//
void CollisionInfo_Destroy(CollisionInfo *collInfoRef) {
	if (collInfoRef == NULL || collInfoRef[0] == NULL) {
		return;
	}

	CollisionInfo collInfo = collInfoRef[0];
	CollisionInfo nextCollInfo;
	while (collInfo != NULL) {
		nextCollInfo = collInfo->next;
		collInfo->next = _free_collInfo;
		_free_collInfo = collInfo;
		collInfo = nextCollInfo;
	}
	collInfoRef[0] = NULL;
}

/////////////////////////////
// CollisionInfo_Add
//
//
void CollisionInfo_Add(CollisionInfo *collInfoRef, int responseType,
					   Entity ent1, Entity ent2, float t, vec2 n,
					   int applyFriction) {
	if (collInfoRef == NULL) {
		return;
	}
	CollisionInfo prevCollInfo = NULL;
	CollisionInfo collInfo = collInfoRef[0];
	CollisionInfo newCollInfo =
		CollisionInfo_New(responseType, ent1, ent2, t, n, applyFriction);

	while (collInfo != NULL && collInfo->t < t) {
		prevCollInfo = collInfo;
		collInfo = collInfo->next;
	}
	if (prevCollInfo == NULL) {
		collInfoRef[0] = newCollInfo;
	} else {
		prevCollInfo->next = newCollInfo;
	}
	newCollInfo->next = collInfo;
}

/////////////////////////////
// CollisionInfo_CheckRepetition
//
//
int CollisionInfo_CheckRepetition(CollisionInfo collInfo, Entity ent1,
								  Entity ent2) {
	while (collInfo != NULL) {
		if ((collInfo->ent1 == ent1 && collInfo->ent2 == ent2) ||
			(collInfo->ent1 == ent2 && collInfo->ent2 == ent1)) {
			return (1);
		}
		collInfo = collInfo->next;
	}
	return (0);
}

/////////////////////////////
// Entity_CheckCollisions
//
//
int Entity_CheckCollision(Entity ent1, Entity ent2,
						  CollisionInfo *collInfoRef) {
	float t;
	vec2 n;
	vec2 vel;
	int flags = ent1->flags | ent2->flags;

	if (flags & EntityFlag_Block) {
		// One of the entities is a block and none is a platform
		Entity ent, ent_block;
		float auxT, block_len;
		vec2 auxN, p;
		int applyFriction;

		// Decide who is the block and who is the ent
		if (ent1->mass <= 0.0f && ent2->mass > 0.0f) {
			ent = ent2;
			ent_block = ent1;
		} else if (ent2->mass <= 0.0f && ent1->mass > 0.0f) {
			ent = ent1;
			ent_block = ent2;
		} else {
			// Two static or two dinamic entities?!?
			return (0);
		}

		// Prepare some variables
		t = 1.0f;
		applyFriction = 1;

		if (flags & EntityFlag_BlockTop) {
			vec2_set(auxN, 0, -1);
			vec2_scaleadd(p, ent_block->pos, auxN,
						  (ent->height + ent_block->height) / 2);
			block_len = ent_block->width + ent->width;
			if (Intersect_RayEdge(ent->pos, ent->vel, auxN, p, block_len,
								  &auxT)) {
				if (auxT < t) {
					vec2_copy(n, auxN);
					t = auxT;
					applyFriction = 1;
				}
			}
		}

		if (flags & EntityFlag_BlockBottom) {
			vec2_set(auxN, 0, 1);
			vec2_scaleadd(p, ent_block->pos, auxN,
						  (ent->height + ent_block->height) / 2);
			block_len = ent_block->width + ent->width;
			if (Intersect_RayEdge(ent->pos, ent->vel, auxN, p, block_len,
								  &auxT)) {
				if (auxT < t) {
					vec2_copy(n, auxN);
					t = auxT;
					applyFriction = 1;
				}
			}
		}

		if (flags & EntityFlag_BlockRight) {
			vec2_set(auxN, 1, 0);
			vec2_scaleadd(p, ent_block->pos, auxN,
						  (ent->width + ent_block->width) / 2);
			block_len = ent_block->height + ent->height;
			if (Intersect_RayEdge(ent->pos, ent->vel, auxN, p, block_len,
								  &auxT)) {
				if (auxT < t) {
					vec2_copy(n, auxN);
					t = auxT;
					applyFriction = 0;
				}
			}
		}

		if (flags & EntityFlag_BlockLeft) {
			vec2_set(auxN, -1, 0);
			vec2_scaleadd(p, ent_block->pos, auxN,
						  (ent->width + ent_block->width) / 2);
			block_len = ent_block->height + ent->height;
			if (Intersect_RayEdge(ent->pos, ent->vel, auxN, p, block_len,
								  &auxT)) {
				if (auxT < t) {
					vec2_copy(n, auxN);
					t = auxT;
					applyFriction = 0;
				}
			}
		}

		if (t < 1.0f) {
			CollisionInfo_Add(collInfoRef, CollisionResponse_Line, ent,
							  ent_block, t, n, applyFriction);
			return (1);
		}

		return (0);
	}

	// Circle-Circle test from ent1
	vec2_minus(vel, ent1->vel, ent2->vel);
	if (Colision_CircleCircle(ent1->pos, ent1->radius, vel, ent2->pos,
							  ent2->radius, &t, n)) {
		CollisionInfo_Add(collInfoRef, CollisionResponse_Circle, ent1, ent2, t,
						  n, 0);
		return (1);
	}
	return (0);
}

/////////////////////////////
// Entity_CollisionResponseCircle
//
// Normal response to a collision between circles.
void Entity_CollisionResponseCircle(Entity b1, Entity b2, float t, vec2 n) {
	float moment;
	vec2 temp;
	float elast;

	if (b1->mass > 0.0f && b2->mass > 0.0f) {
		// Calculate elasticity
		elast = (b1->mass * b1->elast + b2->mass * b2->elast) /
				(b1->mass + b2->mass);

		// Collision between two massed balls
		moment = ((1.0f + elast) * b1->mass * b2->mass *
				  (fabs(vec2_dot(b1->vel, n)) + fabs(vec2_dot(b2->vel, n)))) /
				 (b1->mass + b2->mass);
		vec2_scale(temp, n, moment / b1->mass);
		vec2_minus(b1->vel, b1->vel, temp);
		Entity_CalcBBox(b1);
		vec2_scale(temp, n, moment / b2->mass);
		vec2_plus(b2->vel, b2->vel, temp);
		Entity_CalcBBox(b2);
	} else if (b1->mass > 0.0f && b2->mass <= 0.0f) {
		// Collision between a massed ball and a fixed ball
		moment = (1.0f + b1->elast) * (vec2_dot(b1->vel, n));
		vec2_scale(temp, n, moment);
		vec2_minus(b1->vel, b1->vel, temp);
		Entity_CalcBBox(b1);
	} else if (b1->mass <= 0.0f && b2->mass > 0.0f) {
		// Collision between a massed ball and a fixed ball
		// (imposible, but better safe)
		moment = (1.0f + b2->elast) * (vec2_dot(b2->vel, n));
		vec2_scale(temp, n, moment);
		vec2_plus(b2->vel, b2->vel, temp);
		Entity_CalcBBox(b2);
	} else {
		// Collision between 2 fixed balls
		// (imposible, but better safe)
		vec2_set(b1->vel, 0, 0);
		Entity_CalcBBox(b1);
		vec2_set(b2->vel, 0, 0);
		Entity_CalcBBox(b2);
	}
}

/////////////////////////////
// Entity_CollisionResponseLine
//
// Normal response to a collision with a line.
void Entity_CollisionResponseLine(Entity ent, Entity ent2, float t, vec2 norm,
								  int applyFriction) {
	vec2 pos2, vel2, velFric, intersection;
	float dist, fric_static, fric_dynamic, fricLen;

	// Calculate end position
	vec2_scale(vel2, ent->vel, 1.0f - t);
	dist = -vec2_dot(norm, vel2);
	vec2_plus(pos2, ent->pos, ent->vel);
	vec2_scaleadd(pos2, pos2, norm, dist);

	// Calculate intersection
	vec2_scaleadd(intersection, ent->pos, ent->vel, t);

	if (applyFriction) {
		// Calculate friction
		fric_static = (ent->fric_static + ent2->fric_static) / 2;
		fric_dynamic = (ent->fric_dynamic + ent2->fric_dynamic) / 2;

		// Apply friction
		vec2_minus(velFric, pos2, intersection);
		fricLen = sqrtf(vec2_dot(velFric, velFric));
		if (fricLen < fric_static) {
			// Apply static friction
			vec2_copy(pos2, intersection);
		} else {
			// Apply dynamic friction
			if (fricLen > 0.0f) {
				vec2_scaleadd(pos2, intersection, velFric,
							  1.0f - (fric_dynamic + (fric_static / fricLen)));
			} else {
				vec2_scaleadd(pos2, intersection, velFric, 1.0f - fric_dynamic);
			}
		}
	}

	// Apply to velocity
	vec2_scaleadd(pos2, pos2, norm, 0.1f);
	vec2_minus(ent->vel, pos2, ent->pos);

	Entity_CalcBBox(ent);
}

/////////////////////////////
// Entity_CollisionInfoResponse
//
//
int Entity_CollisionInfoResponse(CollisionInfo collInfo) {
	while (collInfo != NULL) {
		// Handle colision
		int response = 1;
		int rc;
		vec2 n1;
		vec2 n2;
		vec2_copy(n1, collInfo->n);
		vec2_scale(n2, collInfo->n, -1.0f);

		// Check the collision methods
		if (collInfo->ent1->collision) {
			rc = collInfo->ent1->collision(collInfo->ent1, collInfo->ent2,
										   collInfo->t, n1);
			if (rc == 0)
				response = 0;
			if (rc > 1)
				response = 2;
		}
		if (collInfo->ent2->collision) {
			rc = collInfo->ent2->collision(collInfo->ent2, collInfo->ent1,
										   collInfo->t, n2);
			if (rc == 0)
				response = 0;
			if (rc > 1)
				response = 2;
		}

		// Collision response
		if (response == 1) {
			if (collInfo->responseType == CollisionResponse_Line) {
				Entity_CollisionResponseLine(collInfo->ent1, collInfo->ent2,
											 collInfo->t, collInfo->n,
											 collInfo->applyFriction);
			} else if (collInfo->responseType == CollisionResponse_Circle) {
				if (vec2_dot(collInfo->ent1->vel, collInfo->ent1->vel) >
					vec2_dot(collInfo->ent2->vel, collInfo->ent2->vel)) {
					Entity_CollisionResponseCircle(
						collInfo->ent1, collInfo->ent2, collInfo->t, n2);
				} else {
					Entity_CollisionResponseCircle(
						collInfo->ent2, collInfo->ent1, collInfo->t, n1);
				}
			}
			return (1);
		}
		if (response == 2) {
			return (1);
		}

		collInfo = collInfo->next;
	}
	return (0);
}

/////////////////////////////
// Entity_Overlaps
//
//
void Entity_Overlaps(Entity b1, Entity b2) {
	vec2 len;

	vec2_minus(len, b1->pos, b2->pos);

	vec2_set(len, fabs(b1->pos[0] - b2->pos[0]), fabs(b1->pos[1] - b2->pos[1]));
	if (b1->overlap) {
		if (len[0] <= b1->radius && len[1] <= b1->radius) {
			b1->overlap(b1, b2);
		}
	}
	if (b2->overlap) {
		if (len[0] <= b2->radius && len[1] <= b2->radius) {
			b2->overlap(b2, b1);
		}
	}
}

/////////////////////////////
// Entity_GetPos
//
//
void Entity_GetPos(Entity e, vec2 pos) { vec2_copy(pos, e->pos); }

/////////////////////////////
// Entity_SetPos
//
//
void Entity_SetPos(Entity e, vec2 pos) {
	vec2_copy(e->pos, pos);
	vec2_copy(e->oldpos, pos);
	vec2_copy(e->pos0, pos);
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_AddPos
//
//
void Entity_AddPos(Entity e, vec2 pos) {
	vec2_plus(e->pos, e->pos, pos);
	vec2_copy(e->oldpos, e->pos);
	vec2_copy(e->pos0, e->pos);
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_UpdatePos
//
//
void Entity_UpdatePos(Entity e, vec2 pos) {

	// Mark the update of the position.
	vec2_copy(e->oldpos, e->pos);
	e->internalFlags |= EntityIntFlag_UpdatedPos;

	vec2_copy(e->pos, pos);
}

/////////////////////////////
// Entity_AddVel
//
void Entity_AddVel(Entity e, vec2 vel) {
	vec2_plus(e->vel, e->vel, vel);
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_SetVel
//
void Entity_SetVel(Entity e, vec2 vel) {
	vec2_copy(e->vel, vel);
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_SetVelH
//
void Entity_SetVelH(Entity e, float v) {
	e->vel[0] = v;
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_SetVelV
//
void Entity_SetVelV(Entity e, float v) {
	e->vel[1] = v;
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_AddVelLimit
//
//
void Entity_AddVelLimit(Entity e, vec2 vel, float limit) {
	float vlen_orig, vlen;
	vec2 dir, vel_temp;

	// Normalize vel getting vel
	vlen_orig = sqrtf(vec2_dot(vel, vel));
	vec2_scale(dir, vel, 1.0f / vlen_orig);

	// Limit velocity
	vlen = vec2_dot(e->vel, dir);
	if (vlen < limit) {
		vlen = limit - vlen;
		if (vlen > vlen_orig) {
			vlen = vlen_orig;
		}
		vec2_scale(vel_temp, dir, vlen);
		vec2_plus(e->vel, e->vel, vel_temp);
	}
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_AddVelLimitH
//
void Entity_AddVelLimitH(Entity e, float v, float limit) {
	e->vel[0] += v;
	if (e->vel[0] > 0.0f) {
		if (e->vel[0] > limit) {
			e->vel[0] = limit;
		}
	} else {
		if (e->vel[0] < -limit) {
			e->vel[0] = -limit;
		}
	}
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_AddVelLimitH
//
void Entity_AddVelLimitV(Entity e, float v, float limit) {
	e->vel[1] += v;
	if (e->vel[1] > 0.0f) {
		if (e->vel[1] > limit) {
			e->vel[1] = limit;
		}
	} else {
		if (e->vel[1] < -limit) {
			e->vel[1] = -limit;
		}
	}
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_SetColor
//
//
void Entity_SetColor(Entity e, float r, float g, float b, float a) {
	e->color[0] = r;
	e->color[1] = g;
	e->color[2] = b;
	e->color[3] = a;
	e->color0[0] = r;
	e->color0[1] = g;
	e->color0[2] = b;
	e->color0[3] = a;
	e->internalFlags &= ~EntityIntFlag_UpdatedColor;
}

/////////////////////////////
// Entity_AddColor
//
//
void Entity_AddColor(Entity e, float r, float g, float b, float a) {
	e->color[0] += r;
	if (e->color[0] > 1.0f)
		e->color[0] = 1.0f;
	e->color[1] += g;
	if (e->color[1] > 1.0f)
		e->color[1] = 1.0f;
	e->color[2] += b;
	if (e->color[2] > 1.0f)
		e->color[2] = 1.0f;
	e->color[3] += a;
	if (e->color[3] > 1.0f)
		e->color[3] = 1.0f;
	e->internalFlags |= EntityIntFlag_UpdatedColor;
}

/////////////////////////////
// Entity_MultColor
//
//
void Entity_MultColor(Entity e, float r, float g, float b, float a) {
	e->color[0] *= r;
	e->color[1] *= g;
	e->color[2] *= b;
	e->color[3] *= a;
	e->internalFlags |= EntityIntFlag_UpdatedColor;
}

/////////////////////////////
// Entity_SetLight
//
//
void Entity_SetLight(Entity e, float r, float g, float b, float rad) {
	e->light[0] = r;
	e->light[1] = g;
	e->light[2] = b;
	e->light[3] = rad;

	if (!(e->flags & EntityFlag_Light)) {
		e->internalFlags |= EntityIntFlag_UpdateLight;
	}
}

/////////////////////////////
// Entity_SetDefaultColor
//
//
void Entity_SetDefaultColor(Entity e, float r, float g, float b, float a) {
	e->defaultColor[0] = r;
	e->defaultColor[1] = g;
	e->defaultColor[2] = b;
	e->defaultColor[3] = a;
}

/////////////////////////////
// Entity_SetScale
//
void Entity_SetScale(Entity e, float scale[2]) {
	e->scale[0] = scale[0];
	e->scale[1] = scale[1];
	e->internalFlags |= EntityIntFlag_UpdatedScale;
}

/////////////////////////////
// Entity_Iluminate
//
//
void Entity_Iluminate(Entity e, Entity *elist, int n) {
	int i;
	vec2 vdist;
	float qdist, f;
	float qrad;

	if (e->flags & EntityFlag_Light) {
		Entity_SetColor(e, e->defaultColor[0], e->defaultColor[1],
						e->defaultColor[2], e->defaultColor[3]);
		return;
	}

	e->color[0] = e->light[0];
	e->color[1] = e->light[1];
	e->color[2] = e->light[2];
	e->color[3] = 1.0f;

	for (i = 0; i < n; i++) {
		if (e == elist[i] || !(elist[i]->flags & EntityFlag_Light))
			continue;

		vec2_minus(vdist, e->pos, elist[i]->pos);
		qdist = vec2_dot(vdist, vdist);
		qrad = elist[i]->light[3] * elist[i]->light[3];
		if (qdist < qrad) {
			f = 1.0f - qdist / qrad;
			Entity_AddColor(e, f * elist[i]->light[0], f * elist[i]->light[1],
							f * elist[i]->light[2], 0.0f);
		}
	}

	Entity_MultColor(e, e->defaultColor[0], e->defaultColor[1],
					 e->defaultColor[2], e->defaultColor[3]);
	e->internalFlags &= ~EntityIntFlag_UpdateLight;

	if (e->internalFlags & EntityIntFlag_UpdateColor) {
		e->color0[0] = e->color[0];
		e->color0[1] = e->color[1];
		e->color0[2] = e->color[2];
		e->color0[3] = e->color[3];
		e->internalFlags &= ~EntityIntFlag_UpdateColor;
	}
}

/////////////////////////////
// Entity_MarkUpdateLight
//
//
void Entity_MarkUpdateLight(Entity e, Entity *elist, int n) {
	if (e->flags & EntityFlag_Light) {
		int i;
		vec2 max, min;

		if (e->pos0[0] < e->oldpos[0]) {
			min[0] = e->pos0[0] - e->light[3];
			max[0] = e->oldpos[0] + e->light[3];
		} else {
			min[0] = e->oldpos[0] - e->light[3];
			max[0] = e->pos0[0] + e->light[3];
		}
		if (e->pos0[1] < e->oldpos[1]) {
			min[1] = e->pos0[1] - e->light[3];
			max[1] = e->oldpos[1] + e->light[3];
		} else {
			min[1] = e->oldpos[1] - e->light[3];
			max[1] = e->pos0[1] + e->light[3];
		}
		for (i = 0; i < n; i++) {
			if (elist[i] != NULL && min[0] <= elist[i]->pos0[0] &&
				max[0] >= elist[i]->pos0[0] && min[1] <= elist[i]->pos0[1] &&
				max[1] >= elist[i]->pos0[1]) {
				elist[i]->internalFlags |= EntityIntFlag_UpdateLight;
			}
		}
	} else {
		e->internalFlags |= EntityIntFlag_UpdateLight;
	}
}

/////////////////////////////
// Entity_IsLight
//
int Entity_IsLight(Entity e) { return (e->flags & EntityFlag_Light); }

/////////////////////////////
// Entity_IsUpdateLight
//
int Entity_IsUpdateLight(Entity e) {
	return (e->internalFlags & EntityIntFlag_UpdateLight);
}

/////////////////////////////
// Entity_IsMoving
//
int Entity_IsMoving(Entity e) {
	return (e->internalFlags & EntityIntFlag_UpdatedPos);
}
