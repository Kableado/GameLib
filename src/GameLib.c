// Copyright (C) 2011-2023 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "GameLib.h"
#include "Physics.h" // Added for physics functions

#include <float.h>

// Globals
Entity *g_Entity                   = NULL;
int *g_EntityFlag                  = NULL;
int g_NumEntities                  = 0;
int g_NumEntitiesAllocated         = 0;
int g_EntitiesLock                 = 0;
int g_EntitiesCompactate           = 0;
void (*g_GameProcFunc)()           = NULL;
void (*g_GamePostProcFunc)()       = NULL;
void (*g_GamePreDrawFunc)(float f) = NULL;
void (*g_GameDrawFunc)(float f)    = NULL;
int g_ProcFt;
int g_GameSize[2];
int g_GamePos0[2];
int g_GamePos1[2];
int g_GamePosOffset[2];

long long t_proc;
long long t_col;
long long t_over;
long long t_postproc;
long long t_draw;
int fproc_count;
int fdraw_count;

typedef struct TParallaxBackground TParallaxBackground, *ParallaxBackground;
struct TParallaxBackground {
	DrawImg img;
	int imgSize[2];
	int imgOffset[2];
	float parallaxFactor[2];
};
#define MaxParallaxBackgrounds 10
TParallaxBackground g_ParallaxBackground[MaxParallaxBackgrounds];
int g_NumParallaxBackgrounds = 0;

TBucketGrid g_BucketGrid;

/////////////////////////////
// GameLib_Init
//
// Initializes the game.
int GameLib_Init(int w, int h, char *title, int pFps, int fps) {
	if (!Draw_Init(w, h, title, pFps, fps)) {
		return (0);
	}
	if (!Input_Init()) {
		return (0);
	}
	Audio_Init();

	g_GameSize[0] = w;
	g_GameSize[1] = h;
	g_GamePos0[0] = 0;
	g_GamePos0[1] = 0;
	g_GamePos1[0] = 0;
	g_GamePos1[1] = 0;

	g_ProcFt = 1000 / pFps;

	BucketGrid_Init(&g_BucketGrid, 1, 1, 64, 32, 32);

	return (1);
}

/////////////////////////////
// GameLib_PrepareSize
//
//
void GameLib_PrepareSize(const float x1, const float y1, const float x2, const float y2) {
	const float bucketSize = 64;

	const float width       = x2 - x1;
	const float height      = y2 - y1;
	const int widthBuckets  = (int)ceilf(width / bucketSize);
	const int heightBuckets = (int)ceilf(height / bucketSize);

	BucketGrid_DeInit(&g_BucketGrid);
	BucketGrid_Init(&g_BucketGrid, widthBuckets, heightBuckets, bucketSize, -x1, -y1);
	for (int i = 0; i < g_NumEntities; i++) {
		BucketGrid_AddItem(&g_BucketGrid, &g_Entity[i]->bbox);
	}
}

/////////////////////////////
// GameLib_CheckSize
//
//
void GameLib_CheckSize() {
	float xMin = FLT_MAX;
	float yMin = FLT_MAX;
	float xMax = FLT_MIN;
	float yMax = FLT_MIN;
	for (int i = 0; i < g_NumEntities; i++) {
		if (g_Entity[i]->bbox.x1 < xMin)
			xMin = g_Entity[i]->bbox.x1;
		if (g_Entity[i]->bbox.x2 > xMax)
			xMax = g_Entity[i]->bbox.x2;
		if (g_Entity[i]->bbox.y1 < yMin)
			yMin = g_Entity[i]->bbox.y1;
		if (g_Entity[i]->bbox.y2 > yMax)
			yMax = g_Entity[i]->bbox.y2;
	}
	GameLib_PrepareSize(xMin, yMin, xMax, yMax);
}

