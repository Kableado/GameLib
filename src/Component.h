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
    float elast;    // Assuming this is restitution (0-1 range)

    // Consolidating friction:
    float static_friction;  // Renaming for clarity from fric_static
    float dynamic_friction; // Renaming for clarity from fric_dynamic

    // New physics properties:
    float inverseMass;
    float angularVelocity;
    float torque; // Accumulated torque for the current frame
    float momentOfInertia;
    float inverseMomentOfInertia;

    // New rotation fields for physics:
    float rotation;
    float rotation0; // For previous frame's rotation (if needed for interpolation)

    // Deprecating or holding these for review:
    // float backFric_static;
    // float backFric_dynamic;
    // float fric_static; // Superseded by static_friction
    // float fric_dynamic; // Superseded by dynamic_friction
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
