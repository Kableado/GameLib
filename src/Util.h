// Copyright (C) 2011-2021 Valeriano Alfonso Rodriguez (Kableado)

#ifndef _UTIL_H_
#define _UTIL_H_

#include <stdarg.h>
#include <stdlib.h>

#define Pi (3.1415925f)

/////////////////////////////
// Misc
//

float CosineInterpolation(float f);

int MinimumInt(int i0, int i1);

int MaximumInt(int i0, int i1);

/////////////////////////////
// Rect
//

typedef struct SRect TRect, *Rect;
struct SRect {
	int x0;
	int y0;
	int x1;
	int y1;
};

void Rect_UnionRect(Rect r0, Rect r1, Rect rd);
int Rect_PointInside(Rect r, int x, int y);
int Rect_PointInsideAny(TRect r[], int rCount, int x, int y);

/////////////////////////////
// SolveQuadratic
//
// Solves a Quadratic equation using a, b and c coeficients.
int SolveQuadratic(float a, float b, float c, float *Rmin, float *Rmax);

////////////////////////////////////////////////
// vec2 //
//////////
// A 2D vector.
typedef float vec2[2];
#define vec2_set(v, x, y)                                                                                              \
	(v)[0] = (x);                                                                                                      \
	(v)[1] = (y);
#define vec2_copy(v1, v2)                                                                                              \
	(v1)[0] = (v2)[0];                                                                                                 \
	(v1)[1] = (v2)[1];
#define vec2_plus(v, v1, v2)                                                                                           \
	(v)[0] = (v1)[0] + (v2)[0];                                                                                        \
	(v)[1] = (v1)[1] + (v2)[1];
#define vec2_minus(v, v1, v2)                                                                                          \
	(v)[0] = (v1)[0] - (v2)[0];                                                                                        \
	(v)[1] = (v1)[1] - (v2)[1];
#define vec2_scale(v, v1, s)                                                                                           \
	(v)[0] = (v1)[0] * (s);                                                                                            \
	(v)[1] = (v1)[1] * (s);
#define vec2_dot(v1, v2) ((v1)[0] * (v2)[0] + (v1)[1] * (v2)[1])
#define vec2_len(v) sqrtf((v)[0] * (v)[0] + (v)[1] * (v)[1])
#define vec2_perp(v, n)                                                                                                \
	(v)[0] = -(n)[1];                                                                                                  \
	(v)[1] = (n)[0];
#define vec2_scaleadd(v, v1, v2, s)                                                                                    \
	(v)[0] = (v2)[0] * (s) + (v1)[0];                                                                                  \
	(v)[1] = (v2)[1] * (s) + (v1)[1];
float vec2_norm(vec2 v);
#define vec2_interpol(v, v1, v2, f)                                                                                    \
	(v)[0] = (v1)[0] - f * ((v1)[0] - (v2)[0]);                                                                        \
	(v)[1] = (v1)[1] - f * ((v1)[1] - (v2)[1]);
void vec2_orthogonalize4(vec2 v);
void vec2_orthogonalize8(vec2 v);

/////////////////////////////
// Intersec_RayUnitCircle
//
// Intersection between a ray and a Unit Circle.
int Intersec_RayUnitCircle(vec2 orig, vec2 vel, vec2 center, float *t);

/////////////////////////////
// Intersect_CircleCircle
//
// Colision point of a circle against another circle.
int Colision_CircleCircle(vec2 cir1, float ra, vec2 vel, vec2 cb, float rb, float *t, vec2 n);

/////////////////////////////
// Intersect_RayEdge
//
// Intersection between a ray and a edge.
int Intersect_RayEdge(vec2 pos, vec2 vel, vec2 norm, vec2 edgePos, float len, float *t);

/////////////////////////////
// absmod
//
int absmod(int v, int d);
float fabsmod(float v, int d);

/////////////////////////////
// IsBigEndian
//
int IsBigEndian();

/////////////////////////////
// EndsWith
//
int EndsWith(char *str, char *suffix);

/////////////////////////////
// Rand
//

void Rand_Seed(unsigned seed);

unsigned Rand_Get();

#define Rand_GetFloat(x) (((float)(Rand_Get() % 1048576)) / 1048576.0f)

unsigned Rand_GetBetween(int min, int max);

/////////////////////////////
// Print
//
// Prints the formated text
int Print(char *fmt, ...);

#endif
