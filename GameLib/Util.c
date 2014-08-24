// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>
#include <stdlib.h>
#include <string.h>

#include "Util.h"

////////////////////////////////////////////////
// vec2 //
//////////
// A 2D vector.
float vec2_norm(vec2 v){
	float len;
	len=vec2_len(v);
	vec2_scale(v,v,1.0f/len);
	return(len);
}

void vec2_orthogonalize4(vec2 v) {
	if (fabs(v[0]) > fabs(v[1])) {
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
	float diff = fabs(fabs(v[0]) - fabs(v[1]));
	if (diff > 0.2f) {
		if (fabs(v[0]) > fabs(v[1])) {
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
// SolveQuadratic
//
// Solves a Quadratic equation using a, b and c coeficients.
int SolveQuadratic(float a,float b,float c,float *Rmin,float *Rmax){
	float root;
	float divisor;
	float b2;
	b2=b*b;
	root=b2-4.0*a*c;
	if(root<0){
		// Complex
		return(0);
	}
	divisor=(2.0*a);
	if(fabs(divisor)==0.0f){
		// +inf -inf
		return(0);
	}
	root=sqrtf(root);
	Rmin[0]=(float)((-b-root)/divisor);
	Rmax[0]=(float)((-b+root)/divisor);
	return(1);
}


/////////////////////////////
// Intersec_RayUnitCircle
//
// Intersection between a ray and a Unit Circle.
int Intersec_RayUnitCircle(vec2 orig,vec2 vel,vec2 center,float *t){
	float a,b,c;
	float Rmin,Rmax;
	vec2 distv;
	float qlvel;
	float qdistv;

	// Check if the collision is even posible
	qlvel=vec2_dot(vel,vel);
	if(fabs(qlvel)<=0.0f)
		return(0);
	vec2_minus(distv,orig,center);
	qdistv=vec2_dot(distv,distv);

	// Solve as a unit circle
	a=qlvel;
	b=2.0f*vec2_dot(distv,vel);
	c=qdistv-1.0f;
	if(SolveQuadratic(a,b,c,&Rmin,&Rmax)){
		if(Rmin>=-0.0f && Rmin<Rmax && Rmin<=1.0f){
			*t=Rmin;
			return(1);
		}
		if(Rmax>=-0.0f && Rmin>Rmax && Rmax<=1.0f){
			*t=Rmax;
			return(1);
		}
	}
	return(0);
}


/////////////////////////////
// Colision_CircleCircle
//
// Colision point of a circle against another circle.
int Colision_CircleCircle(
	vec2 cir1,float rad1,vec2 vel,
	vec2 cir2,float rad2,
	float *t,vec2 n)
{
	vec2 vel_a,orig_a,cen_a,temp;
	float rads,invrads;
	float maxx,minx;
	float maxy,miny;

	// Check if the collision is even posible
	rads=rad1+rad2;
	minx=cir1[0]-rads;
	maxx=cir1[0]+rads;
	if(vel[0]>0){
		maxx+=vel[0];
	}else{
		minx+=vel[0];
	}
	if(cir2[0]<minx || cir2[0]>maxx)
		return(0);
	miny=cir1[1]-rads;
	maxy=cir1[1]+rads;
	if(vel[1]>0){
		maxy+=vel[1];
	}else{
		miny+=vel[1];
	}
	if(cir2[1]<miny || cir2[1]>maxy)
		return(0);

	// Convert to a unit circle vs ray
	invrads=1.0f/rads;
	vec2_scale(vel_a,vel,invrads);
	vec2_scale(orig_a,cir1,invrads);
	vec2_scale(cen_a,cir2,invrads);
	if(Intersec_RayUnitCircle(orig_a,vel_a,cen_a,t)){
		// Calculate n
		vec2_scaleadd(temp,cir1,vel,*t);
		vec2_minus(n,temp,cir2);
		vec2_scale(n,n,invrads);
		return(1);
	}
	return(0);
}


/////////////////////////////
// Intersect_RayEdge
//
// Intersection between a ray and a edge.
int Intersect_RayEdge(
	vec2 pos,vec2 vel,
	vec2 norm,vec2 edgePos,float len,
	float *t)
{
	vec2 pos2,intersection,perp,edgePos2;
	float delta,d1,d2,hLen;

	vec2_plus(pos2,pos,vel);
	hLen=len/2;

	// Check intersection against the line
	delta=vec2_dot(norm,edgePos);
	d1=vec2_dot(pos ,norm)-delta;
	d2=vec2_dot(pos2,norm)-delta;
	if(d1>=-0.0001f && d2<=0.0001f){
		// Intersection with line, Calculate intersection point
		*t=d1/(d1-d2);
		vec2_scaleadd(intersection,pos,vel,*t);

		// Perpendicular
		vec2_perp(perp,norm);

		// Check sides
		vec2_scaleadd(edgePos2,edgePos,perp,-hLen);
		delta=-vec2_dot(perp,edgePos2);
		d1=(-vec2_dot(perp,intersection))-delta;

		vec2_scaleadd(edgePos2,edgePos,perp,hLen);
		delta=vec2_dot(perp,edgePos2);
		d2=vec2_dot(perp,intersection)-delta;

		if(d1<=0.0f && d2<=0.0f){
			// Intersection inside Edge.
			return(1);
		}
	}
	return(0);
}




/////////////////////////////
// absmod
//
int absmod(int v,int d){
	if(v<0){
		v+=d*(((v/d)*(-1))+1);
		return(v);
	}else{
		return(v%d);
	}
}
float fabsmod(float v,int d){
	if(v<0){
		v+=d*((((int)(v/d))*(-1))+1);
		return(v);
	}else{
		v-=d*(((int)(v/d))+1);
		return(v);
	}
}


/////////////////////////////
// IsBigEndian
//
int IsBigEndian(){
	union{
		unsigned int i;
		char c[4];
	} bint={0x01020304};
	return bint.c[0]==1;
}


/////////////////////////////
// EndsWith
//
int EndsWith(char *str, char *suffix){
    if (!str || !suffix)
        return 0;
    int lenStr = strlen(str);
    int lenSuffix = strlen(suffix);
    if (lenSuffix > lenStr)
        return 0;
    return strncmp(str+lenStr-lenSuffix, suffix, lenSuffix)==0;
}


/////////////////////////////
// Rand
//
// (LGC++) + cambio de semilla

#define __seed_n 30
#define __seed_a 30
#define __seed_b 5
#define __seed_c 10
#define __seed_d 15
//#define __LGC_a 1664525ul
//#define __LGC_c 1013904223ul
//#define __LGC_m 4294967296ul
#define __LGC_a 16807ul
#define __LGC_c 2
#define __LGC_m 2147483647ul
unsigned __seeds[30];
int __seed_i = -1;

unsigned __rand_count;
unsigned __rand_orig_seed;

void Rand_Seed(unsigned seed) {
	int i;
	__seeds[0] = seed;
	for (i = 1; i < 30; i++) {
		__seeds[i] = (__seeds[i - 1] * __LGC_a + __LGC_c) % __LGC_m;
		//__seeds[i]=(__seeds[i-1]*__LGC_a+__LGC_c);
	}
	__seed_i = 29;

	// Cambio de semilla
	__rand_count = 0;
	__rand_orig_seed = seed;
}
unsigned Rand_Get() {
	unsigned val;
	int a, b, c, d;

	if (__seed_i == -1) {
		Rand_Seed(1);
	}

	a = __seed_i - __seed_a;
	if (a < 0)
		a += __seed_n;
	b = __seed_i - __seed_b;
	if (b < 0)
		b += __seed_n;
	c = __seed_i - __seed_c;
	if (c < 0)
		c += __seed_n;
	d = __seed_i - __seed_d;
	if (d < 0)
		d += __seed_n;
	val = __seeds[a] ^ __seeds[b] ^ __seeds[c] ^ __seeds[d];

	a = __seed_i - 1;
	if (a < 0)
		a = __seed_n - 1;
	__seeds[__seed_i] = (__seeds[a] * __LGC_a + __LGC_c) % __LGC_m;
	//__seeds[__seed_i]=(__seeds[a]*__LGC_a+__LGC_c);
	__seed_i++;
	if (__seed_i == __seed_n)
		__seed_i = 0;

	// Cambio de semilla
	__rand_count++;
	if (__rand_count > (1 << 15)) {
		Rand_Seed(__rand_orig_seed + 1);
	}

	return (val);
}
