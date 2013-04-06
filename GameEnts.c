// Copyright (C) 2012 Valeriano Alfonso Rodriguez (Kableado)

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "GameLib.h"
extern int gamelib_debug;

#include "GameEnts.h"

DrawImg img_player;
DrawImg img_platform;
DrawImg img_block;

Entity *ent_Player;
Entity *ent_Platform;
Entity *ent_Block;


DrawImg img_wizard[2];
//DrawImg img_wizardWalking[2];
//DrawImg img_wizardShoting[2];
//DrawImg img_wizardPain[2];
DrawImg img_magikball;
DrawImg img_earth[16];
//DrawImg img_earthBack[16];
DrawImg img_stoneBrick;
//DrawImg img_stoneBrick[16];
//DrawImg img_stoneBrickBack[16];
DrawImg img_spikedBush;
DrawImg img_lavaPit;
DrawImg img_fireball;
DrawImg img_flower[2];
DrawImg img_spike[2];
DrawImg img_carnivorePlant[2];
DrawImg img_bunny[2];
DrawImg img_spider[2];
DrawImg img_guard[2];
DrawImg img_eliteGuard[2];
DrawImg img_axe[2];
DrawImg img_goatMan[2];
DrawImg img_Princess[2];

Entity *ent_Wizard;
Entity *ent_MagikBall;
Entity *ent_Earth;
Entity *ent_EarthBack;
Entity *ent_StoneBrick;
Entity *ent_StoneBrickBack;
Entity *ent_SpikedBush;
Entity *ent_Fireball;
Entity *ent_LavaPit;
Entity *ent_Spike[2];
Entity *ent_Flower[2];
Entity *ent_CarnivorePlant[2];
Entity *ent_Bunny;
Entity *ent_Spider;
Entity *ent_Axe;
Entity *ent_Guard;
Entity *ent_EliteGuard;
Entity *ent_GoatMan;
Entity *ent_Princess;



int EntityApplyGravity(Entity *e){
	float grav=0.5f;
	float vTerminal=10.0f;
	vec2 vGrav;

	// Only apply gravity to some entity types
	if(!(
		e->type==Ent_Player ||
		e->type==Ent_Wizard ||
		e->type==Ent_Fireball ||
		e->type==Ent_Bunny ||
		e->type==Ent_Spider ||
		e->type==Ent_Axe ||
		e->type==Ent_Guard ||
		e->type==Ent_EliteGuard ||
		e->type==Ent_GoatMan ||
		e->type==Ent_Princess ||
		0
		))
	{
		return(1);
	}

	// Apply gravity
	vec2_set(vGrav,0.0f,grav);
	Entity_AddVelLimit(e,vGrav,vTerminal);


	return(1);
}



void EntEarth_Init(Entity *ent,int up,int down,int left,int right){
	int val=up*8+right*4+down*2+left;


	if(!up && !down && !left && !right){
		ent->flags=0;
	}else
	if(up && !down && !left && !right){
		ent->flags=EntityFlag_PlatformCollision;
	}else{
		ent->flags=EntityFlag_BlockCollision;
	}

	AnimPlay_SetImg(&ent->anim,img_earth[val]);
}

void EntStoneBrick_Init(Entity *ent,int up,int down,int left,int right){
	if(!up && !down && !left && !right){
		ent->flags=0;
	}else
	if(up && !down && !left && !right){
		ent->flags=EntityFlag_PlatformCollision;
	}else{
		ent->flags=EntityFlag_BlockCollision;
	}
}






