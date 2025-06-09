// Copyright (C) 2011-2023 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>
#include <stdio.h>
#include <stdlib.h>

#include "Anim.h"
#include "Draw.h"
#include "Util.h"

#include "Bucket.h"
#include "Entity.h"
#include "Component.h"

#define EntityIntFlag_UpdateLight 1
#define EntityIntFlag_UpdatedPos 2
#define EntityIntFlag_UpdatedColor 4
#define EntityIntFlag_UpdateColor 8
#define EntityIntFlag_UpdatedScale 16

/////////////////////////////
// Entity_GetFree
//
//
Entity g_FreeEntity = NULL;
Entity Entity_GetFree() {
	Entity e;

	if (!g_FreeEntity) {
		// Allocate a big block of entities
		int n                = 1024, i;
		TEntity *newEntities = malloc(sizeof(TEntity) * n);
		for (i = 0; i < n; i++) {
			if (i < (n - 1)) {
				newEntities[i].next = &newEntities[i + 1];
			} else {
				newEntities[i].next = NULL;
			}
		}
		g_FreeEntity = newEntities;
	}
	e            = g_FreeEntity;
	g_FreeEntity = e->next;
	return e;
}

/////////////////////////////
// Entity_New
//
//
Entity Entity_New() {
	Entity e = Entity_GetFree();

	e->base = NULL;
	e->type = 0;
	e->flags         = EntityFlag_Collision | EntityFlag_Overlap;
	e->internalFlags = EntityIntFlag_UpdateColor;
	e->zorder        = 1;
	e->sortYOffset   = 0;

	// Component initialization
	e->body = EntBody_New();
	e->sprite = EntSprite_New();

	e->oncopy    = NULL;
	e->oninit    = NULL;
	e->ondelete  = NULL;
	e->proc      = NULL;
	e->postproc  = NULL;
	e->collision = NULL;
	e->overlap   = NULL;

	e->A = 0;
	e->B = 0;
	e->C = 0;
	e->D = 0;
	e->E = 0;
	vec2_set(e->VecA, 0.0f, 0.0f);
	vec2_set(e->VecB, 0.0f, 0.0f);
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
	return (e);
}

/////////////////////////////
// Entity_Destroy
//
//
void Entity_Destroy(Entity e) {
	if (e->ondelete) {
		e->ondelete(e);
	}

	// Destroy components
	if (e->body) {
		EntBody_Destroy(e->body);
		e->body = NULL;
	}
	if (e->sprite) {
		EntSprite_Destroy(e->sprite);
		e->sprite = NULL;
	}

	e->next      = g_FreeEntity;
	g_FreeEntity = e;
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
	n->flags         = e->flags;
	n->internalFlags = e->internalFlags;
	n->zorder        = e->zorder;
	n->sortYOffset   = e->sortYOffset;

	// Component copy
	if (e->body) {
		if (n->body) EntBody_Destroy(n->body); // Destroy default body of n
		n->body = EntBody_Copy(e->body);
		// TODO: Add error handling if n->body is NULL after copy
	}

	if (e->sprite) {
		if (n->sprite) EntSprite_Destroy(n->sprite); // Destroy default sprite of n
		n->sprite = EntSprite_Copy(e->sprite);
		// TODO: Add error handling if n->sprite is NULL after copy
	}

	n->oncopy    = e->oncopy;
	n->oninit    = e->oninit;
	n->ondelete  = e->ondelete;
	n->proc      = e->proc;
	n->postproc  = e->postproc;
	n->collision = e->collision;
	n->overlap   = e->overlap;

	n->A     = e->A;
	n->B     = e->B;
	n->C     = e->C;
	n->D     = e->D;
	n->E     = e->E;
	n->child = e->child;

	n->bbox.parent = n;
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
	if (!e || !e->body) return; // Guard against NULL body

	float hHeight = (max(e->body->height, e->body->radius) / 2) + BBox_ExtraMargin;
	float hWidth  = (max(e->body->width, e->body->radius) / 2) + BBox_ExtraMargin;
	if (e->body->vel[0] > 0) {
		e->bbox.x2 = e->body->pos[0] + e->body->vel[0] + hWidth;
		e->bbox.x1 = e->body->pos[0] - hWidth;
	} else {
		e->bbox.x1 = (e->body->pos[0] + e->body->vel[0]) - hWidth;
		e->bbox.x2 = e->body->pos[0] + hWidth;
	}
	if (e->body->vel[1] > 0) {
		e->bbox.y2 = e->body->pos[1] + e->body->vel[1] + hHeight;
		e->bbox.y1 = e->body->pos[1] - hHeight;
	} else {
		e->bbox.y1 = (e->body->pos[1] + e->body->vel[1]) - hHeight;
		e->bbox.y2 = e->body->pos[1] + hHeight;
	}
	e->bbox.changed = 1;
}