/////////////////////////////
// GameLib_AddEntity
//
// Adds an entity to the game.
void GameLib_AddEntity(Entity e) {
	if (g_NumEntities >= g_NumEntitiesAllocated) {
		Entity *entity_aux;
		int *entity_flag_aux;
		int i;

		// Grow the array
		if (g_NumEntitiesAllocated == 0) {
			g_NumEntitiesAllocated = 32;
		} else {
			g_NumEntitiesAllocated *= 2;
		}
		entity_aux      = malloc(sizeof(Entity) * g_NumEntitiesAllocated);
		entity_flag_aux = malloc(sizeof(int) * g_NumEntitiesAllocated);
		for (i = 0; i < g_NumEntities; i++) {
			entity_aux[i]      = g_Entity[i];
			entity_flag_aux[i] = g_EntityFlag[i];
		}
		if (g_Entity) {
			free(g_Entity);
			free(g_EntityFlag);
		}
		g_Entity     = entity_aux;
		g_EntityFlag = entity_flag_aux;
	}

	// Add the entity
	g_Entity[g_NumEntities]     = e;
	g_EntityFlag[g_NumEntities] = 1;
	g_NumEntities++;

	// Mark for light update
	Entity_MarkUpdateLight(e, g_Entity, g_NumEntities);

	Entity_CalcBBox(e);
	if (BucketGrid_AddItem(&g_BucketGrid, &e->bbox) == 0) {
		GameLib_CheckSize();
	}

	Entity_Init(e);
}

/////////////////////////////
// GameLib_UnrefEntity
//
// removes the reference to the entity.
int GameLib_UnrefEntity(Entity e) {
	int i;
	for (i = 0; i < g_NumEntities; i++) {
		if (e == g_Entity[i]) {
			// Mark or unref
			if (g_EntitiesLock) {
				g_EntityFlag[i] = -2;
			} else {
				g_Entity[i]     = NULL;
				g_EntityFlag[i] = 0;
			}
			g_EntitiesCompactate = 1;

			// Mark for light update
			Entity_MarkUpdateLight(e, g_Entity, g_NumEntities);
			return (i);
		}
	}
	return (-1);
}

/////////////////////////////
// GameLib_DelEntity
//
// Adds an entity to the game.
int GameLib_DelEntity(Entity e) {
	int i;
	if ((i = GameLib_UnrefEntity(e)) == -1) {
		return (0);
	}
	if (g_EntitiesLock) {
		// Delete latter
		g_Entity[i]     = e;
		g_EntityFlag[i] = -1;
	} else {
		// Delete now
		BucketGrid_RemoveItem(&g_BucketGrid, &g_Entity[i]->bbox);
		Entity_Destroy(e);
	}
	return (1);
}

/////////////////////////////
// GameLib_Compactate
//
//
void GameLib_Compactate() {
	int i, j;
	j = 0;
	if (!g_EntitiesCompactate) {
		return;
	}
	for (i = 0; i < g_NumEntities; i++) {
		if (!g_Entity[i] || g_EntityFlag[i] == -2) {
			continue;
		}
		if (g_EntityFlag[i] == -1) {
			BucketGrid_RemoveItem(&g_BucketGrid, &g_Entity[i]->bbox);
			Entity_Destroy(g_Entity[i]);
			continue;
		}
		if (i > j) {
			g_Entity[j]     = g_Entity[i];
			g_EntityFlag[j] = g_EntityFlag[i];
		}
		j++;
	}
	g_NumEntities        = j;
	g_EntitiesCompactate = 0;
}

