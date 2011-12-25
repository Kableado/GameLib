// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <time.h>

#include "GameLib.h"

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
DrawFnt font_shad;

int ProcTitle(){
	if(	Input_GetKey(InputKey_Jump)==InputKey_Pressed||
		Input_GetKey(InputKey_Continue)==InputKey_Pressed)
	{
		play=1;
		return(0);
	}
	return(1);
}

void DrawTitle(){
	Draw_Clean(0,0,0);

	Draw_DrawImg(img_logo,170,100);
	if(!game_started){
		Draw_DrawText(font     ,"Press [Space] to Start.",300,300);
	}else{
		Draw_DrawText(font     ,"Press [Space] to Continue.",300,300);
	}

	Draw_DrawText(font     ,"By Kableado (VAR)",200,440);

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

	Draw_DrawImg(img_end,170,100);

	Draw_DrawText(font     ,"Congratulations you saved the kittie!",250,320);
	Draw_DrawText(font     ,"Thanks for playing!",250,350);

	Draw_DrawText(font     ,"Press [Space] to Title.",300,400);
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

	sprintf(string, "Level: %d.%d",game_level+1,game_level_point);
	Draw_DrawText(font_shad,string,17,17);
	Draw_DrawText(font     ,string,16,16);

	if(game_level_reset==2){
		Draw_DrawText(font_shad,"Level Complete",301,301);
		Draw_DrawText(font     ,"Level Complete.",300,300);
	}else
	if(game_level_reset==1){
		Draw_DrawText(font_shad,"You are dead.",301,301);
		Draw_DrawText(font     ,"You are dead.",300,300);
	}else
	if(game_level_reset==3){
		play=2;
		GameLib_BreakLoop();
	}

}


int main(int argc,char *argv[]){

	srand(time(NULL));

	GameLib_Init(640,480,"Game",60);

	img_logo=Draw_LoadImage("data/logo.bmp");
	img_end=Draw_LoadImage("data/end.bmp");

	font=Draw_DefaultFont(255,0,0,255);
	font_shad=Draw_DefaultFont(0,0,0,127);


	GameEnts_Init();
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
			}
			game_started=1;
			GameLib_Loop(ProcGame,PostProcGame,DrawGame);
		}
		if(play==2){
			Draw_Loop(ProcEnd,DrawEnd);
		}
	}while(play);

	return(0);
}