/////////////////////////////
// Entity_BBoxIntersect
//
//
int Entity_BBoxIntersect(Entity ent1, Entity ent2) {
	return BBox_Intersect(&ent1->bbox, &ent2->bbox);
}

/////////////////////////////
// Entity_Draw
//
//
void Entity_Draw(Entity e, int x, int y, float f) {
	if (!e || !e->body || !e->sprite) return; // Guard against NULL components

	vec2 fPos;
	float scale[2];
	// float currentRotation; // old

	if (e->internalFlags & EntityIntFlag_UpdatedColor) {
		Draw_SetColor(
			e->sprite->color0[0] - f * (e->sprite->color0[0] - e->sprite->color[0]),
			e->sprite->color0[1] - f * (e->sprite->color0[1] - e->sprite->color[1]),
			e->sprite->color0[2] - f * (e->sprite->color0[2] - e->sprite->color[2]),
			e->sprite->color0[3] - f * (e->sprite->color0[3] - e->sprite->color[3]));
	} else {
		Draw_SetColor(e->sprite->color[0], e->sprite->color[1], e->sprite->color[2], e->sprite->color[3]);
	}
	if (e->internalFlags & EntityIntFlag_UpdatedScale) {
		scale[0] = e->sprite->scale0[0] - f * (e->sprite->scale0[0] - e->sprite->scale[0]);
		scale[1] = e->sprite->scale0[1] - f * (e->sprite->scale0[1] - e->sprite->scale[1]);
	} else {
		scale[0] = e->sprite->scale[0];
		scale[1] = e->sprite->scale[1];
	}

	// if (e->internalFlags & EntityIntFlag_UpdatedRotation) { // old
	// currentRotation = e->sprite->rotation0 - f * (e->sprite->rotation0 - e->sprite->rotation); // old
	// } else { // old
	// currentRotation = e->sprite->rotation; // old
	// } // old
	float currentRotation;
	if (e->body) { // If there's a physics body, it dictates rotation
		if (e->internalFlags & EntityIntFlag_UpdatedRotation) { // Check if body's rotation was updated for interpolation
			currentRotation = e->body->rotation0 - f * (e->body->rotation0 - e->body->rotation);
		} else {
			currentRotation = e->body->rotation;
		}
		// Optional: synchronize sprite's rotation for non-physics uses if needed
		// e->sprite->rotation = e->body->rotation;
	} else if (e->sprite) { // Fallback to sprite if no body
		if (e->internalFlags & EntityIntFlag_UpdatedRotation) {
			currentRotation = e->sprite->rotation0 - f * (e->sprite->rotation0 - e->sprite->rotation);
		} else {
			currentRotation = e->sprite->rotation;
		}
	} else {
		currentRotation = 0.0f; // Default if no body or sprite
	}

	if (e->internalFlags & EntityIntFlag_UpdatedPos) {
		vec2_interpol(fPos, e->body->pos0, e->body->pos, f);
		AnimPlay_Draw(&e->sprite->anim, (int)(fPos[0] + x), fPos[1] + y, scale, currentRotation);
	} else {
		AnimPlay_Draw(&e->sprite->anim, e->body->pos[0] + x, e->body->pos[1] + y, scale, currentRotation);
	}
}

/////////////////////////////
// Entity_IsVisible
//
//
int Entity_IsVisible(Entity e, int x, int y, int w, int h) {
	int xmax, xmin;
	int ymax, ymin;
	if (!e || !e->body || !e->sprite) return 0; // Guard against NULL components
	int ih, iw;

	AnimPlay_GetSize(&e->sprite->anim, &iw, &ih);

	xmin = x - iw;
	xmax = x + w + iw;
	ymin = y - ih;
	ymax = y + h + ih;

	if (e->body->pos[0] < xmin || e->body->pos[0] > xmax || e->body->pos[1] < ymin || e->body->pos[1] > ymax) {
		return (0);
	}
	return (1);
}