void player_proc(Entity *e,int ft){
	float acel=1.0f;
	float maxVel=4.0f;
	float jumpVel=12.0f;

	if(Input_GetKey(InputKey_Jump)==InputKey_Pressed ||
		Input_GetKey(InputKey_Up)==InputKey_Pressed){
		vec2 jump;

		// Apply jump
		vec2_set(jump,0.0f,-jumpVel);
		vec2_plus(e->vel,e->vel,jump);

		// FIXME: play sound
	}
	if(Input_GetKey(InputKey_Left)){
		vec2 left;

		// Apply left movement
		vec2_set(left,-acel,0.0f);
		Entity_AddVelLimit(e,left,maxVel);
	}
	if(Input_GetKey(InputKey_Right)){
		vec2 right;

		// Apply right movement
		vec2_set(right,acel,0.0f)
		Entity_AddVelLimit(e,right,maxVel);
	}


	// Scroll View
	GameLib_MoveToPosH(e->pos,0.1f);
}







void wizard_proc(Entity *e,int ft){
	float acel=1.0f;
	float maxVel=6.0f;
	float jumpVel=8.0f;
	float shootVel=10.0f;

	if(Input_GetKey(InputKey_Jump)==InputKey_Pressed ||
		Input_GetKey(InputKey_Up)==InputKey_Pressed)
	{
		vec2 jump;

		// Apply jump
		vec2_set(jump,0.0f,-(jumpVel+fabs(e->vel[0])));
		vec2_plus(e->vel,e->vel,jump);

		// FIXME: play sound
	}
	if(Input_GetKey(InputKey_Left)){
		vec2 left;

		// Apply left movement
		vec2_set(left,-acel,0.0f);
		Entity_AddVelLimit(e,left,maxVel);


		AnimPlay_SetImg(&e->anim,img_wizard[0]);
		e->A=0;
	}
	if(Input_GetKey(InputKey_Right)){
		vec2 right;

		// Apply right movement
		vec2_set(right,acel,0.0f)
		Entity_AddVelLimit(e,right,maxVel);

		AnimPlay_SetImg(&e->anim,img_wizard[1]);

		e->A=1;
	}
	if(Input_GetKey(InputKey_Action1)==InputKey_Pressed ||
		Input_GetKey(InputKey_Action2)==InputKey_Pressed)
	{
		Entity *e2;

		// Create child entity
		e2=Entity_Copy(e->child);
		vec2_plus(e2->pos,e2->pos,e->pos);
		if(e->A==0){
			vec2_set(e2->vel,-shootVel,0);
		}else
		if(e->A==1){
			vec2_set(e2->vel,shootVel,0);
		}
		GameLib_AddEntity(e2);

	}


	// Scroll View
	GameLib_MoveToPosH(e->pos,0.1f);
}





int magikball_collision(Entity *ent,Entity *ent2,float t,vec2 n){
	if(ent->A==1)
		return(0);

	if(ent2->type==Ent_Flower){
		Entity *e2;
		// Convert a flower

		// Create replacemente entity
		e2=Entity_Copy(ent_CarnivorePlant[ent2->D]);
		vec2_plus(e2->pos,e2->pos,ent2->pos);
		GameLib_AddEntity(e2);

		// Delete original entity
		GameLib_DelEntity(ent2);
	}
	if(ent2->type==Ent_Bunny){
		Entity *e2;
		// Convert a bunny
		printf("Bunny\n");

		// Create replacemente entity
		e2=Entity_Copy(ent_Spider);
		vec2_plus(e2->pos,e2->pos,ent2->pos);
		GameLib_AddEntity(e2);

		// Copy direction
		e2->A=ent2->A;

		// Delete original entity
		GameLib_DelEntity(ent2);
	}

	// Selfdestroy
	GameLib_DelEntity(ent);
	ent->A=1;

	// FIXME: play sound

	return(0);
}


void spikedentity_overlap(Entity *e,Entity *e2){
	// FIXME: damage player
	printf("FIXME: damage player\n");
}


int spike_collision(Entity *ent,Entity *ent2,float t,vec2 n){
	if(ent->A==1)
		return(0);

	if(ent2->type==Ent_Player ||
		ent2->type==Ent_Wizard)
	{
		// FIXME: damage player
		printf("FIXME: damage player\n");
	}

	// Selfdestroy
	GameLib_DelEntity(ent);
	ent->A=1;

	// FIXME: play sound

	return(0);
}