/////////////////////////////
// GameLib_ProcLoop
//
// Process the loop.
void GameLib_ProcLoop(void *data) {
	int i, j;
	int repeat;
	long long time;
	float deltaTime = (float)g_ProcFt / 1000.0f; // Calculate deltaTime

	// Step the gamePosition
	g_GamePos0[0] = g_GamePos1[0] + g_GamePosOffset[0];
	g_GamePos0[1] = g_GamePos1[1] + g_GamePosOffset[1];

	// Process
	time           = Time_GetTime();
	g_EntitiesLock = 1;
	if (g_GameProcFunc) {
		g_GameProcFunc();
	}
	for (i = 0; i < g_NumEntities; i++) {
		if (!g_Entity[i]) {
			continue;
		}
		Entity_Process(g_Entity[i], g_ProcFt);
	}
	GameLib_Compactate();
	g_EntitiesLock = 0;

	// --- Physics Integration Step ---
	// Optional: Add a new profiling timer like t_physics_integrate if desired
	// long long physics_time_start = Time_GetTime();
	Physics_Step(g_Entity, g_NumEntities, deltaTime);
	// t_physics_integrate += Time_GetTime() - physics_time_start;

	if (BucketGrid_ProcessChanged(&g_BucketGrid) == 0) {
		Print("Rebuild BucketGrid");
		BucketGrid_Clean(&g_BucketGrid);
		for (int i = 0; i < g_NumEntities; i++) {
			BucketGrid_AddItem(&g_BucketGrid, &g_Entity[i]->bbox);
		}
	}

	t_proc += Time_GetTime() - time;

	// Collisions between entities
	time           = Time_GetTime();
	g_EntitiesLock = 1;
	int count      = 0;
	int maxCount   = 50;
	do {
		repeat                 = 0;
		CollisionInfo collInfo = NULL;
		for (i = 0; i < g_NumEntities; i++) {
			Entity ent = g_Entity[i];
			if (!(ent->flags & EntityFlag_Collision) || ent->mass < 0.0f) {
				continue;
			}
			if (ent->vel[0] <= 0.0f && ent->vel[0] >= -0.0f && ent->vel[1] <= 0.0f && ent->vel[1] >= -0.0f) {
				continue;
			}
			TBucket bucket;
			BucketGrid_Query(&g_BucketGrid, &ent->bbox, &bucket);
			for (j = 0; j < bucket.count; j++) {
				Entity entCollision = bucket.bbox[j]->parent;
				if (ent == entCollision || !(entCollision->flags & EntityFlag_Collision) ||
				    CollisionInfo_CheckRepetition(collInfo, ent, entCollision)) {
					continue;
				}
				Entity_CheckCollision(ent, entCollision, &collInfo);
			}
		}
		if (Entity_CollisionInfoResponse(collInfo)) {
			repeat = 1;
		}
		CollisionInfo_Destroy(&collInfo);
		count++;
	} while (repeat && count < maxCount);

	// Stop remaining collisions
	if (count >= maxCount) {
		for (i = 0; i < g_NumEntities; i++) {
			Entity ent = g_Entity[i];
			if (!(ent->flags & EntityFlag_Collision) || ent->mass < 0.0f) {
				continue;
			}
			TBucket bucket;
			BucketGrid_Query(&g_BucketGrid, &ent->bbox, &bucket);
			for (j = 0; j < bucket.count; j++) {
				Entity entCollision = bucket.bbox[j]->parent;
				if (ent == entCollision || !(entCollision->flags & EntityFlag_Collision)) {
					continue;
				}
				if (Entity_CheckCollision(ent, entCollision, NULL)) {
					vec2_set(ent->vel, 0, 0);
					Entity_CalcBBox(ent);
					vec2_set(entCollision->vel, 0, 0);
					Entity_CalcBBox(entCollision);
				}
			}
		}
	}
	GameLib_Compactate();
	g_EntitiesLock = 0;
	t_col += Time_GetTime() - time;

	// --- New SAT Collision Detection and Response Loop ---
     g_EntitiesLock = 1;
     for (int i = 0; i < g_NumEntities; ++i) {
         Entity ent1 = g_Entity[i];

         if (!ent1 || !ent1->body || !(ent1->flags & EntityFlag_Collision)) {
             continue;
         }

         for (int j = i + 1; j < g_NumEntities; ++j) {
             Entity ent2 = g_Entity[j];

             if (!ent2 || !ent2->body || !(ent2->flags & EntityFlag_Collision)) {
                 continue;
             }

             // Determine interaction type
             int is_ent1_box = (ent1->type == Ent_Box);
             int is_ent2_box = (ent2->type == Ent_Box);
             int is_ent1_platform = (ent1->type == Ent_Platform);
             int is_ent2_platform = (ent2->type == Ent_Platform);

             if (is_ent1_box && is_ent2_box) {
                 // Box vs Box
                 CollisionResult result;
                 CheckCollision_SAT(&result, ent1, ent2);
                 if (result.colliding) {
                     ResolveCollision_LinearImpulse(ent1, ent2, &result);
                 }
             } else if (is_ent1_box && is_ent2_platform) {
                 // Box vs Platform
                 CollisionResult result;
                 CheckCollision_SAT(&result, ent1, ent2); // ent1=Box, ent2=Platform
                 if (result.colliding) {
                     ResolveCollision_LinearImpulse(ent1, ent2, &result);
                 }
             } else if (is_ent1_platform && is_ent2_box) {
                 // Platform vs Box (already handled if we ensure ent1 is always the box, or pass in specific order)
                 // To avoid double collision response, pass consistently or ensure ResolveCollision handles static correctly.
                 // Let CheckCollision_SAT determine normal, ResolveCollision_LinearImpulse apply impulses.
                 // It's better to call it once per pair.
                 CollisionResult result;
                 // Note: SAT normal might depend on order, but MTV direction is corrected in CheckCollision_SAT.
                 // ResolveCollision_LinearImpulse uses inverseMass so order of dynamic vs static matters less for outcome.
                 CheckCollision_SAT(&result, ent1, ent2); // ent1=Platform, ent2=Box
                 if (result.colliding) {
                     ResolveCollision_LinearImpulse(ent1, ent2, &result);
                 }
             }
         }
     }
     GameLib_Compactate();
     g_EntitiesLock = 0;

	// Process Overlaps
	time           = Time_GetTime();
	g_EntitiesLock = 1;
	for (i = 0; i < g_NumEntities; i++) {
		Entity ent = g_Entity[i];
		if (!(ent->flags & EntityFlag_Overlap) || ent->mass < 0.0f) {
			continue;
		}
		TBucket bucket;
		BucketGrid_Query(&g_BucketGrid, &ent->bbox, &bucket);
		for (j = 0; j < bucket.count; j++) {
			Entity entCollision = bucket.bbox[j]->parent;
			if (!(entCollision->flags & EntityFlag_Overlap) || ent == entCollision) {
				continue;
			}
			Entity_Overlaps(ent, entCollision);
		}
	}
	GameLib_Compactate();
	g_EntitiesLock = 0;
	t_over += Time_GetTime() - time;

	// Sort
	int n = g_NumEntities;
	do {
		int n2 = 0;
		for (i = 1; i < n; i++) {
			Entity ent1 = g_Entity[i - 1];
			Entity ent2 = g_Entity[i];
			int swap    = 0;
			if (ent1->zorder > ent2->zorder) {
				// Lower level
				swap = 1;
			} else if (ent1->zorder < ent2->zorder) {
				// Upper level
			} else {
				// Same level
				const float y1 = ent1->pos[1] + ent1->sortYOffset;
				const float y2 = ent2->pos[1] + ent2->sortYOffset;
				if (y1 == y2) {
					if (ent1->pos[0] < ent2->pos[0]) {
						swap = 1;
					}
				} else if (y1 > y2) {
					swap = 1;
				}
			}
			if (swap) {
				Entity ent      = g_Entity[i];
				g_Entity[i]     = g_Entity[i - 1];
				g_Entity[i - 1] = ent;
				n2              = i;
			}
		}
		n = n2;
	} while (n > 0);

	// PostProcess
	time           = Time_GetTime();
	g_EntitiesLock = 1;
	for (i = 0; i < g_NumEntities; i++) {
		Entity_PostProcess(g_Entity[i], g_ProcFt);
		if (Entity_IsMoving(g_Entity[i])) {
			Entity_MarkUpdateLight(g_Entity[i], g_Entity, g_NumEntities);
		}
	}
	if (g_GamePostProcFunc) {
		g_GamePostProcFunc();
	}
	GameLib_Compactate();
	g_EntitiesLock = 0;
	t_postproc += Time_GetTime() - time;

	fproc_count++;
}

