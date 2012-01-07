// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <time.h>

#include "GameLib.h"
extern int gamelib_debug;

#include "GameEnts.h"
#include "GameMap.h"

int play;

int game_started=0;
int game_level=0;
int game_level_point=1;
int game_level_reset=0;

DrawImg img_logo;
DrawImg img_end;

DrawFnt font;

int ProcTitle(){
	if(	Input_GetKey(InputKey_Jump)==InputKey_Pressed||
		Input_GetKey(InputKey_Continue)==InputKey_Pressed)
	{
		play=1;
		return(0);
	}
	if(	(Input_GetKey(InputKey_Action1)==InputKey_Pressed||
		Input_GetKey(InputKey_Action2)==InputKey_Pressed) &&
		game_started)
	{
		play=1;
		game_started=0;
		return(0);
	}
	return(1);
}

void DrawTitle(){
	Draw_Clean(0,0,0);
	Draw_SetColor(1.0f,1.0f,1.0f,1.0f);

	Draw_DrawImg(img_logo,170,100);
	if(!game_started){
		Draw_DrawText(font,"Press [Space] to Start.",300,300);
	}else{
		Draw_DrawText(font,"Press [Space] to Continue.",300,300);
		Draw_DrawText(font,"Press [X] to Start.",300,316);
	}

	Draw_DrawText(font,"By Kableado (VAR)",200,440);

}


int ProcEnd(){
	if(	Input_GetKey(InputKey_Jump)==InputKey_Pressed||
		Input_GetKey(InputKey_Continue)==InputKey_Pressed)
	{
		return(0);
	}
	return(1);
}


void DrawEnd(){
	Draw_Clean(0,0,0);
	Draw_SetColor(1.0f,1.0f,1.0f,1.0f);

	Draw_DrawImg(img_end,170,100);

	Draw_DrawText(font,"Congratulations you saved the kittie!",250,320);
	Draw_DrawText(font,"Thanks for playing!",250,350);
	Draw_DrawText(font,"Press [Space] to Title.",300,400);
}


void ProcGame(){
}

void PostProcGame(){

	if(game_level_reset){
		if(Input_AnyKey()){
			if(GameMap_CreateLevel(game_level,game_level_point)){
				if(game_level_reset==2){
					int  pos[2]={0,0};
					GameLib_SetPos(pos);
				}
				game_level_reset=0;
			}else{
				play=2;
				GameLib_BreakLoop();
			}
		}
	}
}

void DrawGame(){
	char string[1024];

	Draw_SetColor(1.0f,1.0f,1.0f,1.0f);

	sprintf(string, "Level: %d.%d",game_level+1,game_level_point);
		Draw_SetColor(0,0,0,0.5f);
	Draw_DrawText(font,string,17,17);
		Draw_SetColor(1,1,1,1);
	Draw_DrawText(font,string,16,16);

	if(game_level_reset==2){
		Draw_SetColor(0,0,0,0.5f);
		Draw_DrawText(font,"Level Complete",301,301);
		Draw_SetColor(1,1,0,1);
		Draw_DrawText(font,"Level Complete.",300,300);
	}else
	if(game_level_reset==1){
		Draw_SetColor(0,0,0,0.5f);
		Draw_DrawText(font,"You are dead.",301,301);
		Draw_SetColor(1,0,0,1);
		Draw_DrawText(font,"You are dead.",300,300);
	}else
	if(game_level_reset==3){
		play=2;
		GameLib_BreakLoop();
	}
}


void LoadGame(char *fname){
	FILE *f;

	f=fopen(fname,"rb");
	if(!f)
		return;

	fread(&game_level,1,sizeof(int),f);
	fread(&game_level_point,1,sizeof(int),f);

	GameMap_CreateLevel(game_level,game_level_point);
	game_started=1;

	fclose(f);
}

void SaveGame(char *fname){
	FILE *f;

	f=fopen(fname,"wb");
	if(!f)
		return;

	fwrite(&game_level,1,sizeof(int),f);
	fwrite(&game_level_point,1,sizeof(int),f);


	fclose(f);
}


int main(int argc,char *argv[]){

	srand(time(NULL));

	if (argc>1) {
		if (!strcmp(argv[1],"debug")) {
			gamelib_debug=1;
			printf("Debug Mode Activated!\n");
		}
	}

	GameLib_Init(640,480,"Game",60);

	img_logo=Draw_LoadImage("data/logo.bmp");
	img_end=Draw_LoadImage("data/end.bmp");

	font=Draw_DefaultFont(255,255,255,255);

	GameEnts_Init();

	LoadGame("game.save");

	do{
		play=0;
		Draw_Loop(ProcTitle,DrawTitle);
		if(play==1){
			if(!game_started){
				int  pos[2]={0,0};
				GameLib_SetPos(pos);
				game_level=0;
				game_level_point=1;
				game_level_reset=0;

				GameMap_CreateLevel(game_level,game_level_point);
				game_started=1;
			}
			GameLib_Loop(ProcGame,PostProcGame,DrawGame);
		}
		if(play==2){
			Draw_Loop(ProcEnd,DrawEnd);
		}
	}while(play);


	SaveGame("game.save");

	return(0);
}
