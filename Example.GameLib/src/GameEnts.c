// Copyright (C) 2012-2023 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>
#include <stdio.h>
#include <stdlib.h>

#include "GameLib.h"

#include "GameEnts.h"

DrawImg img_player;
DrawImg img_platform;
DrawImg img_block;

Entity ent_Player;
Entity ent_Platform;
Entity ent_Block;
Entity ent_Box;

int EntityApplyGravity(Entity e) {
	float grav      = 10.0f;
	float vTerminal = 50.0f;
	vec2 vGrav;

	// Guard against NULL entity or body
	if (!e || !e->body) {
		return (0); // Or some other error/no-op indicator
	}

	// Only apply gravity to some entity types
	if (!(e->type == Ent_Player || e->type == Ent_Box || 0)) {
		return (1);
	}

	// Apply gravity
	vec2_set(vGrav, 0.0f, grav);
	Entity_AddVelLimit(e, vGrav, vTerminal);

	return (1);
}

void Player_Proc(Entity e, int ft) {
	float acel              = 8.0f;
	float maxVel            = 30.0f;
	float jumpVel           = 50.0f;
	float airMovementFactor = 0.1f;

	// Guard against NULL entity or its components
	if (!e || !e->body || !e->sprite) {
		return;
	}

	// Process elasticity
	float entityScale[2];
	Entity_GetScale(e, entityScale);
	entityScale[0] += (1.0f - entityScale[0]) / 2.0f;
	entityScale[1] += (1.0f - entityScale[1]) / 2.0f;
	Entity_SetScale(e, entityScale);

	if (e->A > 0) {
		if (Input_GetKey(InputKey_Jump) == InputKey_Pressed || Input_GetKey(InputKey_Up) == InputKey_Pressed) {

			// Apply jump
			if (e->body->vel[1] > (-jumpVel)) {
				e->body->vel[1] = -jumpVel;
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
	if (Input_GetKey(InputKey_Action1) == InputKey_Pressed || Input_GetKey(InputKey_Action2) == InputKey_Pressed) {
		Entity_SetScale(e, (float[2]){1.0f, 1.0f});
	}

	e->A = 0;
}

void Player_PostProc(Entity e, int ft) {
	// Guard against NULL entity or body
	if (!e || !e->body) {
		return;
	}

	// Scroll View
	GameLib_MoveToPos(e->body->pos, 0.6f);
	// GameLib_MoveToPos(e->body->pos, 1.0f);
}

int Player_Collision(Entity ent, Entity ent2, float t, vec2 n) {
	// Guard against NULL entity or its components
	if (!ent || !ent->body || !ent->sprite) {
		return -1; // Keep original error/no-op indicator
	}

	if (n[1] < 0 && fabs(n[1]) > fabs(n[0])) {
		ent->A = 1;
	}

	if (fabs(n[0]) > fabs(n[1])) {
		float intensity = (fabs(ent->body->vel[0]) - 10.0f) / 40.0f;
		if (intensity > 0) {
			Entity_SetScale(ent, (float[2]){1.0f - (0.3f * intensity), 1.0f + (0.3f * intensity)});
		}
	} else {
		float intensity = (fabs(ent->body->vel[1]) - 10.0f) / 40.0f;
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

	img_player   = Draw_LoadImage("data/player.png");
	img_platform = Draw_LoadImage("data/platform.png");
	img_block    = Draw_LoadImage("data/block.png");

	/////////////////////////
	// Initialize entity types.
	//

	ent_Player       = Entity_New();
	ent_Player->type = Ent_Player;
	// ent_Player->flags=EntityFlag_Light;
	// Entity_SetLight(ent_Player,.2,.2,.2,200);
	ent_Player->flags  = EntityFlag_Collision | EntityFlag_Overlap;
	ent_Player->zorder = 0;
	AnimPlay_SetImg(&ent_Player->sprite->anim, img_player);
	ent_Player->proc         = Player_Proc;
	ent_Player->postproc     = Player_PostProc;
	ent_Player->collision    = Player_Collision;
	ent_Player->body->mass         = 1.0f;
	ent_Player->body->radius       = 12;
	ent_Player->body->width        = 24;
	ent_Player->body->height       = 24;
	ent_Player->body->fric_static  = 0.0f;
	ent_Player->body->fric_dynamic = 0.2f;

	ent_Platform         = Entity_New();
	ent_Platform->type   = Ent_Platform;
	ent_Platform->flags  = EntityFlag_PlatformCollision;
	ent_Platform->zorder = -1;
	AnimPlay_SetImg(&ent_Platform->sprite->anim, img_platform);
	ent_Platform->body->mass         = 0.0f; // Confirming static nature
	ent_Platform->body->radius       = 12;   // Existing value, assuming appropriate
	ent_Platform->body->width        = 64;   // Existing value, assuming appropriate
	ent_Platform->body->height       = 16;   // Existing value, assuming appropriate

    // Set physics properties for interaction with EntBox:
    ent_Platform->body->inverseMass = 0.0f; // Static object
    ent_Platform->body->inverseMomentOfInertia = 0.0f; // Static, does not rotate due to physics

    ent_Platform->body->elast = 0.1f; // Low restitution for platforms
    ent_Platform->body->static_friction = 0.8f;  // High static friction
    ent_Platform->body->dynamic_friction = 0.7f; // High dynamic friction
    // Old fric_static and fric_dynamic are removed by not including them here.
    // Rotation should remain 0.0f as set by EntBody_Init for static platforms.

	ent_Block         = Entity_New();
	ent_Block->type   = Ent_Block;
	ent_Block->flags  = EntityFlag_BlockCollision;
	ent_Block->zorder = -1;
	AnimPlay_SetImg(&ent_Block->sprite->anim, img_block);
	ent_Block->body->mass         = 0.0f;
	ent_Block->body->radius       = 32;
	ent_Block->body->width        = 64;
	ent_Block->body->height       = 64;
	ent_Block->body->fric_static  = 0.0f;
	ent_Block->body->fric_dynamic = 0.2f;

    ent_Box = Entity_New();
    ent_Box->type = Ent_Box; // Ensure Ent_Box is defined in GameEnts.h (should be from earlier step)
    ent_Box->flags = EntityFlag_Collision;
    ent_Box->zorder = 0;
    AnimPlay_SetImg(&ent_Box->sprite->anim, img_block); // Reuse img_block for now

    // Base physical properties
    ent_Box->body->mass = 1.0f;
    ent_Box->body->width = 32;  // Example width
    ent_Box->body->height = 32; // Example height

    // Derived physics properties
    if (ent_Box->body->mass > 0.0f) {
        ent_Box->body->inverseMass = 1.0f / ent_Box->body->mass;
    } else {
        ent_Box->body->inverseMass = 0.0f; // Infinite mass for static objects
    }

    if (ent_Box->body->inverseMass == 0.0f) {
        ent_Box->body->momentOfInertia = 0.0f; // Static objects have infinite inertia
        ent_Box->body->inverseMomentOfInertia = 0.0f;
    } else {
        // For a solid rectangle: I = (1/12) * m * (w^2 + h^2)
        float w = ent_Box->body->width;
        float h = ent_Box->body->height;
        ent_Box->body->momentOfInertia = (1.0f/12.0f) * ent_Box->body->mass * (w*w + h*h);
        if (ent_Box->body->momentOfInertia > 0.0f) {
            ent_Box->body->inverseMomentOfInertia = 1.0f / ent_Box->body->momentOfInertia;
        } else {
            // Should not happen for a dynamic body with non-zero width/height
            ent_Box->body->inverseMomentOfInertia = 0.0f;
        }
    }

    ent_Box->body->elast = 0.3f;                // Restitution (bounciness)
    ent_Box->body->static_friction = 0.6f;      // Static friction coefficient
    ent_Box->body->dynamic_friction = 0.4f;     // Dynamic friction coefficient

    // Ensure these old fields are not present or are superseded for ent_Box
    // ent_Box->body->fric_static = 0.0f; (old name)
    // ent_Box->body->fric_dynamic = 0.0f; (old name)

    ent_Box->proc = NULL;       // No specific per-frame logic for basic box
    ent_Box->collision = NULL;  // Collision will be handled by the physics system
}