/////////////////////////////
// Entity_Process
//
//
void Entity_Process(Entity e, int ft) {
	if (!e) return; // Guard against NULL entity

	if (e->body && (e->internalFlags & EntityIntFlag_UpdatedPos)) {
		vec2_copy(e->body->pos0, e->body->pos);
		e->internalFlags &= ~EntityIntFlag_UpdatedPos;
	}

	if (e->sprite && (e->internalFlags & EntityIntFlag_UpdatedScale)) {
		e->sprite->scale0[0] = e->sprite->scale[0];
		e->sprite->scale0[1] = e->sprite->scale[1];
		e->internalFlags &= ~EntityIntFlag_UpdatedScale;
	}

	// if (e->sprite && (e->internalFlags & EntityIntFlag_UpdatedRotation)) { // old
	// e->sprite->rotation0 = e->sprite->rotation; // old
	// e->internalFlags &= ~EntityIntFlag_UpdatedRotation; // old
	// } // old
	if (e->internalFlags & EntityIntFlag_UpdatedRotation) {
		if (e->body) {
			e->body->rotation0 = e->body->rotation;
		} else if (e->sprite) { // Fallback for non-physical entities
			e->sprite->rotation0 = e->sprite->rotation;
		}
		e->internalFlags &= ~EntityIntFlag_UpdatedRotation;
	}

	if (e->sprite && (e->internalFlags & EntityIntFlag_UpdatedColor)) {
		e->sprite->color0[0] = e->sprite->color[0];
		e->sprite->color0[1] = e->sprite->color[1];
		e->sprite->color0[2] = e->sprite->color[2];
		e->sprite->color0[3] = e->sprite->color[3];
		e->internalFlags &= ~EntityIntFlag_UpdatedColor;
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
	if (!e || !e->body || !e->sprite) return; // Guard against NULL components
	float qlen, len;

	// Determine if there is movement
	qlen = vec2_dot(e->body->vel, e->body->vel);
	if (qlen > 0.0f) {

		// Update position
		vec2_plus(e->body->pos, e->body->pos, e->body->vel);

		// Apply friction
		len = sqrtf(qlen);
		if (len < e->body->backFric_static) {
			// Stopped by static friction
			vec2_set(e->body->vel, 0, 0);
		} else {
			// Apply dynamic friction
			vec2_scale(e->body->vel, e->body->vel, 1.0f - (e->body->backFric_dynamic + (e->body->backFric_static / len)));
		}

		// Mark the update of the position.
		vec2_copy(e->body->oldpos, e->body->pos);
		e->internalFlags |= EntityIntFlag_UpdatedPos;

		Entity_CalcBBox(e);
	}

	// Launch method
	if (e->postproc) {
		e->postproc(e, ft);
	}

	// Animate
	AnimPlay_IncTime(&e->sprite->anim, ft);
}

/////////////////////////////
// CollisionInfo_New
//
//
CollisionInfo g_FreeCollisionInfo = NULL;
CollisionInfo CollisionInfo_New(int responseType, Entity ent1, Entity ent2, float t, const vec2 n, int applyFriction) {
	CollisionInfo collInfo;

	if (!g_FreeCollisionInfo) {
		collInfo = malloc(sizeof(TCollisionInfo));
	} else {
		collInfo            = g_FreeCollisionInfo;
		g_FreeCollisionInfo = collInfo->next;
	}
	collInfo->next = NULL;

	collInfo->responseType = responseType;
	collInfo->ent1         = ent1;
	collInfo->ent2         = ent2;
	collInfo->t            = t;
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
		nextCollInfo        = collInfo->next;
		collInfo->next      = g_FreeCollisionInfo;
		g_FreeCollisionInfo = collInfo;
		collInfo            = nextCollInfo;
	}
	collInfoRef[0] = NULL;
}