/////////////////////////////
// GameLib_DrawLoop
//
//
void GameLib_DrawLoop(void *data, float f) {
	long long time;
	int i;
	int game_pos[2];

	GameLib_GetPosInstant(game_pos, f);

	time = Time_GetTime();

	// PreDraw
	if (g_GamePreDrawFunc) {
		g_GamePreDrawFunc(f);
	} else {
		if (g_NumParallaxBackgrounds == 0) {
			// Clean screen
			Draw_Clean(0, 0, 0);
		}
	}

	// Draw parallax backgrounds
	for (i = 0; i < g_NumParallaxBackgrounds; i++) {
		Draw_ImgParallax(
			g_ParallaxBackground[i].img,
			g_ParallaxBackground[i].imgSize,
			g_ParallaxBackground[i].imgOffset,
			g_ParallaxBackground[i].parallaxFactor,
			game_pos,
			g_GameSize);
	}

	// Draw entities
	GameLib_Compactate();
	for (i = 0; i < g_NumEntities; i++) {
		Entity e = g_Entity[i];

		// Check visibility
		if (!Entity_IsVisible(e, game_pos[0], game_pos[1], g_GameSize[0], g_GameSize[1])) {
			continue;
		}

		// Update illumination of this entity
		if (Entity_IsUpdateLight(e)) {
			Entity_Iluminate(e, g_Entity, g_NumEntities);
		}

		Entity_Draw(e, -game_pos[0], -game_pos[1], f);
	}
	Draw_SetColor(1, 1, 1, 1);
	g_EntitiesLock = 1;
	if (g_GameDrawFunc) {
		g_GameDrawFunc(f);
	}
	GameLib_Compactate();
	g_EntitiesLock = 0;

	t_draw += Time_GetTime() - time;

	fdraw_count++;

#ifndef EMSCRIPTEN
	if (Input_GetKey(InputKey_Screenshot) == InputKey_Pressed) {
		// Screenshot key
		char strFile[255];
		int idx = -1;
		do {
			idx++;
			snprintf(strFile, 255, "shot-%04d.png", idx);
		} while (access(strFile, F_OK) != -1);
		Draw_SaveScreenshot(strFile);
		Print("Screenshot saved \"%s\"\n", strFile);
	}
#endif // EMSCRIPTEN

	if (Input_GetKey(InputKey_DumpProfiling) == InputKey_Pressed && fproc_count > 0 && fdraw_count > 0) {
		Print("Profiling:::::::::\n");
		Print("t_proc.....:%6lldus\n", t_proc / fproc_count);
		Print("t_col......:%6lldus\n", t_col / fproc_count);
		Print("t_over.....:%6lldus\n", t_over / fproc_count);
		Print("t_postproc.:%6lldus\n", t_postproc / fproc_count);
		Print("t_draw.....:%6lldus\n", t_draw / fdraw_count);
		Print("n_ents.....:%6lld\n", g_NumEntities);
		t_proc      = 0;
		t_col       = 0;
		t_over      = 0;
		t_postproc  = 0;
		t_draw      = 0;
		fproc_count = 0;
		fdraw_count = 0;
	}
}

