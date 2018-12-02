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

Entity ent_Player;
Entity ent_Platform;
Entity ent_Block;

int EntityApplyGravity(Entity e) {
	float grav = 10.0f;
	float vTerminal = 50.0f;
	vec2 vGrav;

	// Only apply gravity to some entity types
	if (!(e->type == Ent_Player || 0)) {
		return (1);
	}

	// Apply gravity
	vec2_set(vGrav, 0.0f, grav);
	Entity_AddVelLimit(e, vGrav, vTerminal);

	return (1);
}

void player_proc(Entity e, int ft) {
	float acel = 8.0f;
	float maxVel = 30.0f;
	float jumpVel = 50.0f;
	float airMovementFactor = 0.1f;


	// Process elasticity
	float entityScale[2];
	Entity_GetScale(e, entityScale);
	entityScale[0] += (1.0f - entityScale[0]) / 2.0f;
	entityScale[1] += (1.0f - entityScale[1]) / 2.0f;
	Entity_SetScale(e, entityScale);


	if (e->A > 0) {
		if (Input_GetKey(InputKey_Jump) == InputKey_Pressed ||
			Input_GetKey(InputKey_Up) == InputKey_Pressed) {

			// Apply jump
			if (e->vel[1] > (-jumpVel)) {
				e->vel[1] = -jumpVel;
			}
			Entity_CalcBBox(e);

			Entity_SetScale(e, (float[2]){0.6f, 1.4f});

			// FIXME: play sound
		}
		if (Input_GetKey(InputKey_Left)) {
			vec2 left;

			// Apply left movement
			vec2_set(left, -acel, 0.0f);
			Entity_AddVelLimit(e, left, maxVel);
		}
		if (Input_GetKey(InputKey_Right)) {
			vec2 right;

			// Apply right movement
			vec2_set(right, acel, 0.0f);
			Entity_AddVelLimit(e, right, maxVel);
		}
	} else {
		if (Input_GetKey(InputKey_Left)) {
			vec2 left;

			// Apply left movement
			vec2_set(left, -(acel * airMovementFactor), 0.0f);
			Entity_AddVelLimit(e, left, maxVel * airMovementFactor);
		}
		if (Input_GetKey(InputKey_Right)) {
			vec2 right;

			// Apply right movement
			vec2_set(right, acel * airMovementFactor, 0.0f);
			Entity_AddVelLimit(e, right, maxVel * airMovementFactor);
		}
	}
	if (Input_GetKey(InputKey_Action1) == InputKey_Pressed ||
		Input_GetKey(InputKey_Action2) == InputKey_Pressed) {
		Entity_SetScale(e, (float[2]){1.0f, 1.0f});
	}

	e->A = 0;
}

void player_postproc(Entity e){

	// Scroll View
	GameLib_MoveToPos(e->pos, 0.6f);
	//GameLib_MoveToPos(e->pos, 1.0f);
}

int player_collision(Entity ent, Entity ent2, float t, vec2 n){
	if(n[1] < 0  && fabs(n[1]) > fabs(n[0])){
		ent->A = 1;
	}
	
	if (fabs(n[0]) > fabs(n[1])) {
		float intensity = (fabs(ent->vel[0]) - 10.0f) / 40.0f;
		if (intensity > 0) {
			Entity_SetScale(ent, (float[2]){1.0f - (0.3f * intensity), 1.0f + (0.3f * intensity)});
		}
	} else {
		float intensity = (fabs(ent->vel[1]) - 10.0f) / 40.0f;
		if (intensity > 0) {
			Entity_SetScale(ent, (float[2]){1.0f + (0.3f * intensity), 1.0f - (0.3f * intensity)});
		}
	}
	return -1;
}

void GameEnts_Init() {

	/////////////////////////////
	// Load and initialize media.
	//

	img_player = Draw_LoadImage("data/player.png");
	img_platform = Draw_LoadImage("data/platform.png");
	img_block = Draw_LoadImage("data/block.png");

	/////////////////////////
	// Initialize entity types.
	//

	ent_Player = Entity_New();
	ent_Player->type = Ent_Player;
	// ent_Player->flags=EntityFlag_Light;
	// Entity_SetLight(ent_Player,.2,.2,.2,200);
	ent_Player->flags = EntityFlag_Collision | EntityFlag_Overlap;
	ent_Player->zorder = 0;
	AnimPlay_SetImg(&ent_Player->anim, img_player);
	ent_Player->proc = player_proc;
	ent_Player->postproc = player_postproc;
	ent_Player->collision = player_collision;
	ent_Player->mass = 1.0f;
	ent_Player->radius = 12;
	ent_Player->width = 24;
	ent_Player->height = 24;
	ent_Player->fric_static = 0.0f;
	ent_Player->fric_dynamic = 0.2f;

	ent_Platform = Entity_New();
	ent_Platform->type = Ent_Platform;
	ent_Platform->flags = EntityFlag_PlatformCollision;
	ent_Platform->zorder = -1;
	AnimPlay_SetImg(&ent_Platform->anim, img_platform);
	ent_Platform->mass = 0.0f;
	ent_Platform->radius = 12;
	ent_Platform->width = 64;
	ent_Platform->height = 16;
	ent_Platform->fric_static = 0.0f;
	ent_Platform->fric_dynamic = 0.2f;

	ent_Block = Entity_New();
	ent_Block->type = Ent_Block;
	ent_Block->flags = EntityFlag_BlockCollision;
	ent_Block->zorder = -1;
	AnimPlay_SetImg(&ent_Block->anim, img_block);
	ent_Block->mass = 0.0f;
	ent_Block->radius = 32;
	ent_Block->width = 64;
	ent_Block->height = 64;
	ent_Block->fric_static = 0.0f;
	ent_Block->fric_dynamic = 0.2f;
}