void flower_oncopy(Entity *ent){
	ent->A=rand()%ent->C;
}

void flower_proc(Entity *ent,int ft){
	if(ent->A==0){
		Entity *e2;

		// Create child entity
		e2=Entity_Copy(ent->child);
		vec2_plus(e2->pos,e2->pos,ent->pos);
		GameLib_AddEntity(e2);


		// FIXME: play sound

		ent->A=ent->B;
	}else{
		ent->A--;
	}
}






void bunny_proc(Entity *e,int ft){
	float acel=1.0f;
	float maxVel=4.0f;
	float jumpVel=5.0f;

	if(e->B==0){
		vec2 jump;

		// Apply jump
		vec2_set(jump,0.0f,-jumpVel);
		vec2_plus(e->vel,e->vel,jump);

		// FIXME: play sound

		e->B=e->C;
	}else{
		e->B--;
	}
	if(e->A==0){
		vec2 left;

		// Apply left movement
		vec2_set(left,-acel,0.0f);
		Entity_AddVelLimit(e,left,maxVel);


		AnimPlay_SetImg(&e->anim,img_bunny[0]);
	}
	if(e->A==1){
		vec2 right;

		// Apply right movement
		vec2_set(right,acel,0.0f)
		Entity_AddVelLimit(e,right,maxVel);

		AnimPlay_SetImg(&e->anim,img_bunny[1]);
	}
}
int bunny_collision(Entity *ent,Entity *ent2,float t,vec2 n){
	if(n[0]>0.5f){
		ent->A=1;
	}else
	if(n[0]<-0.5f){
		ent->A=0;
	}


	if(ent2->type==Ent_Player ||
		ent2->type==Ent_Wizard)
	{
		// FIXME: damage player
		printf("FIXME: damage player\n");
	}

	return(1);
}



void spider_proc(Entity *e,int ft){
	float acel=1.0f;
	float maxVel=4.0f;
	float jumpVel=5.0f;

	if(e->B==0){
		vec2 jump;

		// Apply jump
		vec2_set(jump,0.0f,-jumpVel);
		vec2_plus(e->vel,e->vel,jump);

		// FIXME: play sound

		e->B=e->C;
	}else{
		e->B--;
	}
	if(e->A==0){
		vec2 left;

		// Apply left movement
		vec2_set(left,-acel,0.0f);
		Entity_AddVelLimit(e,left,maxVel);


		AnimPlay_SetImg(&e->anim,img_spider[0]);
	}
	if(e->A==1){
		vec2 right;

		// Apply right movement
		vec2_set(right,acel,0.0f)
		Entity_AddVelLimit(e,right,maxVel);

		AnimPlay_SetImg(&e->anim,img_spider[1]);
	}
}
int spider_collision(Entity *ent,Entity *ent2,float t,vec2 n){
	if(n[0]>0.5f){
		ent->A=1;
	}else
	if(n[0]<-0.5f){
		ent->A=0;
	}

	return(1);
}