/////////////////////////////
// GameLib_Loop
//
// Loops the game.
void GameLib_Loop(void (*gameProc)(), void (*gamePostProc)(), void (*gamePreDraw)(float f), void (*gameDraw)(float f)) {
	g_GameProcFunc     = gameProc;
	g_GamePostProcFunc = gamePostProc;
	g_GamePreDrawFunc  = gamePreDraw;
	g_GameDrawFunc     = gameDraw;
	t_proc             = 0;
	t_col              = 0;
	t_over             = 0;
	t_postproc         = 0;
	t_draw             = 0;
	fproc_count        = 0;
	fdraw_count        = 0;
	Draw_Loop(GameLib_ProcLoop, GameLib_DrawLoop, NULL);
}

/////////////////////////////
// GameLib_GetPos
// GameLib_SetPos
// GameLib_UpdatePos
// GameLib_SetPos
// GameLib_GetPosInstant
// GameLib_SetPosOffset
//
//
void GameLib_GetPos(int pos[2]) {
	pos[0] = g_GamePos1[0];
	pos[1] = g_GamePos1[1];
}
void GameLib_SetPos(const int pos[2]) {
	g_GamePos0[0] = pos[0];
	g_GamePos0[1] = pos[1];
	g_GamePos1[0] = pos[0];
	g_GamePos1[1] = pos[1];
}
void GameLib_UpdatePos(const int pos[2]) {
	g_GamePos1[0] = pos[0];
	g_GamePos1[1] = pos[1];
}
void GameLib_GetSize(int size[2]) {
	size[0] = g_GameSize[0];
	size[1] = g_GameSize[1];
}
void GameLib_GetPosInstant(int pos[2], float f) {
	pos[0] = g_GamePos0[0] + f * ((g_GamePos1[0] + g_GamePosOffset[0]) - g_GamePos0[0]);
	pos[1] = g_GamePos0[1] + f * ((g_GamePos1[1] + g_GamePosOffset[1]) - g_GamePos0[1]);
}
void GameLib_SetPosOffset(const int posOffset[2]) {
	g_GamePosOffset[0] = posOffset[0];
	g_GamePosOffset[1] = posOffset[1];
}

