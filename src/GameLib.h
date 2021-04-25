// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#ifndef _GAMELIB_H_
#define _GAMELIB_H_

#include "Anim.h"
#include "Audio.h"
#include "Draw.h"
#include "Entity.h"
#include "Input.h"
#include "Time.h"
#include "Util.h"

/////////////////////////////
// GameLib_Init
//
// Initializes the game.
int GameLib_Init(int w, int h, char *title, int pfps, int fps);

/////////////////////////////
// GameLib_AddEntity
//
// Adds an entity to the game.
void GameLib_AddEntity(Entity e);

/////////////////////////////
// GameLib_UnrefEntity
//
// removes the reference to the entity.
int GameLib_UnrefEntity(Entity e);

/////////////////////////////
// GameLib_DelEntity
//
// Adds an entity to the game.
int GameLib_DelEntity(Entity e);

/////////////////////////////
// GameLib_Loop
//
// Loops the game.
void GameLib_Loop(void (*gameproc)(), void (*gamepostproc)(),
				  void (*gamepredraw)(float f), void (*gamedraw)(float f));

/////////////////////////////
// GameLib_GetPos
// GameLib_SetPos
// GameLib_UpdatePos
// GameLib_SetPos
// GameLib_GetPosInstant
//
//
void GameLib_GetPos(int pos[2]);
void GameLib_SetPos(int pos[2]);
void GameLib_UpdatePos(int pos[2]);
void GameLib_GetSize(int size[2]);
void GameLib_GetPosInstant(int pos[2], float f);

/////////////////////////////
// GameLib_MoveToPos
// GameLib_MoveToPosH
// GameLib_MoveToPosV
//
//
void GameLib_MoveToPos(vec2 pos, float f);
void GameLib_MoveToPosH(vec2 pos, float f);
void GameLib_MoveToPosV(vec2 pos, float f);

/////////////////////////////
// GameLib_ForEachEn
//
// Deletes every entity.
void GameLib_DelEnts();

/////////////////////////////
// GameLib_ForEachEnt
//
// Iterates every entity.
void GameLib_ForEachEnt(int (*func)(Entity ent));

/////////////////////////////
// GameLib_SearchEnt
//
// Searches throught the entities.
Entity GameLib_SearchEnt(int (*func)(Entity ent, void *d), void *d);

/////////////////////////////
// GameLib_EntityCustomCheckCollision
//
//
int GameLib_EntityCustomCheckCollision(Entity ent, vec2 vel);

/////////////////////////////
// GameLib_PlaySound
//
// Play a sound position aware.
void GameLib_PlaySound(AudioSnd snd, int x, int y);

/////////////////////////////
// GameLib_PlayLoopingSound
//
// Play a sound looping
AudioChn GameLib_PlayLoopingSound(AudioSnd snd);

/////////////////////////////
// GameLib_EntitySetLight
//
//
void GameLib_EntitySetLight(Entity e, float r, float g, float b, float rad);

/////////////////////////////
// GameLib_ConvertScreenPositionToGamePosition
//
//
void GameLib_ConvertScreenPositionToGamePosition(vec2 screenPos, vec2 gamePos,
												 float f);

/////////////////////////////
// GameLib_AddParallaxBackground
//
//
void GameLib_AddParallaxBackground(DrawImg img, int imgSize[2],
								   int imgOffset[2], float parallaxFactor[2]);

/////////////////////////////
// GameLib_CleanParallaxBackgrounds
//
//
void GameLib_CleanParallaxBackgrounds();

#endif