/////////////////////////////
// CollisionInfo_Add
//
//
void CollisionInfo_Add(
	CollisionInfo *collInfoRef, int responseType, Entity ent1, Entity ent2, float t, vec2 n, int applyFriction) {
	if (collInfoRef == NULL) {
		return;
	}
	CollisionInfo prevCollInfo = NULL;
	CollisionInfo collInfo     = collInfoRef[0];
	CollisionInfo newCollInfo  = CollisionInfo_New(responseType, ent1, ent2, t, n, applyFriction);

	while (collInfo != NULL && collInfo->t < t) {
		prevCollInfo = collInfo;
		collInfo     = collInfo->next;
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
int CollisionInfo_CheckRepetition(CollisionInfo collInfo, Entity ent1, Entity ent2) {
	while (collInfo != NULL) {
		if ((collInfo->ent1 == ent1 && collInfo->ent2 == ent2) || (collInfo->ent1 == ent2 && collInfo->ent2 == ent1)) {
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
int Entity_CheckCollision(Entity ent1, Entity ent2, CollisionInfo *collInfoRef) {
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
		if (ent1->body->mass <= 0.0f && ent2->body->mass > 0.0f) {
			ent       = ent2;
			ent_block = ent1;
		} else if (ent2->body->mass <= 0.0f && ent1->body->mass > 0.0f) {
			ent       = ent1;
			ent_block = ent2;
		} else {
			// Two static or two dinamic entities?!?
			return (0);
		}

		// Prepare some variables
		t             = 1.0f;
		applyFriction = 1;

		if (flags & EntityFlag_BlockTop) {
			vec2_set(auxN, 0, -1);
			vec2_scaleadd(p, ent_block->body->pos, auxN, (ent->body->height + ent_block->body->height) / 2);
			block_len = ent_block->body->width + ent->body->width;
			if (Intersect_RayEdge(ent->body->pos, ent->body->vel, auxN, p, block_len, &auxT)) {
				if (auxT < t) {
					vec2_copy(n, auxN);
					t             = auxT;
					applyFriction = 1;
				}
			}
		}

		if (flags & EntityFlag_BlockBottom) {
			vec2_set(auxN, 0, 1);
			vec2_scaleadd(p, ent_block->body->pos, auxN, (ent->body->height + ent_block->body->height) / 2);
			block_len = ent_block->body->width + ent->body->width;
			if (Intersect_RayEdge(ent->body->pos, ent->body->vel, auxN, p, block_len, &auxT)) {
				if (auxT < t) {
					vec2_copy(n, auxN);
					t             = auxT;
					applyFriction = 1;
				}
			}
		}

		if (flags & EntityFlag_BlockRight) {
			vec2_set(auxN, 1, 0);
			vec2_scaleadd(p, ent_block->body->pos, auxN, (ent->body->width + ent_block->body->width) / 2);
			block_len = ent_block->body->height + ent->body->height;
			if (Intersect_RayEdge(ent->body->pos, ent->body->vel, auxN, p, block_len, &auxT)) {
				if (auxT < t) {
					vec2_copy(n, auxN);
					t             = auxT;
					applyFriction = 0;
				}
			}
		}

		if (flags & EntityFlag_BlockLeft) {
			vec2_set(auxN, -1, 0);
			vec2_scaleadd(p, ent_block->body->pos, auxN, (ent->body->width + ent_block->body->width) / 2);
			block_len = ent_block->body->height + ent->body->height;
			if (Intersect_RayEdge(ent->body->pos, ent->body->vel, auxN, p, block_len, &auxT)) {
				if (auxT < t) {
					vec2_copy(n, auxN);
					t             = auxT;
					applyFriction = 0;
				}
			}
		}

		if (t < 1.0f) {
			CollisionInfo_Add(collInfoRef, CollisionResponse_Line, ent, ent_block, t, n, applyFriction);
			return (1);
		}

		return (0);
	}

	// Circle-Circle test from ent1
	if (!ent1->body || !ent2->body) return 0; // Guard against NULL bodies
	vec2_minus(vel, ent1->body->vel, ent2->body->vel);
	if (Collision_CircleCircle(ent1->body->pos, ent1->body->radius, vel, ent2->body->pos, ent2->body->radius, &t, n)) {
		CollisionInfo_Add(collInfoRef, CollisionResponse_Circle, ent1, ent2, t, n, 0);
		return (1);
	}
	return (0);
}

/////////////////////////////
// Entity_CollisionResponseCircle
//
// Normal response to a collision between circles.
void Entity_CollisionResponseCircle(Entity b1, Entity b2, float t, const vec2 n) {
	if (!b1 || !b1->body || !b2 || !b2->body) return; // Guard against NULL entities or bodies
	float moment;
	vec2 temp;
	float elast;

	if (b1->body->mass > 0.0f && b2->body->mass > 0.0f) {
		// Calculate elasticity
		elast = (b1->body->mass * b1->body->elast + b2->body->mass * b2->body->elast) / (b1->body->mass + b2->body->mass);

		// Collision between two massed balls
		moment = ((1.0f + elast) * b1->body->mass * b2->body->mass * (fabs(vec2_dot(b1->body->vel, n)) + fabs(vec2_dot(b2->body->vel, n)))) /
		         (b1->body->mass + b2->body->mass);
		vec2_scale(temp, n, moment / b1->body->mass);
		vec2_minus(b1->body->vel, b1->body->vel, temp);
		Entity_CalcBBox(b1);
		vec2_scale(temp, n, moment / b2->body->mass);
		vec2_plus(b2->body->vel, b2->body->vel, temp);
		Entity_CalcBBox(b2);
	} else if (b1->body->mass > 0.0f && b2->body->mass <= 0.0f) {
		// Collision between a massed ball and a fixed ball
		moment = (1.0f + b1->body->elast) * (vec2_dot(b1->body->vel, n));
		vec2_scale(temp, n, moment);
		vec2_minus(b1->body->vel, b1->body->vel, temp);
		Entity_CalcBBox(b1);
	} else if (b1->body->mass <= 0.0f && b2->body->mass > 0.0f) {
		// Collision between a massed ball and a fixed ball
		// (imposible, but better safe)
		moment = (1.0f + b2->body->elast) * (vec2_dot(b2->body->vel, n));
		vec2_scale(temp, n, moment);
		vec2_plus(b2->body->vel, b2->body->vel, temp);
		Entity_CalcBBox(b2);
	} else {
		// Collision between 2 fixed balls
		// (imposible, but better safe)
		vec2_set(b1->body->vel, 0, 0);
		Entity_CalcBBox(b1);
		vec2_set(b2->body->vel, 0, 0);
		Entity_CalcBBox(b2);
	}
}

/////////////////////////////
// Entity_CollisionResponseLine
//
// Normal response to a collision with a line.
void Entity_CollisionResponseLine(Entity ent, Entity ent2, float t, vec2 norm, int applyFriction) {
	if (!ent || !ent->body || !ent2 || !ent2->body) return; // Guard against NULL entities or bodies
	vec2 pos2, vel2, velFric, intersection;
	float dist, fric_static, fric_dynamic, fricLen;

	// Calculate end position
	vec2_scale(vel2, ent->body->vel, 1.0f - t);
	dist = -vec2_dot(norm, vel2);
	vec2_plus(pos2, ent->body->pos, ent->body->vel);
	vec2_scaleadd(pos2, pos2, norm, dist);

	// Calculate intersection
	vec2_scaleadd(intersection, ent->body->pos, ent->body->vel, t);

	if (applyFriction) {
		// Calculate friction
		fric_static  = (ent->body->fric_static + ent2->body->fric_static) / 2;
		fric_dynamic = (ent->body->fric_dynamic + ent2->body->fric_dynamic) / 2;

		// Apply friction
		vec2_minus(velFric, pos2, intersection);
		fricLen = sqrtf(vec2_dot(velFric, velFric));
		if (fricLen < fric_static) {
			// Apply static friction
			vec2_copy(pos2, intersection);
		} else {
			// Apply dynamic friction
			if (fricLen > 0.0f) {
				vec2_scaleadd(pos2, intersection, velFric, 1.0f - (fric_dynamic + (fric_static / fricLen)));
			} else {
				vec2_scaleadd(pos2, intersection, velFric, 1.0f - fric_dynamic);
			}
		}
	}

	// Apply to velocity
	vec2_scaleadd(pos2, pos2, norm, 0.1f);
	vec2_minus(ent->body->vel, pos2, ent->body->pos);

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
			rc = collInfo->ent1->collision(collInfo->ent1, collInfo->ent2, collInfo->t, n1);
			if (rc == 0)
				response = 0;
			if (rc > 1)
				response = 2;
		}
		if (collInfo->ent2->collision) {
			rc = collInfo->ent2->collision(collInfo->ent2, collInfo->ent1, collInfo->t, n2);
			if (rc == 0)
				response = 0;
			if (rc > 1)
				response = 2;
		}

		// Collision response
		if (response == 1) {
			if (!collInfo->ent1->body || !collInfo->ent2->body) return 0; // Guard
			if (collInfo->responseType == CollisionResponse_Line) {
				Entity_CollisionResponseLine(
					collInfo->ent1, collInfo->ent2, collInfo->t, collInfo->n, collInfo->applyFriction);
			} else if (collInfo->responseType == CollisionResponse_Circle) {
				if (vec2_dot(collInfo->ent1->body->vel, collInfo->ent1->body->vel) >
				    vec2_dot(collInfo->ent2->body->vel, collInfo->ent2->body->vel)) {
					Entity_CollisionResponseCircle(collInfo->ent1, collInfo->ent2, collInfo->t, n2);
				} else {
					Entity_CollisionResponseCircle(collInfo->ent2, collInfo->ent1, collInfo->t, n1);
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
	if (!b1 || !b1->body || !b2 || !b2->body) return; // Guard
	vec2 len;

	vec2_minus(len, b1->body->pos, b2->body->pos);

	vec2_set(len, fabs(b1->body->pos[0] - b2->body->pos[0]), fabs(b1->body->pos[1] - b2->body->pos[1]));
	if (b1->overlap) {
		if (len[0] <= b1->body->radius && len[1] <= b1->body->radius) {
			b1->overlap(b1, b2);
		}
	}
	if (b2->overlap) {
		if (len[0] <= b2->body->radius && len[1] <= b2->body->radius) {
			b2->overlap(b2, b1);
		}
	}
}

/////////////////////////////
// Entity_GetPos
//
//
void Entity_GetPos(Entity e, vec2 pos) { if (!e || !e->body) return; vec2_copy(pos, e->body->pos); }

/////////////////////////////
// Entity_SetPos
//
//
void Entity_SetPos(Entity e, const vec2 pos) {
	if (!e || !e->body) return;
	vec2_copy(e->body->pos, pos);
	vec2_copy(e->body->oldpos, pos);
	vec2_copy(e->body->pos0, pos);
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_AddPos
//
//
void Entity_AddPos(Entity e, const vec2 pos) {
	if (!e || !e->body) return;
	vec2_plus(e->body->pos, e->body->pos, pos);
	vec2_copy(e->body->oldpos, e->body->pos);
	vec2_copy(e->body->pos0, e->body->pos);
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_UpdatePos
//
//
void Entity_UpdatePos(Entity e, const vec2 pos) {
	if (!e || !e->body) return;
	// Mark the update of the position.
	vec2_copy(e->body->oldpos, e->body->pos);
	e->internalFlags |= EntityIntFlag_UpdatedPos;

	vec2_copy(e->body->pos, pos);
}

/////////////////////////////
// Entity_AddVel
//
void Entity_AddVel(Entity e, const vec2 vel) {
	if (!e || !e->body) return;
	vec2_plus(e->body->vel, e->body->vel, vel);
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_SetVel
//
void Entity_SetVel(Entity e, const vec2 vel) {
	if (!e || !e->body) return;
	vec2_copy(e->body->vel, vel);
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_SetVelH
//
void Entity_SetVelH(Entity e, float v) {
	if (!e || !e->body) return;
	e->body->vel[0] = v;
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_SetVelV
//
void Entity_SetVelV(Entity e, float v) {
	if (!e || !e->body) return;
	e->body->vel[1] = v;
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_AddVelLimit
//
//
void Entity_AddVelLimit(Entity e, const vec2 vel, float limit) {
	if (!e || !e->body) return;
	float vlen_orig, vlen;
	vec2 dir, vel_temp;

	// Normalize vel getting vel
	vlen_orig = sqrtf(vec2_dot(vel, vel));
	if (vlen_orig == 0.0f) return; // Avoid division by zero
	vec2_scale(dir, vel, 1.0f / vlen_orig);

	// Limit velocity
	vlen = vec2_dot(e->body->vel, dir);
	if (vlen < limit) {
		vlen = limit - vlen;
		if (vlen > vlen_orig) {
			vlen = vlen_orig;
		}
		vec2_scale(vel_temp, dir, vlen);
		vec2_plus(e->body->vel, e->body->vel, vel_temp);
	}
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_AddVelLimitH
//
void Entity_AddVelLimitH(Entity e, float v, float limit) {
	if (!e || !e->body) return;
	e->body->vel[0] += v;
	if (e->body->vel[0] > 0.0f) {
		if (e->body->vel[0] > limit) {
			e->body->vel[0] = limit;
		}
	} else {
		if (e->body->vel[0] < -limit) {
			e->body->vel[0] = -limit;
		}
	}
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_AddVelLimitH
//
void Entity_AddVelLimitV(Entity e, float v, float limit) {
	if (!e || !e->body) return;
	e->body->vel[1] += v;
	if (e->body->vel[1] > 0.0f) {
		if (e->body->vel[1] > limit) {
			e->body->vel[1] = limit;
		}
	} else {
		if (e->body->vel[1] < -limit) {
			e->body->vel[1] = -limit;
		}
	}
	Entity_CalcBBox(e);
}

/////////////////////////////
// Entity_SetColor
//
//
void Entity_SetColor(Entity e, float r, float g, float b, float a) {
	if (!e || !e->sprite) return;
	e->sprite->color[0]  = r;
	e->sprite->color[1]  = g;
	e->sprite->color[2]  = b;
	e->sprite->color[3]  = a;
	e->sprite->color0[0] = r;
	e->sprite->color0[1] = g;
	e->sprite->color0[2] = b;
	e->sprite->color0[3] = a;
	e->internalFlags &= ~EntityIntFlag_UpdatedColor;
}

/////////////////////////////
// Entity_AddColor
//
//
void Entity_AddColor(Entity e, float r, float g, float b, float a) {
	if (!e || !e->sprite) return;
	e->sprite->color[0] += r;
	if (e->sprite->color[0] > 1.0f)
		e->sprite->color[0] = 1.0f;
	e->sprite->color[1] += g;
	if (e->sprite->color[1] > 1.0f)
		e->sprite->color[1] = 1.0f;
	e->sprite->color[2] += b;
	if (e->sprite->color[2] > 1.0f)
		e->sprite->color[2] = 1.0f;
	e->sprite->color[3] += a;
	if (e->sprite->color[3] > 1.0f)
		e->sprite->color[3] = 1.0f;
	e->internalFlags |= EntityIntFlag_UpdatedColor;
}

/////////////////////////////
// Entity_MultColor
//
//
void Entity_MultColor(Entity e, float r, float g, float b, float a) {
	if (!e || !e->sprite) return;
	e->sprite->color[0] *= r;
	e->sprite->color[1] *= g;
	e->sprite->color[2] *= b;
	e->sprite->color[3] *= a;
	e->internalFlags |= EntityIntFlag_UpdatedColor;
}

/////////////////////////////
// Entity_SetLight
//
//
void Entity_SetLight(Entity e, float r, float g, float b, float rad) {
	if (!e || !e->sprite) return;
	e->sprite->light[0] = r;
	e->sprite->light[1] = g;
	e->sprite->light[2] = b;
	e->sprite->light[3] = rad;

	if (!(e->flags & EntityFlag_Light)) {
		e->internalFlags |= EntityIntFlag_UpdateLight;
	}
}

/////////////////////////////
// Entity_SetDefaultColor
//
//
void Entity_SetDefaultColor(Entity e, float r, float g, float b, float a) {
	if (!e || !e->sprite) return;
	e->sprite->defaultColor[0] = r;
	e->sprite->defaultColor[1] = g;
	e->sprite->defaultColor[2] = b;
	e->sprite->defaultColor[3] = a;
}

/////////////////////////////
// Entity_SetScale
//
void Entity_SetScale(Entity e, const float scale[2]) {
	if (!e || !e->sprite) return;
	e->sprite->scale[0] = scale[0];
	e->sprite->scale[1] = scale[1];
	e->internalFlags |= EntityIntFlag_UpdatedScale;
}

/////////////////////////////
// Entity_GetScale
//
void Entity_GetScale(Entity e, float scale[2]) {
	if (!e || !e->sprite) return;
	scale[0] = e->sprite->scale[0];
	scale[1] = e->sprite->scale[1];
}

/////////////////////////////
// Entity_SetRotation
//
void Entity_SetRotation(Entity e, float angle) {
	// if (!e || !e->sprite) return; // old
	// e->sprite->rotation = angle; // old
	// e->internalFlags |= EntityIntFlag_UpdatedRotation; // old
	if (!e) return;
	int changed = 0;
	if (e->body) {
		e->body->rotation = angle;
		changed = 1;
	}
	if (e->sprite) { // Keep sprite rotation in sync or for non-physical entities
		e->sprite->rotation = angle;
		changed = 1;
	}
	if (changed) {
		e->internalFlags |= EntityIntFlag_UpdatedRotation;
	}
}

/////////////////////////////
// Entity_GetRotation
//
void Entity_GetRotation(Entity e, float *angle) {
	// if (!e || !e->sprite) return; // old
	// if (angle) { // old
	// *angle = e->sprite->rotation; // old
	// } // old
	if (!e || !angle) return;
	if (e->body) {
		*angle = e->body->rotation;
	} else if (e->sprite) {
		*angle = e->sprite->rotation;
	} else {
		*angle = 0.0f; // Default if no body/sprite
	}
}

/////////////////////////////
// Entity_AddRotation
//
void Entity_AddRotation(Entity e, float angle) {
	// if (!e || !e->sprite) return; // old
	// e->sprite->rotation += angle; // old
	// e->internalFlags |= EntityIntFlag_UpdatedRotation; // old
	if (!e) return;
	int changed = 0;
	if (e->body) {
		e->body->rotation += angle;
		changed = 1;
	}
	if (e->sprite) { // Keep sprite rotation in sync or for non-physical entities
		e->sprite->rotation += angle;
		changed = 1;
	}
	if (changed) {
		e->internalFlags |= EntityIntFlag_UpdatedRotation;
	}
}

/////////////////////////////
// Entity_Iluminate
//
//
void Entity_Iluminate(Entity e, Entity *entityList, int n) {
	int i;
	vec2 vdist;
	float qdist, f;
	if (!e || !e->body || !e->sprite || !entityList) return; // Guard
	float qrad;

	if (e->flags & EntityFlag_Light) {
		Entity_SetColor(e, e->sprite->defaultColor[0], e->sprite->defaultColor[1], e->sprite->defaultColor[2], e->sprite->defaultColor[3]);
		return;
	}

	e->sprite->color[0] = e->sprite->light[0];
	e->sprite->color[1] = e->sprite->light[1];
	e->sprite->color[2] = e->sprite->light[2];
	// Alpha is preserved from current color
	// e->sprite->color[3] = e->sprite->color[3]; // No change

	for (i = 0; i < n; i++) {
		if (!entityList[i] || !entityList[i]->body || !entityList[i]->sprite) continue; // Guard
		if (e == entityList[i] || !(entityList[i]->flags & EntityFlag_Light)) {
			continue;
		}

		vec2_minus(vdist, e->body->pos, entityList[i]->body->pos);
		qdist = vec2_dot(vdist, vdist);
		qrad  = entityList[i]->sprite->light[3] * entityList[i]->sprite->light[3];
		if (qdist < qrad) {
			f = 1.0f - qdist / qrad;
			Entity_AddColor(
				e, f * entityList[i]->sprite->light[0], f * entityList[i]->sprite->light[1], f * entityList[i]->sprite->light[2], 0.0f);
		}
	}

	Entity_MultColor(e, e->sprite->defaultColor[0], e->sprite->defaultColor[1], e->sprite->defaultColor[2], e->sprite->defaultColor[3]);
	e->internalFlags &= ~EntityIntFlag_UpdateLight;

	if (e->internalFlags & EntityIntFlag_UpdateColor) {
		e->sprite->color0[0] = e->sprite->color[0];
		e->sprite->color0[1] = e->sprite->color[1];
		e->sprite->color0[2] = e->sprite->color[2];
		e->sprite->color0[3] = e->sprite->color[3];
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
		if (!e->body || !e->sprite) return; // Guard
		vec2 max, min;

		if (e->body->pos0[0] < e->body->oldpos[0]) {
			min[0] = e->body->pos0[0] - e->sprite->light[3];
			max[0] = e->body->oldpos[0] + e->sprite->light[3];
		} else {
			min[0] = e->body->oldpos[0] - e->sprite->light[3];
			max[0] = e->body->pos0[0] + e->sprite->light[3];
		}
		if (e->body->pos0[1] < e->body->oldpos[1]) {
			min[1] = e->body->pos0[1] - e->sprite->light[3];
			max[1] = e->body->oldpos[1] + e->sprite->light[3];
		} else {
			min[1] = e->body->oldpos[1] - e->sprite->light[3];
			max[1] = e->body->pos0[1] + e->sprite->light[3];
		}
		for (i = 0; i < n; i++) {
			if (elist[i] != NULL && elist[i]->body && min[0] <= elist[i]->body->pos0[0] && max[0] >= elist[i]->body->pos0[0] &&
			    min[1] <= elist[i]->body->pos0[1] && max[1] >= elist[i]->body->pos0[1]) {
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
int Entity_IsUpdateLight(Entity e) { return (e->internalFlags & EntityIntFlag_UpdateLight); }

/////////////////////////////
// Entity_IsMoving
//
int Entity_IsMoving(Entity e) { if (!e) return 0; return (e->internalFlags & EntityIntFlag_UpdatedPos); }