/////////////////////////////
// GameLib_MoveToPos
// GameLib_MoveToPosH
// GameLib_MoveToPosV
//
//
void GameLib_MoveToPos(vec2 pos, float f) {
	GameLib_MoveToPosH(pos, f);
	GameLib_MoveToPosV(pos, f);
}
void GameLib_MoveToPosH(const vec2 pos, const float f) {
	g_GamePos1[0] = g_GamePos1[0] + (pos[0] - (g_GamePos1[0] + (g_GameSize[0] / 2.0f))) * f;
}
void GameLib_MoveToPosV(const vec2 pos, const float f) {
	g_GamePos1[1] = g_GamePos1[1] + (pos[1] - (g_GamePos1[1] + (g_GameSize[1] / 2.0f))) * f;
}

/////////////////////////////
// GameLib_ForEachEn
//
// Deletes every entity.
void GameLib_DelEnts() {
	for (int i = 0; i < g_NumEntities; i++) {
		if (!g_Entity[i]) {
			continue;
		}
		Entity_Destroy(g_Entity[i]);
	}
	g_NumEntities = 0;
	BucketGrid_DeInit(&g_BucketGrid);
	BucketGrid_Init(&g_BucketGrid, 1, 1, 100, 50, 50);
}

/////////////////////////////
// GameLib_ForEachEn
//
// Iterates every entity.
void GameLib_ForEachEnt(int (*func)(Entity ent)) {
	for (int i = 0; i < g_NumEntities; i++) {
		if (!g_Entity[i]) {
			continue;
		}
		if (!func(g_Entity[i])) {
			break;
		}
	}
}

/////////////////////////////
// GameLib_SearchEnt
//
// Searches throught the entities.
Entity GameLib_SearchEnt(int (*func)(Entity ent, void *d), void *d) {
	Entity ent = NULL;
	for (int i = 0; i < g_NumEntities; i++) {
		if (!g_Entity[i]) {
			continue;
		}
		if (func(g_Entity[i], d)) {
			ent = g_Entity[i];
			break;
		}
	}
	return ent;
}

/////////////////////////////
// GameLib_EntityCustomCheckCollision
//
//
int GameLib_EntityCustomCheckCollision(Entity ent, vec2 vel) {
	int collision          = 0;
	CollisionInfo collInfo = NULL;
	vec2 originalVel;

	vec2_copy(originalVel, ent->vel);
	vec2_copy(ent->vel, vel);
	Entity_CalcBBox(ent);

	for (int j = 0; j < g_NumEntities; j++) {
		if (!(g_Entity[j]->flags & EntityFlag_Collision) || !Entity_BBoxIntersect(ent, g_Entity[j])) {
			continue;
		}
		Entity_CheckCollision(ent, g_Entity[j], &collInfo);
		if (collInfo != NULL) {
			collision = 1;
			break;
		}
	}

	vec2_copy(ent->vel, originalVel);
	Entity_CalcBBox(ent);

	CollisionInfo_Destroy(&collInfo);
	return collision;
}

