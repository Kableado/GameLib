// Copyright (C) 2012-2023 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "GameLib.h"

#include "GameEnts.h"
#include "GameMap.h"

DrawFnt font;
DrawImg imgBackground;

// Global instance for the player entity
Entity g_PlayerInstance = NULL;

void MainGame_Text(int x, int y, char *text) {
	Draw_SetColor(0.0f, 0.0f, 0.0f, 0.5f);
	Draw_DrawText(font, text, x + 1, y + 1);
	Draw_SetColor(1.0f, 1.0f, 1.0f, 1.0f);
	Draw_DrawText(font, text, x, y);
}

void ProcGame() {
	// Rotate the player entity
	if (g_PlayerInstance) {
		float current_rotation;
		Entity_GetRotation(g_PlayerInstance, &current_rotation);
		Entity_SetRotation(g_PlayerInstance, current_rotation + 0.01f);
	}
}
void PostProcGame() {
	// Apply gravity to every entity
	GameLib_ForEachEnt(EntityApplyGravity);
}
void PreDrawGame(float f) {}
void DrawGame(float f) { MainGame_Text(8, 8, "Hello world!"); }

int main(int argc, char *argv[]) {

	GameLib_Init(640, 480, "Game", 20, 60);

	/////////////////////////////
	// Load and initialize media.
	//
	font          = Draw_DefaultFont((ColorRgba){255, 255, 255, 255});
	imgBackground = Draw_LoadImage("data/background.png");
	Draw_SetOffset(imgBackground, 0, 0);
	GameEnts_Init();

	/////////////////////////
	// Initialize world.
	//
	GameLib_DelEnts();
	GameMap_LoadLevel("data/level_01.txt", 64);

	// Create Box 1
	Entity box1 = Entity_Copy(ent_Box); // ent_Box should be available from GameEnts.h
	if (box1) {
		vec2 pos1 = {200.0f, 100.0f}; // Example position, adjust as needed
		Entity_SetPos(box1, pos1);
		GameLib_AddEnt(box1);
	}

	// Create Box 2
	Entity box2 = Entity_Copy(ent_Box);
	if (box2) {
		vec2 pos2 = {300.0f, 100.0f}; // Example position, adjust as needed
		Entity_SetPos(box2, pos2);
		GameLib_AddEnt(box2);
	}

	/////////////////////////
	// Run the world.
	//
	GameLib_CleanParallaxBackgrounds();
	GameLib_AddParallaxBackground(imgBackground, (int[2]){512, 512}, (int[2]){0, 0}, (float[2]){0.5f, 0.0f});
	GameLib_Loop(ProcGame, PostProcGame, PreDrawGame, DrawGame);

	return (0);
}