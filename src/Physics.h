#ifndef PHYSICS_H
#define PHYSICS_H

#include "Util.h"  // For vec2, geometry functions
#include "Entity.h" // For Entity type

// Structure to hold collision result details
typedef struct {
    int colliding;
    vec2 mtv;          // Minimum Translation Vector (direction and magnitude to separate ent1 from ent2)
    float overlap;    // Magnitude of the overlap
} CollisionResult;

// Checks for collision between two entities using the Separating Axis Theorem (SAT).
// Assumes entities are OBBs (Oriented Bounding Boxes).
// Populates result with collision status, MTV, and overlap.
void CheckCollision_SAT(CollisionResult *result, Entity ent1, Entity ent2);

// Resolves collision between two entities using linear impulse (no rotation or friction yet).
// Applies positional correction and changes linear velocities.
void ResolveCollision_LinearImpulse(Entity ent1, Entity ent2, const CollisionResult* collision_info);

// Updates physics state (position, rotation) for all relevant entities based on their velocities.
// Clears accumulated torques.
void Physics_Step(Entity* entities, int num_entities, float deltaTime);

#endif // PHYSICS_H
