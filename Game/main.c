// Copyright (C) 2012 Valeriano Alfonso Rodriguez (Kableado)

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <math.h>

#include "GameLib.h"
extern int gamelib_debug;

#include "GameEnts.h"
#include "GameMap.h"


DrawFnt font;
DrawFnt font_shad;

void ProcGame(){

}

void PostProcGame(){
	// Apply gravity to every entity
	GameLib_ForEachEnt(EntityApplyGravity);
}


int main(int argc,char *argv[]){
	int i,j;
	Entity *e;


	srand(time(NULL));

	if (argc>1) {
		if (!strcmp(argv[1],"debug")) {
			gamelib_debug=1;
			printf("Debug Mode Activated!\n");
		}
	}

	GameLib_Init(640,480,"Game",20,60);



	/////////////////////////////
	// Load and initialize media.
	//
	font=Draw_DefaultFont(255,255,255,255);
	font_shad=Draw_DefaultFont(0,0,0,127);

	GameEnts_Init();


	/////////////////////////
	// Initialize world.
	//
	GameLib_DelEnts();
	GameMap_LoadLevel("data/level_01.txt",64);


	/////////////////////////
	// Run the world.
	//

	GameLib_Loop(ProcGame,PostProcGame,NULL,NULL);


	return(0);
}