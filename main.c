#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "GameLib.h"


DrawFnt font;
DrawFnt font_shad;

DrawImg img_bisho;
DrawImg img_bisho2;
DrawImg img_bloque;

AudioSnd coin;

Entity *bisho;
Entity *bisho2;
Entity *bloque;



void ProcGame(){
	Draw_Clean(0,0,0);
}

void PostProcGame(){
	if(Input_GetKey(InputKey_Action1)==InputKey_Pressed){
		Audio_PlaySound(coin,1,1);
	}

	Draw_DrawText(font_shad,"Hola Mundo!",11,11);
	Draw_DrawText(font     ,"Hola Mundo!",10,10);

}

void player_proc(Entity *e){
	vec2 vel;

	if(Input_GetDir(vel)){
		vec2_scale(vel,vel,2.0f);
		Entity_AddVelLimit(e,vel,10.0f);
	}
}

int main(int argc,char *argv[]){

	srand(time(NULL));

	GameLib_Init(640,480,"Game",60);

	font=Draw_DefaultFont(255,255,255,255);
	font_shad=Draw_DefaultFont(0,0,0,127);

	img_bisho=Draw_LoadImage("data/bisho_alpha.bmp");
	Draw_ImgSetAlpha(img_bisho,255);
	Draw_SetOffset(img_bisho,-16,-16);

	img_bisho2=Draw_LoadImage("data/bisho2_alpha.bmp");
	Draw_ImgSetAlpha(img_bisho2,255);
	Draw_SetOffset(img_bisho2,-16,-16);

	img_bloque=Draw_LoadImage("data/bloque.bmp");
	Draw_ImgSetAlpha(img_bloque,255);
	Draw_SetOffset(img_bloque,-16,-16);

	coin=Audio_LoadSound("data/coin.wav");


	bisho=Entity_New();
	bisho->radius=16.0f;
	bisho->img=img_bisho;
	bisho->proc=player_proc;

	bisho2=Entity_New();
	bisho2->radius=16.0f;
	bisho2->fric_static=0.1f;
	bisho2->elast=0.0f;
	bisho2->img=img_bisho2;

	bloque=Entity_New();
	bloque->mass=-1.0f;
	bloque->radius=15.5f;
	bloque->img=img_bloque;


	int i;
	Entity *e;
	for(i=0;i<20;i++){
		e=Entity_Copy(bloque);
		vec2_set(e->pos,16+i*32,16);
		GameLib_AddEntity(e);
	}
	for(i=0;i<20;i++){
		e=Entity_Copy(bloque);
		vec2_set(e->pos,16+i*32,464);
		GameLib_AddEntity(e);
	}
	for(i=1;i<14;i++){
		e=Entity_Copy(bloque);
		vec2_set(e->pos,16,16+i*32);
		GameLib_AddEntity(e);
	}
	for(i=1;i<14;i++){
		e=Entity_Copy(bloque);
		vec2_set(e->pos,624,16+i*32);
		GameLib_AddEntity(e);
	}

	for(i=0;i<4;i++){
		e=Entity_Copy(bloque);
		vec2_set(e->pos,100,100+i*32);
		GameLib_AddEntity(e);
	}
	for(i=0;i<4;i++){
		e=Entity_Copy(bloque);
		vec2_set(e->pos,164,100+i*32);
		GameLib_AddEntity(e);
	}
	e=Entity_Copy(bisho2);
	vec2_set(e->pos,132,100);
	GameLib_AddEntity(e);

	e=Entity_Copy(bisho);
	vec2_set(e->pos,132,50);
	GameLib_AddEntity(e);

	GameLib_Loop(ProcGame,PostProcGame);


	return(0);
}
