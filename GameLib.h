#ifndef _GAMELIB_H_
#define _GAMELIB_H_

#include "Draw.h"
#include "Input.h"
#include "Audio.h"
#include "Entity.h"


/////////////////////////////
// GameLib_Init
//
// Initializes the game.
int GameLib_Init(int w,int h,char *title,int fps);


/////////////////////////////
// GameLib_Loop
//
// Loops the game.
void GameLib_Loop();


/////////////////////////////
// GameLib_BreakLoop
//
// Breaks the game loop.
void GameLib_BreakLoop();




#endif
