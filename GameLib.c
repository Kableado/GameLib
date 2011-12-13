#include <SDL/SDL.h>

#include "Draw.h"
#include "Input.h"
#include "Audio.h"
#include "Entity.h"
#include "GameLib.h"


/////////////////////////////
// GameLib_Init
//
// Initializes the game.
int GameLib_Init(int w,int h,char *title,int fps){
	if(!Draw_Init(w,h,title,fps)){
		return(0);
	}
	if(!Input_Init()){
		return(0);
	}
	Audio_Init();
	return(1);
}



