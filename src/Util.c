// Copyright (C) 2011-2023 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>
#include <stdio.h>
#include <string.h>

#include "Util.h"

/////////////////////////////
// Misc
//

float CosineInterpolation(float f) { return (1.0f - cosf(f * Pi)) * 0.5f; }

int MinimumInt(int i0, int i1) {
	if (i1 < i0) {
		return i1;
	}
	return i0;
}

int MaximumInt(int i0, int i1) {
	if (i1 > i0) {
		return i1;
	}
	return i0;
}

/////////////////////////////
// Rect
//

void Rect_UnionRect(Rect r0, Rect r1, Rect rd) {
	rd->x0 = MinimumInt(r0->x0, r1->x0);
	rd->y0 = MinimumInt(r0->y0, r1->y0);
	rd->x1 = MaximumInt(r0->x1, r1->x1);
	rd->y1 = MaximumInt(r0->y1, r1->y1);
}

int Rect_PointInside(Rect r, int x, int y) { return (x >= r->x0 && x < r->x1 && y >= r->y0 && y < r->y1); }

int Rect_PointInsideAny(TRect r[], int rCount, int x, int y) {
	int insideAny = 0;
	int i;
	for (i = 0; i < rCount; i++) {
		if (Rect_PointInside(&(r[i]), x, y)) {
			insideAny = 1;
			break;
		}
	}
	return insideAny;
}

/////////////////////////////
// SolveQuadratic
//
// Solves a Quadratic equation using a, b and c coeficients.
int SolveQuadratic(float a, float b, float c, float *RMin, float *RMax) {
	float root;
	float divisor;
	float b2;
	b2   = b * b;
	root = b2 - 4.0f * a * c;
	if (root < 0) {
		// Complex
		return (0);
	}
	divisor = (2.0f * a);
	if (fabsf(divisor) == 0.0f) {
		// +inf -inf
		return (0);
	}
	root    = sqrtf(root);
	RMin[0] = (float)((-b - root) / divisor);
	RMax[0] = (float)((-b + root) / divisor);
	return (1);
}

////////////////////////////////////////////////
// vec2 //
//////////
// A 2D vector.
float vec2_norm(vec2 v) {
	float len;
	len = vec2_len(v);
	vec2_scale(v, v, 1.0f / len);
	return (len);
}

void vec2_orthogonalize4(vec2 v) {
	if (fabsf(v[0]) > fabsf(v[1])) {
		if (v[0] >= 0) {
			v[0] = 1.0f;
			v[1] = 0.0f;
		} else {
			v[0] = -1.0f;
			v[1] = 0.0f;
		}
	} else {
		if (v[1] >= 0) {
			v[1] = 1.0f;
			v[0] = 0.0f;
		} else {
			v[1] = -1.0f;
			v[0] = 0.0f;
		}
	}
}

void vec2_orthogonalize8(vec2 v) {
	float diff = fabsf(fabsf(v[0]) - fabsf(v[1]));
	if (diff > 0.2f) {
		if (fabsf(v[0]) > fabsf(v[1])) {
			if (v[0] >= 0) {
				v[0] = 1.0f;
				v[1] = 0.0f;
			} else {
				v[0] = -1.0f;
				v[1] = 0.0f;
			}
		} else {
			if (v[1] >= 0) {
				v[1] = 1.0f;
				v[0] = 0.0f;
			} else {
				v[1] = -1.0f;
				v[0] = 0.0f;
			}
		}
	} else {
		if (v[0] > 0.0f) {
			v[0] = 0.707f;
		} else {
			v[0] = -0.707f;
		}
		if (v[1] > 0.0f) {
			v[1] = 0.707f;
		} else {
			v[1] = -0.707f;
		}
	}
}

