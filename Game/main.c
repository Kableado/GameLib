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
DrawImg imgBackground;

void MainGame_Text(int x, int y, char *text){
	Draw_SetColor(0.0f, 0.0f, 0.0f, 0.5f);
	Draw_DrawText(font, text, x+1, y+1);
	Draw_SetColor(1.0f, 1.0f, 1.0f, 1.0f);
	Draw_DrawText(font, text, x, y);
}

void ProcGame(){

}
void PostProcGame(){
	// Apply gravity to every entity
	GameLib_ForEachEnt(EntityApplyGravity);
}
void PreDrawGame(float f){
	
}
void DrawGame(float f){
	MainGame_Text(8,8,"Hello world!");
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
	imgBackground=Draw_LoadImage("data/background.png");
	Draw_SetOffset(imgBackground,0,0);
	GameEnts_Init();

	/////////////////////////
	// Initialize world.
	//
	GameLib_DelEnts();
	GameMap_LoadLevel("data/level_01.txt",64);

	/////////////////////////
	// Run the world.
	//
	GameLib_CleanParallaxBackgrounds();
	GameLib_AddParallaxBackground(imgBackground, (int[2]){512, 512}, (int[2]){0, 0}, (float[2]){0.5f, 0.0f});
	GameLib_Loop(ProcGame,PostProcGame,PreDrawGame,DrawGame);

	return(0);
}