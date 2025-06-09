#include "Physics.h"
#include "Component.h" // For EntBody
#include <float.h>    // For FLT_MAX
#include <math.h>     // For fabsf
// #include <stdio.h> // For temporary debugging printf

void CheckCollision_SAT(CollisionResult *result, Entity ent1, Entity ent2) {
    result->colliding = 0;
    result->overlap = FLT_MAX;
    vec2_set(result->mtv, 0, 0);

    if (!ent1 || !ent1->body || !ent2 || !ent2->body) {
        return; // Cannot collide if no body
    }

    // 1. Get OBB vertices for both entities
    vec2 vertices1[4], vertices2[4];
    compute_obb_vertices(vertices1, ent1->body->pos, ent1->body->width, ent1->body->height, ent1->body->rotation);
    compute_obb_vertices(vertices2, ent2->body->pos, ent2->body->width, ent2->body->height, ent2->body->rotation);

    // 2. Get axes from both polygons
    vec2 axes1[4], axes2[4]; // Max 4 axes for a box, get_polygon_axes might return fewer (e.g. 2 for a rect)
    int num_axes1, num_axes2;
    get_polygon_axes(axes1, &num_axes1, vertices1, 4);
    get_polygon_axes(axes2, &num_axes2, vertices2, 4);

    vec2 all_axes[8]; // Max 4+4 axes
    int total_axes = 0;
    for (int i = 0; i < num_axes1; ++i) vec2_copy(all_axes[total_axes++], axes1[i]);
    for (int i = 0; i < num_axes2; ++i) vec2_copy(all_axes[total_axes++], axes2[i]);

    // Note: A more optimized get_polygon_axes for rectangles would directly return 2 unique axes.
    // The current one might return more if vertices aren't perfectly forming a rectangle or due to its uniqueness check.
    // For now, this will work, but could be refined. Max 2 unique axes per box needed.

    // 3. Project onto each axis and check for separation
    for (int i = 0; i < total_axes; ++i) {
        vec2 current_axis;
        vec2_copy(current_axis, all_axes[i]);

        float min1, max1, min2, max2;
        project_polygon_onto_axis(vertices1, 4, current_axis, &min1, &max1);
        project_polygon_onto_axis(vertices2, 4, current_axis, &min2, &max2);

        // Check for non-overlap on this axis
        if (max1 < min2 || max2 < min1) {
            result->colliding = 0; // Found a separating axis
            return;
        }

        // Calculate overlap on this axis
        float current_overlap = (max1 < max2) ? max1 - min2 : max2 - min1;

        // If this is the smallest overlap so far, store it and the axis (for MTV)
        if (current_overlap < result->overlap) {
            result->overlap = current_overlap;
            vec2_copy(result->mtv, current_axis);
        }
    }

    // If we got here, all axes overlap, so it's a collision
    result->colliding = 1;

    // Ensure MTV direction is correct (e.g., to push ent1 away from ent2)
    // Calculate vector from center of ent1 to center of ent2
    vec2 center_to_center;
    vec2_minus(center_to_center, ent2->body->pos, ent1->body->pos);
    // If MTV is not aligned with center_to_center vector, flip it
    if (vec2_dot(result->mtv, center_to_center) < 0) {
        vec2_scale(result->mtv, result->mtv, -1.0f);
    }

    // Scale MTV by the overlap magnitude
    vec2_scale(result->mtv, result->mtv, result->overlap);
}