/////////////////////////////
// Intersect_RayUnitCircle
//
// Intersection between a ray and a Unit Circle.
int Intersect_RayUnitCircle(const vec2 orig, const vec2 vel, const vec2 center, float *t) {
	float a, b, c;
	float Rmin, Rmax;
	vec2 distv;
	float qlvel;
	float qdistv;

	// Check if the collision is even posible
	qlvel = vec2_dot(vel, vel);
	if (fabsf(qlvel) <= 0.0f) {
		return (0);
	}
	vec2_minus(distv, orig, center);
	qdistv = vec2_dot(distv, distv);

	// Solve as a unit circle
	a = qlvel;
	b = 2.0f * vec2_dot(distv, vel);
	c = qdistv - 1.0f;
	if (SolveQuadratic(a, b, c, &Rmin, &Rmax)) {
		if (Rmin >= -0.0f && Rmin < Rmax && Rmin <= 1.0f) {
			*t = Rmin;
			return (1);
		}
		if (Rmax >= -0.0f && Rmin > Rmax && Rmax <= 1.0f) {
			*t = Rmax;
			return (1);
		}
	}
	return (0);
}

/////////////////////////////
// Collision_CircleCircle
//
// Collision point of a circle against another circle.
int Collision_CircleCircle(const vec2 cir1, float ra, const vec2 vel, const vec2 cb, float rb, float *t, vec2 n) {
	vec2 vel_a, orig_a, cen_a, temp;
	float rads, invrads;
	float maxx, minx;
	float maxy, miny;

	// Check if the collision is even posible
	rads = ra + rb;
	minx = cir1[0] - rads;
	maxx = cir1[0] + rads;
	if (vel[0] > 0) {
		maxx += vel[0];
	} else {
		minx += vel[0];
	}
	if (cb[0] < minx || cb[0] > maxx)
		return (0);
	miny = cir1[1] - rads;
	maxy = cir1[1] + rads;
	if (vel[1] > 0) {
		maxy += vel[1];
	} else {
		miny += vel[1];
	}
	if (cb[1] < miny || cb[1] > maxy)
		return (0);

	// Convert to a unit circle vs ray
	invrads = 1.0f / rads;
	vec2_scale(vel_a, vel, invrads);
	vec2_scale(orig_a, cir1, invrads);
	vec2_scale(cen_a, cb, invrads);
	if (Intersect_RayUnitCircle(orig_a, vel_a, cen_a, t)) {
		// Calculate n
		vec2_scaleadd(temp, cir1, vel, *t);
		vec2_minus(n, temp, cb);
		vec2_scale(n, n, invrads);
		return (1);
	}
	return (0);
}

/////////////////////////////
// Intersect_RayEdge
//
// Intersection between a ray and an edge.
int Intersect_RayEdge(const vec2 pos, const vec2 vel, const vec2 norm, const vec2 edgePos, float len, float *t) {
	vec2 pos2, intersection, perp, edgePos2;
	float delta, d1, d2, hLen;

	vec2_plus(pos2, pos, vel);
	hLen = len / 2;

	// Check intersection against the line
	delta = vec2_dot(norm, edgePos);
	d1    = vec2_dot(pos, norm) - delta;
	d2    = vec2_dot(pos2, norm) - delta;
	if (d1 >= -0.0001f && d2 <= 0.0001f) {
		// Intersection with line, Calculate intersection point
		*t = d1 / (d1 - d2);
		vec2_scaleadd(intersection, pos, vel, *t);

		// Perpendicular
		vec2_perp(perp, norm);

		// Check sides
		vec2_scaleadd(edgePos2, edgePos, perp, -hLen);
		delta = -vec2_dot(perp, edgePos2);
		d1    = (-vec2_dot(perp, intersection)) - delta;

		vec2_scaleadd(edgePos2, edgePos, perp, hLen);
		delta = vec2_dot(perp, edgePos2);
		d2    = vec2_dot(perp, intersection) - delta;

		if (d1 <= 0.0f && d2 <= 0.0f) {
			// Intersection inside Edge.
			return (1);
		}
	}
	return (0);
}

