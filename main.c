// Copyright (C) 2012 Valeriano Alfonso Rodriguez (Kableado)

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <time.h>

#include "GameLib.h"
extern int gamelib_debug;

#include "GameEnts.h"
#include "GameMap.h"


DrawFnt font;
DrawFnt font_shad;

DrawImg img_background;

void ProcGame(){

}

void PostProcGame(){
	// Apply gravity to every entity
	GameLib_ForEachEnt(EntityApplyGravity);
}

void PreDrawGame(float f){
	//Draw_Clean(128,128,128);
	Draw_SetColor(1.0f,1.0f,1.0f,1.0f);
	Draw_DrawImgResized(img_background,0,0,640,480);
}

void DrawGame(float f){
	char cadena[128];

	// Watermark
	Draw_SetColor(0,0,0,0.3);
	Draw_DrawText(font,"By Kableado (VAR)",201,461);
	Draw_SetColor(1.0f,1.0f,1.0f,0.3f);
	Draw_DrawText(font,"By Kableado (VAR)",200,460);

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

	GameLib_Init(640,480,"Game",60,60);



	/////////////////////////////
	// Load and initialize media.
	//
	font=Draw_DefaultFont(255,255,255,255);
	font_shad=Draw_DefaultFont(0,0,0,127);

	img_background=Draw_LoadImage("data/heaven.png");
	Draw_SetOffset(img_background,0,0);

	GameEnts_Init();


	/////////////////////////
	// Initialize world.
	//
	GameLib_DelEnts();
	GameMap_LoadLevel("data/level_01.txt",32);


	/////////////////////////
	// Run the world.
	//

	GameLib_Loop(ProcGame,PostProcGame,PreDrawGame,DrawGame);


	return(0);
}