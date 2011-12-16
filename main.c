#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "GameLib.h"


DrawFnt font;
DrawFnt font_shad;

DrawImg img_yball;
DrawImg img_rball;
DrawImg img_block;
DrawImg img_block2;

Anim anim_whitey;

AudioSnd coin;

enum {
	Ent_Player,
	Ent_Ball,
	Ent_Block,
	Ent_Block2
} EntityType;
Entity *ent_player;
Entity *ent_ball;
Entity *ent_block;
Entity *ent_block2;


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

void player_proc(Entity *e,int ft){
	vec2 vel;

	if(Input_GetDir(vel)){
		vec2_scale(vel,vel,2.0f);
		Entity_AddVelLimit(e,vel,10.0f);
	}
}

int block2_collision(Entity *e,Entity *e2,float t,vec2 n){
	if(e2->type==Ent_Ball){
		return(0);
	}else{
		return(1);
	}
}

int main(int argc,char *argv[]){
	int i;
	Entity *e;

	srand(time(NULL));

	GameLib_Init(640,480,"Game",60);

	font=Draw_DefaultFont(255,255,255,255);
	font_shad=Draw_DefaultFont(0,0,0,127);

	img_yball=Draw_LoadImage("data/yball.bmp");
	Draw_SetOffset(img_yball,-16,-16);

	img_rball=Draw_LoadImage("data/rball.bmp");
	Draw_SetOffset(img_rball,-16,-16);

	img_block=Draw_LoadImage("data/block.bmp");
	Draw_SetOffset(img_block,-16,-16);

	img_block2=Draw_LoadImage("data/block2.bmp");
	Draw_SetOffset(img_block2,-16,-16);

//	img_whitey=Draw_LoadImage("data/whitey.bmp");
//	Draw_SetOffset(img_whitey,-16,-16);
	anim_whitey=Anim_LoadAnim("data/whitey.bmp",4,5);
	Anim_SetOffset(anim_whitey,-16,-16);

	coin=Audio_LoadSound("data/coin.wav");


	ent_player=Entity_New();
	ent_player->type=Ent_Player;
	ent_player->radius=16.0f;
	//AnimPlay_SetImg(&ent_player->anim,img_whitey);
	AnimPlay_SetAnim(&ent_player->anim,anim_whitey);
	ent_player->proc=player_proc;

	ent_ball=Entity_New();
	ent_ball->type=Ent_Ball;
	ent_ball->radius=16.0f;
	ent_ball->fric_static=0.1f;
	ent_ball->elast=1.0f;
	AnimPlay_SetImg(&ent_ball->anim,img_rball);

	ent_block=Entity_New();
	ent_block->type=Ent_Block;
	ent_block->mass=-1.0f;
	ent_block->radius=15.5f;
	AnimPlay_SetImg(&ent_block->anim,img_block);

	ent_block2=Entity_New();
	ent_block2->type=Ent_Block2;
	ent_block2->mass=-1.0f;
	ent_block2->radius=15.5f;
	AnimPlay_SetImg(&ent_block2->anim,img_block2);
	ent_block2->collision=block2_collision;


	for(i=0;i<20;i++){
		e=Entity_Copy(ent_block);
		vec2_set(e->pos,16+i*32,16);
		GameLib_AddEntity(e);
	}
	for(i=0;i<20;i++){
		e=Entity_Copy(ent_block);
		vec2_set(e->pos,16+i*32,464);
		GameLib_AddEntity(e);
	}
	for(i=1;i<14;i++){
		e=Entity_Copy(ent_block);
		vec2_set(e->pos,16,16+i*32);
		GameLib_AddEntity(e);
	}
	for(i=1;i<14;i++){
		e=Entity_Copy(ent_block);
		vec2_set(e->pos,624,16+i*32);
		GameLib_AddEntity(e);
	}

	for(i=0;i<4;i++){
		e=Entity_Copy(ent_block);
		vec2_set(e->pos,100,100+i*32);
		GameLib_AddEntity(e);
	}
	for(i=0;i<4;i++){
		e=Entity_Copy(ent_block);
		vec2_set(e->pos,164,100+i*32);
		GameLib_AddEntity(e);
	}
	e=Entity_Copy(ent_block2);
	vec2_set(e->pos,132,100+3*32);
	GameLib_AddEntity(e);

	e=Entity_Copy(ent_ball);
	vec2_set(e->pos,132,100);
	GameLib_AddEntity(e);

	e=Entity_Copy(ent_player);
	vec2_set(e->pos,132,50);
	GameLib_AddEntity(e);


	GameLib_Loop(ProcGame,PostProcGame);


	return(0);
}