/////////////////////////////
// AbsMod
//
int AbsMod(int v, int d) {
	if (v < 0) {
		v += d * (((v / d) * (-1)) + 1);
		return (v);
	} else {
		return (v % d);
	}
}
float AbsModFloat(float v, int d) {
	if (v < 0) {
		v += d * ((((int)(v / d)) * (-1)) + 1);
		return (v);
	} else {
		v -= d * (((int)(v / d)) + 1);
		return (v);
	}
}

/////////////////////////////
// IsBigEndian
//
int IsBigEndian() {
	union {
		unsigned int i;
		char c[4];
	} bint = {0x01020304};
	return bint.c[0] == 1;
}

/////////////////////////////
// EndsWith
//
int EndsWith(char *str, char *suffix) {
	if (!str || !suffix) {
		return 0;
	}
	size_t lenStr    = strlen(str);
	size_t lenSuffix = strlen(suffix);
	if (lenSuffix > lenStr) {
		return 0;
	}
	return strncmp(str + lenStr - lenSuffix, suffix, lenSuffix) == 0;
}

/////////////////////////////
// Rand
//
// (LGC++) + Seed change

#define g_LGC_Seed_N 30
#define g_LGC_Seed_A 30
#define g_LGC_Seed_B 5
#define g_LGC_Seed_C 10
#define g_LGC_Seed_D 15
#define g_LGC_A 16807ul
#define g_LGC_C 2
#define g_LGC_M 2147483647ul
unsigned g_LGC_Seeds[30];
int g_LGC_Seed_I = -1;

unsigned g_RandCount;
unsigned g_RandOrigSeed;

void Rand_Seed(unsigned seed) {
	int i;
	g_LGC_Seeds[0] = seed;
	for (i = 1; i < 30; i++) {
		g_LGC_Seeds[i] = (g_LGC_Seeds[i - 1] * g_LGC_A + g_LGC_C) % g_LGC_M;
	}
	g_LGC_Seed_I = 29;

	// Cambio de semilla
	g_RandCount    = 0;
	g_RandOrigSeed = seed;
}

unsigned Rand_Get() {
	unsigned val;
	int a, b, c, d;

	if (g_LGC_Seed_I == -1) {
		Rand_Seed(1);
	}

	a = g_LGC_Seed_I - g_LGC_Seed_A;
	if (a < 0) {
		a += g_LGC_Seed_N;
	}
	b = g_LGC_Seed_I - g_LGC_Seed_B;
	if (b < 0) {
		b += g_LGC_Seed_N;
	}
	c = g_LGC_Seed_I - g_LGC_Seed_C;
	if (c < 0) {
		c += g_LGC_Seed_N;
	}
	d = g_LGC_Seed_I - g_LGC_Seed_D;
	if (d < 0) {
		d += g_LGC_Seed_N;
	}
	val = g_LGC_Seeds[a] ^ g_LGC_Seeds[b] ^ g_LGC_Seeds[c] ^ g_LGC_Seeds[d];

	a = g_LGC_Seed_I - 1;
	if (a < 0) {
		a = g_LGC_Seed_N - 1;
	}
	g_LGC_Seeds[g_LGC_Seed_I] = (g_LGC_Seeds[a] * g_LGC_A + g_LGC_C) % g_LGC_M;
	g_LGC_Seed_I++;
	if (g_LGC_Seed_I == g_LGC_Seed_N) {
		g_LGC_Seed_I = 0;
	}

	// Cambio de semilla
	g_RandCount++;
	if (g_RandCount > (1 << 15)) {
		Rand_Seed(g_RandOrigSeed + 1);
	}

	return (val);
}

unsigned Rand_GetBetween(int min, int max) {
	if (min == max) {
		return max;
	}
	return (Rand_Get() % (max - min)) + min;
}

/////////////////////////////
// Print
//
// Prints the formatted text
int Print(char *fmt, ...) {
	va_list ap;
	int n;

	// Print
	va_start(ap, fmt);
	n = vprintf(fmt, ap);
	va_end(ap);

	// Flush
	fflush(stdout);
	return (n);
}
