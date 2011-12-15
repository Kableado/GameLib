#ifndef _UTIL_H_
#define _UTIL_H_


/////////////////////////////
// SolveQuadratic
//
// Solves a Quadratic equation using a, b and c coeficients.
int SolveQuadratic(float a,float b,float c,float *Rmin,float *Rmax);


////////////////////////////////////////////////
// vec2 //
//////////
// A 2D vector.
typedef float vec2[2];
#define vec2_set(v,x,y) (v)[0]=(x);(v)[1]=(y);
#define vec2_copy(v1,v2) (v1)[0]=(v2)[0];(v1)[1]=(v2)[1];
#define vec2_plus(v,v1,v2) (v)[0]=(v1)[0]+(v2)[0];(v)[1]=(v1)[1]+(v2)[1];
#define vec2_minus(v,v1,v2) (v)[0]=(v1)[0]-(v2)[0];(v)[1]=(v1)[1]-(v2)[1];
#define vec2_scale(v,v1,s) (v)[0]=(v1)[0]*(s);(v)[1]=(v1)[1]*(s);
#define vec2_dot(v1,v2) ((v1)[0]*(v2)[0]+(v1)[1]*(v2)[1])


/////////////////////////////
// Intersec_RayUnitCircle
//
// Intersection between a ray and a Unit Circle.
int Intersec_RayUnitCircle(vec2 orig,vec2 vel,vec2 center,float *t);




/////////////////////////////
// Intersect_CircleCircle
//
// Colision point of a circle against another circle.
int Colision_CircleCircle(
	vec2 ca[2],float ra,
	vec2 cb,float rb,
	float *t,vec2 n);


#endif