void GameEnts_Init(){


	/////////////////////////////
	// Load and initialize media.
	//

	img_player=Draw_LoadImage("data/player.bmp");
	img_platform=Draw_LoadImage("data/platform.bmp");
	img_block=Draw_LoadImage("data/block.bmp");

	// Wizard
	img_wizard[0]=Draw_LoadImage("data/wizard_left.bmp");
	img_wizard[1]=Draw_LoadImage("data/wizard_right.bmp");

	// Magik Ball
	img_magikball=Draw_LoadImage("data/magikball.bmp");

	// Load the earth images
	img_earth[ 0]=Draw_LoadImage("data/earth/0.bmp");
	img_earth[ 1]=Draw_LoadImage("data/earth/1.bmp");
	img_earth[ 2]=Draw_LoadImage("data/earth/2.bmp");
	img_earth[ 3]=Draw_LoadImage("data/earth/3.bmp");
	img_earth[ 4]=Draw_LoadImage("data/earth/4.bmp");
	img_earth[ 5]=Draw_LoadImage("data/earth/5.bmp");
	img_earth[ 6]=Draw_LoadImage("data/earth/6.bmp");
	img_earth[ 7]=Draw_LoadImage("data/earth/7.bmp");
	img_earth[ 8]=Draw_LoadImage("data/earth/8.bmp");
	img_earth[ 9]=Draw_LoadImage("data/earth/9.bmp");
	img_earth[10]=Draw_LoadImage("data/earth/A.bmp");
	img_earth[11]=Draw_LoadImage("data/earth/B.bmp");
	img_earth[12]=Draw_LoadImage("data/earth/C.bmp");
	img_earth[13]=Draw_LoadImage("data/earth/D.bmp");
	img_earth[14]=Draw_LoadImage("data/earth/E.bmp");
	img_earth[15]=Draw_LoadImage("data/earth/F.bmp");

	// FIXME: Earth back

	// Stone Brick
	img_stoneBrick=Draw_LoadImage("data/rock.bmp");

	// FIXME: Stone Brick back

	// Spiked Bush
	img_spikedBush=Draw_LoadImage("data/spikedbush.bmp");

	// FIXME: Lava Pit

	// FIXME: Fireball

	// Flower
	img_flower[0]=Draw_LoadImage("data/flower_left.bmp");
	img_flower[1]=Draw_LoadImage("data/flower_right.bmp");

	// Spike
	img_spike[0]=Draw_LoadImage("data/spike_left.bmp");
	img_spike[1]=Draw_LoadImage("data/spike_right.bmp");

	// Carnivore Plant
	img_carnivorePlant[0]=Draw_LoadImage("data/carnivoreplant_left.bmp");
	img_carnivorePlant[1]=Draw_LoadImage("data/carnivoreplant_right.bmp");

	// Bunny
	img_bunny[0]=Draw_LoadImage("data/bunny_left.bmp");
	img_bunny[1]=Draw_LoadImage("data/bunny_right.bmp");

	// Spider
	img_spider[0]=Draw_LoadImage("data/spider_left.bmp");
	img_spider[1]=Draw_LoadImage("data/spider_right.bmp");

	// FIXME: Guard

	// FIXME: Elite Guard

	// FIXEM: Axe

	// FIXME: GoatMan

	// FIXME: Princess


	/////////////////////////
	// Initialize entity types.
	//

	ent_Player=Entity_New();
	ent_Player->type=Ent_Player;
	//ent_Player->flags=EntityFlag_Light;
	//Entity_SetLight(ent_Player,.2,.2,.2,200);
	ent_Player->flags=EntityFlag_Collision|EntityFlag_Overlap;
	ent_Player->zorder=0;
	AnimPlay_SetImg(&ent_Player->anim,img_player);
	ent_Player->proc=player_proc;
	ent_Player->mass=1.0f;
	ent_Player->radius=12;
	ent_Player->width=24;
	ent_Player->height=24;
	ent_Player->fric_static=0.0f;
	ent_Player->fric_dynamic=0.2f;

	ent_Platform=Entity_New();
	ent_Platform->type=Ent_Platform;
	ent_Platform->flags=EntityFlag_PlatformCollision;
	ent_Platform->zorder=-1;
	AnimPlay_SetImg(&ent_Platform->anim,img_platform);
	ent_Platform->mass=0.0f;
	ent_Platform->radius=12;
	ent_Platform->width=64;
	ent_Platform->height=16;
	ent_Platform->fric_static=0.0f;
	ent_Platform->fric_dynamic=0.2f;

	ent_Block=Entity_New();
	ent_Block->type=Ent_Block;
	ent_Block->flags=EntityFlag_BlockCollision;
	ent_Block->zorder=-1;
	AnimPlay_SetImg(&ent_Block->anim,img_block);
	ent_Block->mass=0.0f;
	ent_Block->radius=32;
	ent_Block->width=64;
	ent_Block->height=64;
	ent_Block->fric_static=0.0f;
	ent_Block->fric_dynamic=0.2f;




	// Magik Ball
	ent_MagikBall=Entity_New();
	ent_MagikBall->type=Ent_Spike;
	ent_MagikBall->flags=EntityFlag_Collision;
	ent_MagikBall->zorder=0;
	AnimPlay_SetImg(&ent_MagikBall->anim,img_magikball);
	ent_MagikBall->mass=1.0f;
	ent_MagikBall->radius=5;
	ent_MagikBall->width=10;
	ent_MagikBall->height=10;
	ent_MagikBall->collision=magikball_collision;

	// Wizard
	ent_Wizard=Entity_New();
	ent_Wizard->type=Ent_Wizard;
	ent_Wizard->flags=EntityFlag_Collision|EntityFlag_Overlap;
	ent_Wizard->zorder=0;
	AnimPlay_SetImg(&ent_Wizard->anim,img_wizard[0]);
	ent_Wizard->proc=wizard_proc;
	ent_Wizard->mass=1.0f;
	ent_Wizard->radius=24;
	ent_Wizard->width=24;
	ent_Wizard->height=58;
	ent_Wizard->fric_static=0.0f;
	ent_Wizard->fric_dynamic=0.2f;
	ent_Wizard->child=ent_MagikBall;




	// Earth
	ent_Earth=Entity_New();
	ent_Earth->type=Ent_Earth;
	ent_Earth->flags=EntityFlag_BlockCollision;
	ent_Earth->zorder=-2;
	AnimPlay_SetImg(&ent_Earth->anim,img_earth[0]);
	ent_Earth->mass=0.0f;
	ent_Earth->radius=16;
	ent_Earth->width=32;
	ent_Earth->height=32;
	ent_Earth->fric_static=0.0f;
	ent_Earth->fric_dynamic=0.2f;


	// FIXME: Earth back

	// Stone Bricks
	ent_StoneBrick=Entity_New();
	ent_StoneBrick->type=Ent_StoneBrick;
	ent_StoneBrick->flags=EntityFlag_BlockCollision;
	ent_StoneBrick->zorder=-2;
	AnimPlay_SetImg(&ent_StoneBrick->anim,img_stoneBrick);
	ent_StoneBrick->mass=0.0f;
	ent_StoneBrick->radius=16;
	ent_StoneBrick->width=32;
	ent_StoneBrick->height=32;
	ent_StoneBrick->fric_static=0.0f;
	ent_StoneBrick->fric_dynamic=0.2f;

	// FIXME: Stone Bricks back

	// Spiked Bush
	ent_SpikedBush=Entity_New();
	ent_SpikedBush->type=Ent_SpikedBush;
	ent_SpikedBush->flags=EntityFlag_Overlap;
	vec2_set(ent_SpikedBush->pos,0,8);
	ent_SpikedBush->zorder=1;
	AnimPlay_SetImg(&ent_SpikedBush->anim,img_spikedBush);
	ent_SpikedBush->mass=0.0f;
	ent_SpikedBush->radius=24;
	ent_SpikedBush->overlap=spikedentity_overlap;

	// FIXME: Fireball


	// FIXME: Lava Pit


	// Spikes
	ent_Spike[0]=Entity_New();
	ent_Spike[0]->type=Ent_Spike;
	ent_Spike[0]->flags=EntityFlag_Collision;
	ent_Spike[0]->zorder=0;
	AnimPlay_SetImg(&ent_Spike[0]->anim,img_spike[0]);
	vec2_set(ent_Spike[0]->pos,0,-16);
	ent_Spike[0]->mass=1.0f;
	ent_Spike[0]->radius=5;
	ent_Spike[0]->width=10;
	ent_Spike[0]->height=10;
	ent_Spike[0]->collision=spike_collision;
	vec2_set(ent_Spike[0]->vel,-3,2);
	ent_Spike[1]=Entity_Copy(ent_Spike[0]);
	AnimPlay_SetImg(&ent_Spike[1]->anim,img_spike[1]);
	vec2_set(ent_Spike[1]->vel,3,2);


	// Flower
	ent_Flower[0]=Entity_New();
	ent_Flower[0]->type=Ent_Flower;
	ent_Flower[0]->flags=EntityFlag_Collision|EntityFlag_Overlap;
	ent_Flower[0]->zorder=1;
	AnimPlay_SetImg(&ent_Flower[0]->anim,img_flower[0]);
	ent_Flower[0]->mass=0.0f;
	ent_Flower[0]->radius=16;
	ent_Flower[0]->overlap=spikedentity_overlap;
	ent_Flower[0]->oncopy=flower_oncopy;
	ent_Flower[0]->proc=flower_proc;
	ent_Flower[0]->B=60;
	ent_Flower[0]->C=60;
	ent_Flower[0]->child=ent_Spike[0];
	ent_Flower[0]->D=0;
	ent_Flower[1]=Entity_Copy(ent_Flower[0]);
	AnimPlay_SetImg(&ent_Flower[1]->anim,img_flower[1]);
	ent_Flower[1]->child=ent_Spike[1];
	ent_Flower[1]->D=1;


	// Carnivore Plant
	ent_CarnivorePlant[0]=Entity_New();
	ent_CarnivorePlant[0]->type=Ent_CarnivorePlant;
	ent_CarnivorePlant[0]->flags=0;
	ent_CarnivorePlant[0]->zorder=1;
	AnimPlay_SetImg(&ent_CarnivorePlant[0]->anim,img_carnivorePlant[0]);
	ent_CarnivorePlant[0]->mass=0.0f;
	ent_CarnivorePlant[0]->radius=16;
	ent_CarnivorePlant[0]->child=ent_Spike[0];
	ent_CarnivorePlant[1]=Entity_Copy(ent_CarnivorePlant[0]);
	AnimPlay_SetImg(&ent_CarnivorePlant[1]->anim,img_carnivorePlant[1]);


	// Bunny
	ent_Bunny=Entity_New();
	ent_Bunny->type=Ent_Bunny;
	ent_Bunny->flags=EntityFlag_Collision;
	ent_Bunny->zorder=0;
	AnimPlay_SetImg(&ent_Bunny->anim,img_bunny[0]);
	ent_Bunny->proc=bunny_proc;
	ent_Bunny->collision=bunny_collision;
	ent_Bunny->mass=1.0f;
	ent_Bunny->radius=12;
	ent_Bunny->width=24;
	ent_Bunny->height=24;
	ent_Bunny->fric_static=0.0f;
	ent_Bunny->fric_dynamic=0.2f;
	ent_Bunny->A=0;
	ent_Bunny->B=0;
	ent_Bunny->C=60;


	// Spider
	ent_Spider=Entity_New();
	ent_Spider->type=Ent_Spider;
	ent_Spider->flags=EntityFlag_Collision;
	ent_Spider->zorder=0;
	AnimPlay_SetImg(&ent_Spider->anim,img_spider[0]);
	ent_Spider->proc=spider_proc;
	ent_Spider->collision=spider_collision;
	ent_Spider->mass=1.0f;
	ent_Spider->radius=12;
	ent_Spider->width=24;
	ent_Spider->height=24;
	ent_Spider->fric_static=0.0f;
	ent_Spider->fric_dynamic=0.2f;
	ent_Spider->A=0;
	ent_Spider->B=0;
	ent_Spider->C=60;

	// FIXME: Guard

	// FIXME: Elite Guard

	// FIXEM: Axe

	// FIXME: GoatMan

	// FIXME: Princess


}

