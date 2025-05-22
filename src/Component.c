// Copyright (C) 2023 The Authors
// Governed by the license specified in the LICENSE file

#include "Component.h"
#include <stdlib.h> // For malloc/free
#include <string.h> // For memcpy
#include "Util.h"   // For vec2_set, vec2_copy
#include "Anim.h"   // For AnimPlay_SetImg, AnimPlay_Copy

/////////////////////////////
// EntBody functions
//
EntBody* EntBody_New() {
    EntBody *body = (EntBody*)malloc(sizeof(EntBody));
    if (body) {
        EntBody_Init(body);
    }
    return body;
}

void EntBody_Init(EntBody *body) {
    if (!body) return;

    vec2_set(body->oldpos, 0.0f, 0.0f);
    vec2_set(body->pos0, 0.0f, 0.0f);
    vec2_set(body->pos, 0.0f, 0.0f);
    vec2_set(body->dir, 0.0f, 0.0f);
    vec2_set(body->vel, 0.0f, 0.0f);
    vec2_set(body->bod_offset, 0.0f, 0.0f);
    body->radius = 0.0f;
    body->width = 0.0f;
    body->height = 0.0f;
    body->mass = 1.0f; // Mass is typically 1.0 by default
    body->elast = 0.0f;
    body->backFric_static = 0.0f;
    body->backFric_dynamic = 0.0f;
    body->fric_static = 0.0f;
    body->fric_dynamic = 0.0f;
}

void EntBody_Destroy(EntBody *body) {
    if (body) {
        free(body);
    }
}

EntBody* EntBody_Copy(EntBody *src_body) {
    if (!src_body) return NULL;

    EntBody *dst_body = (EntBody*)malloc(sizeof(EntBody));
    if (!dst_body) return NULL; /* Handle allocation failure */

    vec2_copy(dst_body->oldpos, src_body->oldpos);
    vec2_copy(dst_body->pos0, src_body->pos0);
    vec2_copy(dst_body->pos, src_body->pos);
    vec2_copy(dst_body->dir, src_body->dir);
    vec2_copy(dst_body->vel, src_body->vel);
    vec2_copy(dst_body->bod_offset, src_body->bod_offset);
    dst_body->radius = src_body->radius;
    dst_body->width = src_body->width;
    dst_body->height = src_body->height;
    dst_body->mass = src_body->mass;
    dst_body->elast = src_body->elast;
    dst_body->backFric_static = src_body->backFric_static;
    dst_body->backFric_dynamic = src_body->backFric_dynamic;
    dst_body->fric_static = src_body->fric_static;
    dst_body->fric_dynamic = src_body->fric_dynamic;

    return dst_body;
}

/////////////////////////////
// EntSprite functions
//
EntSprite* EntSprite_New() {
    EntSprite *sprite = (EntSprite*)malloc(sizeof(EntSprite));
    if (sprite) {
        EntSprite_Init(sprite);
    }
    return sprite;
}

void EntSprite_Init(EntSprite *sprite) {
    if (!sprite) return;

    AnimPlay_SetImg(&sprite->anim, NULL); // Or appropriate default init for AnimPlay

    // Initialize colors (typically to white, fully opaque)
    sprite->color0[0] = 1.0f; sprite->color0[1] = 1.0f; sprite->color0[2] = 1.0f; sprite->color0[3] = 1.0f;
    sprite->color[0] = 1.0f; sprite->color[1] = 1.0f; sprite->color[2] = 1.0f; sprite->color[3] = 1.0f;
    
    // Initialize light (typically to black, no emission)
    sprite->light[0] = 0.0f; sprite->light[1] = 0.0f; sprite->light[2] = 0.0f; sprite->light[3] = 0.0f;
    
    // Initialize defaultColor (typically to white, fully opaque)
    sprite->defaultColor[0] = 1.0f; sprite->defaultColor[1] = 1.0f; sprite->defaultColor[2] = 1.0f; sprite->defaultColor[3] = 1.0f;

    // Initialize scales (typically to 1.0)
    sprite->scale0[0] = 1.0f; sprite->scale0[1] = 1.0f;
    sprite->scale[0] = 1.0f; sprite->scale[1] = 1.0f;

    // Initialize rotation
    sprite->rotation0 = 0.0f;
    sprite->rotation = 0.0f;
}

void EntSprite_Destroy(EntSprite *sprite) {
    if (sprite) {
        // If AnimPlay has allocated resources, they should be freed here
        // For example: AnimPlay_Clear(&sprite->anim);
        free(sprite);
    }
}

EntSprite* EntSprite_Copy(EntSprite *src_sprite) {
    if (!src_sprite) return NULL;

    EntSprite *dst_sprite = (EntSprite*)malloc(sizeof(EntSprite));
    if (!dst_sprite) return NULL; /* Handle allocation failure */

    AnimPlay_Copy(&dst_sprite->anim, &src_sprite->anim);
    memcpy(dst_sprite->color0, src_sprite->color0, sizeof(float) * 4);
    memcpy(dst_sprite->color, src_sprite->color, sizeof(float) * 4);
    memcpy(dst_sprite->light, src_sprite->light, sizeof(float) * 4);
    memcpy(dst_sprite->defaultColor, src_sprite->defaultColor, sizeof(float) * 4);
    memcpy(dst_sprite->scale0, src_sprite->scale0, sizeof(float) * 2);
    memcpy(dst_sprite->scale, src_sprite->scale, sizeof(float) * 2);
    dst_sprite->rotation0 = src_sprite->rotation0;
    dst_sprite->rotation = src_sprite->rotation;

    return dst_sprite;
}
