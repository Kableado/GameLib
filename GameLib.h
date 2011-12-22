// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#ifndef _GAMELIB_H_
#define _GAMELIB_H_

#include "Time.h"
#include "Util.h"
#include "Draw.h"
#include "Input.h"
#include "Audio.h"
#include "Anim.h"
#include "Entity.h"


/////////////////////////////
// GameLib_Init
//
// Initializes the game.
int GameLib_Init(int w,int h,char *title,int fps);


/////////////////////////////
// GameLib_AddEntity
//
// Adds an entity to the game.
void GameLib_AddEntity(Entity *e);


/////////////////////////////
// GameLib_UnrefEntity
//
// removes the reference to the entity.
int GameLib_UnrefEntity(Entity *e);


/////////////////////////////
// GameLib_DelEntity
//
// Adds an entity to the game.
int GameLib_DelEntity(Entity *e);


/////////////////////////////
// GameLib_Loop
//
// Loops the game.
void GameLib_Loop(
	void (*gameproc)(),
	void (*gamepostproc)());


/////////////////////////////
// GameLib_BreakLoop
//
// Breaks the game loop.
void GameLib_BreakLoop();


/////////////////////////////
// GameLib_GetPos
// GameLib_SetPos
// GameLib_SetPos
//
//
void GameLib_GetPos(int pos[2]);
void GameLib_SetPos(int pos[2]);
void GameLib_GetSize(int size[2]);


/////////////////////////////
// GameLib_ForEachEn
//
// Deletes every entity.
void GameLib_DelEnts();


/////////////////////////////
// GameLib_ForEachEn
//
// Iterates every entity.
void GameLib_ForEachEnt(int (*func)(Entity *ent));


/////////////////////////////
// GameLib_PlaySound
//
// Play a sound position aware.
void GameLib_PlaySound(AudioSnd snd,int x,int y);


#endif
