// Copyright (C) 2013 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>
#include <stdlib.h>
#include <string.h>

#include "QuadArray2D.h"


QuadArray2D QuadArray2D_Create(int resVertex){
	QuadArray2D quadArray=NULL;

	quadArray=malloc(sizeof(TQuadArray2D));

	quadArray->vertexData=malloc(sizeof(float)*Vertex2D_Length*resVertex);
	quadArray->nVertex=0;
	quadArray->resVertex=resVertex;

	return quadArray;
}

void QuadArray2D_Destroy(QuadArray2D *quadArray){
	if(!quadArray) return;
	if(!quadArray[0]) return;

	free(quadArray[0]->vertexData);
	free(quadArray[0]);
	quadArray[0]=NULL;
}

void QuadArray2D_Clean(QuadArray2D quadArray){
	quadArray->nVertex=0;
}

void QuadArray2D_AddVertex(QuadArray2D quadArray,float v[]){
	if(quadArray->resVertex<=quadArray->nVertex){
		// Grow vertexData
		quadArray->resVertex*=2;
		float *newVertexData=malloc(sizeof(float)*Vertex2D_Length*
			quadArray->resVertex);
		memcpy(newVertexData,quadArray->vertexData,
			sizeof(float)*Vertex2D_Length*quadArray->nVertex);
		free(quadArray->vertexData);
		quadArray->vertexData=newVertexData;
	}

	// Add the vertex
	memcpy(
		quadArray->vertexData+
			(Vertex2D_Length*quadArray->nVertex),
		v,sizeof(float)*Vertex2D_Length);
	quadArray->nVertex++;
}

void QuadArray2D_AddQuad(QuadArray2D quadArray,
		float x0, float y0,float u0, float v0,
		float x1, float y1,float u1, float v1,
		float color[])
{
	float v[Vertex2D_Length];
	int firstIndex=quadArray->nVertex;

	// Set the color
	v[4]=color[0];
	v[5]=color[1];
	v[6]=color[2];
	v[7]=color[3];

	// Add the vertexes
	v[0]=x0; v[1]=y0; v[2]=u0; v[3]=v0; QuadArray2D_AddVertex(quadArray,v);
	v[0]=x1; v[1]=y0; v[2]=u1; v[3]=v0; QuadArray2D_AddVertex(quadArray,v);
	v[0]=x1; v[1]=y1; v[2]=u1; v[3]=v1; QuadArray2D_AddVertex(quadArray,v);
	v[0]=x0; v[1]=y1; v[2]=u0; v[3]=v1; QuadArray2D_AddVertex(quadArray,v);
}

