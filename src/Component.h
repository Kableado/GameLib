#ifndef COMPONENT_H
#define COMPONENT_H

#include "Util.h" // For vec2
#include "Anim.h" // For AnimPlay

typedef struct EntBody {
    vec2 oldpos;
    vec2 pos0;
    vec2 pos;
    vec2 dir;
    vec2 vel;
    vec2 bod_offset;
    float radius;
    float width;
    float height;
    float mass;
    float elast;
    float backFric_static;
    float backFric_dynamic;
    float fric_static;
    float fric_dynamic;
} EntBody;

typedef struct EntSprite {
    AnimPlay anim;
    float color0[4];
    float color[4];
    float light[4];
    float defaultColor[4];
    float scale0[2];
    float scale[2];
    float rotation0;
    float rotation;
} EntSprite;

/////////////////////////////
// EntBody functions
//
EntBody* EntBody_New();
void EntBody_Init(EntBody *body);
void EntBody_Destroy(EntBody *body);
EntBody* EntBody_Copy(EntBody *src_body);

/////////////////////////////
// EntSprite functions
//
EntSprite* EntSprite_New();
void EntSprite_Init(EntSprite *sprite);
void EntSprite_Destroy(EntSprite *sprite);
EntSprite* EntSprite_Copy(EntSprite *src_sprite);

#endif // COMPONENT_H
