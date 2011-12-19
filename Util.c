// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>

#include "Util.h"


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
	vec2 temp;

	// Solve as a unit circle
	a=vec2_dot(vel,vel);
	if(fabs(a)<=0.0f){
		return(0);
	}
	vec2_minus(temp,orig,center);
	b=2.0f*vec2_dot(temp,vel);
	c=vec2_dot(temp,temp)-1.0f;
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
	vec2 cir1[2],float rad1,
	vec2 cir2,float rad2,
	float *t,vec2 n)
{
	vec2 vel,orig,cen,temp;
	float rads,invrads;

	// Convert to a unit circle vs ray
	rads=rad1+rad2;
	invrads=1.0f/rads;
	vec2_minus(vel,cir1[1],cir1[0]);
	vec2_scale(vel,vel,invrads);
	vec2_scale(orig,cir1[0],invrads);
	vec2_scale(cen,cir2,invrads);
	if(Intersec_RayUnitCircle(orig,vel,cen,t)){
		// Calculate n
		vec2_minus(vel,cir1[1],cir1[0]);
		vec2_scale(temp,vel,*t);
		vec2_plus(temp,cir1[0],temp);
		vec2_minus(temp,cir2,temp);
		vec2_scale(n,temp,1.0f/rads);
		return(1);
	}
	return(0);
}