void ResolveCollision_LinearImpulse(Entity ent1, Entity ent2, const CollisionResult* collision_info) {
    if (!collision_info->colliding || !ent1 || !ent1->body || !ent2 || !ent2->body) {
        return;
    }

    float invMass1 = ent1->body->inverseMass;
    float invMass2 = ent2->body->inverseMass;
    float totalInvMass = invMass1 + invMass2;

    // Ensure totalInvMass is not zero to prevent division by zero if both objects are static
    if (totalInvMass < FLT_EPSILON) { // Or some other small float epsilon
        return; // Both objects are static or have near-infinite mass
    }

    // 1. Positional Correction (Penetration Resolution)
    // The MTV in collision_info is already scaled by overlap.
    // We move entities proportional to their inverse masses.
    vec2 mtv;
    vec2_copy(mtv, collision_info->mtv); // mtv = direction * overlap

    // Calculate separation amounts
    vec2 separation1, separation2;
    vec2_scale(separation1, mtv, (invMass1 / totalInvMass));
    vec2_scale(separation2, mtv, (invMass2 / totalInvMass));

    vec2_minus(ent1->body->pos, ent1->body->pos, separation1);
    vec2_plus(ent2->body->pos, ent2->body->pos, separation2);

    // Mark positions as updated for interpolation if your engine uses it
    // ent1->internalFlags |= EntityIntFlag_UpdatedPos; // Assuming this flag exists
    // ent2->internalFlags |= EntityIntFlag_UpdatedPos;

    // 2. Calculate Relative Velocity
    vec2 rv;
    vec2_minus(rv, ent2->body->vel, ent1->body->vel);

    // 3. Calculate Relative Velocity along the Normal
    // The collision_info->mtv is (normal * overlap). We need a normalized normal.
    vec2 normal;
    vec2_copy(normal, collision_info->mtv);
    float overlap = vec2_len(normal); // Get the magnitude of mtv which is the overlap
    if (overlap < FLT_EPSILON) { // Avoid division by zero if overlap is ~0
        return;
    }
    vec2_scale(normal, normal, 1.0f / overlap); // Normalize the mtv to get the collision normal

    float velAlongNormal = vec2_dot(rv, normal);

    // 4. Early exit if velocities are separating
    if (velAlongNormal > 0) {
        return;
    }

    // 5. Calculate Restitution (bounciness)
    // Assuming elast is restitution (0-1 range)
    float e = fminf(ent1->body->elast, ent2->body->elast);
    if (e < 0.0f) e = 0.0f; // Ensure restitution is not negative
    if (e > 1.0f) e = 1.0f; // Ensure restitution is not greater than 1

    // 6. Calculate Impulse Scalar (j)
    float j = -(1.0f + e) * velAlongNormal;
    j /= totalInvMass;

    // 7. Apply Linear Impulse
    vec2 impulse_vec;
    vec2_scale(impulse_vec, normal, j);

    vec2 term1;
    vec2_scale(term1, impulse_vec, invMass1);
    vec2_minus(ent1->body->vel, ent1->body->vel, term1); // vel1 -= impulse_vec * invMass1

    vec2 term2;
    vec2_scale(term2, impulse_vec, invMass2);
    vec2_plus(ent2->body->vel, ent2->body->vel, term2);  // vel2 += impulse_vec * invMass2

    // Recalculate BBox for entities if velocity/position changed
    // Entity_CalcBBox(ent1); // Assuming this function exists and is needed
    // Entity_CalcBBox(ent2);
}

// Removed placeholder GameLib_GetFirstEntity, GameLib_GetNextEntity, and associated guards.

void Physics_Step(Entity* entities, int num_entities, float deltaTime) {
    // Iterate through all entities in the game using the provided list
    for (int i = 0; i < num_entities; ++i) {
        Entity current_ent = entities[i];
        if (!current_ent || !current_ent->body || current_ent->body->inverseMass == 0.0f) {
            // Skip NULL entities, entities without a body, or with infinite mass (static objects)
            continue;
        }

        // --- Gravity is currently handled by EntityApplyGravity in PostProcGame ---

        // --- Update Angular Velocity from Accumulated Torque ---
        float angular_acceleration = current_ent->body->torque * current_ent->body->inverseMomentOfInertia;
        current_ent->body->angularVelocity += angular_acceleration * deltaTime;

        // --- Update Position from Linear Velocity ---
        vec2_copy(current_ent->body->pos0, current_ent->body->pos); // Store prev pos for interpolation
        vec2_scaleadd(current_ent->body->pos, current_ent->body->pos, current_ent->body->vel, deltaTime);
        current_ent->internalFlags |= EntityIntFlag_UpdatedPos;

        // --- Update Rotation from Angular Velocity ---
        current_ent->body->rotation0 = current_ent->body->rotation; // Store prev rot for interpolation
        current_ent->body->rotation += current_ent->body->angularVelocity * deltaTime;
        current_ent->internalFlags |= EntityIntFlag_UpdatedRotation;

        // --- Damping (optional) ---
        // float linearDamping = 0.98f;
        // float angularDamping = 0.95f;
        // vec2_scale(current_ent->body->vel, current_ent->body->vel, powf(linearDamping, deltaTime)); // Requires math.h for powf
        // current_ent->body->angularVelocity *= powf(angularDamping, deltaTime);

        // --- Clear Accumulated Torque for next frame ---
        current_ent->body->torque = 0.0f;
    }
}
