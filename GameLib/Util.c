// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>

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
		vec2_scale(temp,vel,*t);
		vec2_plus(temp,cir1,temp);
		vec2_minus(temp,cir2,temp);
		vec2_scale(n,temp,1.0f/rads);
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



