// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <time.h>
#include <sys/stat.h>

#ifdef EMSCRIPTEN
#include <emscripten.h>
#define time stime
#endif


#include "GameLib.h"
extern int gamelib_debug;

#include "GameEnts.h"
#include "GameMap.h"

char *saveFilename="saves/game.save";
int game_started=0;
int game_level=0;
int game_level_point=1;
int game_level_reset=0;

DrawImg img_logo;
DrawImg img_end;

DrawFnt font;

void GameLib_MkDir(char *dir){
#ifdef WIN32
	mkdir(dir);
#else
	mkdir(dir,0777);
#endif
}


void ProcGame();
void PostProcGame();
void DrawGame(float f);


void ProcTitle(void *data){
	int play=0;
	if(	Input_GetKey(InputKey_Jump)==InputKey_Pressed||
		Input_GetKey(InputKey_Continue)==InputKey_Pressed)
	{
		play=1;
	}
	if(	(Input_GetKey(InputKey_Action1)==InputKey_Pressed||
		Input_GetKey(InputKey_Action2)==InputKey_Pressed) &&
		game_started)
	{
		play=1;
		game_started=0;
	}
	if(play){
		if(!game_started){
			int  pos[2]={0,0};
			GameLib_SetPos(pos);
			game_level=0;
			game_level_point=1;
			game_level_reset=0;

			GameMap_CreateLevel(game_level,game_level_point);
			game_started=1;
		}
		GameLib_Loop(ProcGame,PostProcGame,NULL,DrawGame);
	}
	if(	Input_GetKey(InputKey_Exit)==InputKey_Pressed){
		Draw_BreakLoop();
	}
}

void DrawTitle(void *data,float dt){
	Draw_Clean(0,0,0);
	Draw_SetColor(1.0f,1.0f,1.0f,1.0f);

	Draw_DrawImg(img_logo,320,150);
	if(!game_started){
		Draw_DrawText(font,"Press [Space] to Start.",300,300);
	}else{
		Draw_DrawText(font,"Press [Space] to Continue.",300,300);
		Draw_DrawText(font,"Press [X] to Start.",300,316);
	}

	Draw_DrawText(font,"By Kableado (VAR)",200,440);
}


void ProcEnd(void *data){
	if(	Input_GetKey(InputKey_Jump)==InputKey_Pressed||
		Input_GetKey(InputKey_Continue)==InputKey_Pressed ||
		Input_GetKey(InputKey_Exit)==InputKey_Pressed)
	{
		game_started=0;
		game_level=0;
		game_level_point=1;
		game_level_reset=0;
		Draw_Loop(ProcTitle,DrawTitle,NULL);
	}
}


void DrawEnd(void *data,float dt){
	Draw_Clean(0,0,0);
	Draw_SetColor(1.0f,1.0f,1.0f,1.0f);

	Draw_DrawImg(img_end,320,150);

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
				Draw_Loop(ProcEnd,DrawEnd,NULL);
			}
		}
	}
	if(Input_GetKey(InputKey_Exit)==InputKey_Pressed){
		Draw_Loop(ProcTitle,DrawTitle,NULL);
	}
}

void DrawGame(float f){
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
		Draw_Loop(ProcEnd,DrawEnd,NULL);
	}
}


void LoadGame(){
	FILE *f;

	GameLib_MkDir("saves");

	f=fopen(saveFilename,"rb");
	if(!f)
		return;

	fread(&game_level,1,sizeof(int),f);
	fread(&game_level_point,1,sizeof(int),f);

	if(game_level==0 && game_level_point==1){
		game_started=0;
		return;
	}

	GameMap_CreateLevel(game_level,game_level_point);
	game_started=1;

	fclose(f);
}

void SaveGame(){
	FILE *f;

	GameLib_MkDir("saves");

	f=fopen(saveFilename,"wb");
	if(!f)
		return;

	fwrite(&game_level,1,sizeof(int),f);
	fwrite(&game_level_point,1,sizeof(int),f);

	fclose(f);
#if EMSCRIPTEN
	EM_ASM(
		FS.syncfs(function (err) { });
	);
#endif

}


int main(int argc,char *argv[]){

	srand(time(NULL));

	if (argc>1) {
		if (!strcmp(argv[1],"debug")) {
			gamelib_debug=1;
			printf("Debug Mode Activated!\n");
		}
	}

	GameLib_Init(640,480,"Game",15,60);

	img_logo=Draw_LoadImage("data/logo.png");
	img_end=Draw_LoadImage("data/end.png");

	font=Draw_DefaultFont(255,255,255,255);

	GameEnts_Init();

	LoadGame();

	Draw_OverrideExit(1);
	Draw_Loop(ProcTitle,DrawTitle,NULL);

	return(0);
}