/////////////////////////////
// GameLib_PlaySound
//
//
void GameLib_PlaySound(AudioSnd snd, int x, int y) {
	int r;

	// Get the screen context
	int cx = g_GamePos1[0] + g_GameSize[0] / 2;
	int cy = g_GamePos1[1] + g_GameSize[1] / 2;
	if (g_GameSize[0] > g_GameSize[1]) {
		r = g_GameSize[0] / 2;
	} else {
		r = g_GameSize[1] / 2;
	}
	r       = r * 1.2f;
	int off = r / 10.0f;

	// Calculate volumes
	float dx     = x - (cx + off);
	float dy     = y - (cy);
	float vRight = 1.0f - (sqrtf(dx * dx + dy * dy) / (float)r);
	dx           = x - (cx - off);
	dy           = y - (cy);
	float vLeft  = 1.0f - (sqrtf(dx * dx + dy * dy) / (float)r);

	// Clamp to 0
	if (vLeft < 0.0f) {
		vLeft = 0.0f;
	}
	if (vRight < 0.0f) {
		vRight = 0.0f;
	}
	if (vLeft <= 0.0f && vRight <= 0.0f) {
		return;
	}

	// PLAY!
	Audio_PlaySound(snd, vLeft, vRight, 0);
}

/////////////////////////////
// GameLib_PlayLoopingSound
//
//
AudioChn GameLib_PlayLoopingSound(AudioSnd snd) {
	// PLAY!
	return Audio_PlaySound(snd, 1.0f, 1.0f, 1);
}

/////////////////////////////
// GameLib_EntitySetLight
//
//
void GameLib_EntitySetLight(Entity e, float r, float g, float b, float rad) {
	if (Entity_IsLight(e)) {
		Entity_MarkUpdateLight(e, g_Entity, g_NumEntities);
		Entity_SetLight(e, r, g, b, rad);
		Entity_MarkUpdateLight(e, g_Entity, g_NumEntities);
	} else {
		Entity_SetLight(e, r, g, b, rad);
	}
}

/////////////////////////////
// GameLib_ConvertScreenPositionToGamePosition
//
//
void GameLib_ConvertScreenPositionToGamePosition(vec2 screenPos, vec2 gamePos, float f) {
	int game_pos[2];

	game_pos[0] = g_GamePos0[0] + f * ((g_GamePos1[0] + g_GamePosOffset[0]) - g_GamePos0[0]);
	game_pos[1] = g_GamePos0[1] + f * ((g_GamePos1[1] + g_GamePosOffset[1]) - g_GamePos0[1]);

	gamePos[0] = (screenPos[0] * g_GameSize[0]) + game_pos[0];
	gamePos[1] = (screenPos[1] * g_GameSize[1]) + game_pos[1];
}

/////////////////////////////
// GameLib_AddParallaxBackground
//
//
void GameLib_AddParallaxBackground(DrawImg img, int imgSize[2], int imgOffset[2], float parallaxFactor[2]) {
	const int idx = g_NumParallaxBackgrounds;
	if ((idx + 1) >= MaxParallaxBackgrounds) {
		Print("GameLib: Can't add parallaxBackground, limit reached.");
		return;
	}
	g_ParallaxBackground[idx].img               = img;
	g_ParallaxBackground[idx].imgSize[0]        = imgSize[0];
	g_ParallaxBackground[idx].imgSize[1]        = imgSize[1];
	g_ParallaxBackground[idx].imgOffset[0]      = imgOffset[0];
	g_ParallaxBackground[idx].imgOffset[1]      = imgOffset[1];
	g_ParallaxBackground[idx].parallaxFactor[0] = parallaxFactor[0];
	g_ParallaxBackground[idx].parallaxFactor[1] = parallaxFactor[1];
	g_NumParallaxBackgrounds++;
}

/////////////////////////////
// GameLib_CleanParallaxBackgrounds
//
//
void GameLib_CleanParallaxBackgrounds() { g_NumParallaxBackgrounds = 0; }
