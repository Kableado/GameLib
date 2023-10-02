// Copyright (C) 2013-2023 Valeriano Alfonso Rodriguez (Kableado)

#ifndef QuadArray2D_H
#define QuadArray2D_H

// Vertex2D -> (x,y) (u,v) (r,g,b,a)
#define Vertex2D_Length 8

////////////////////////////////////////////////
// QuadArray2D
//
typedef struct TQuadArray2D TQuadArray2D, *QuadArray2D;
struct TQuadArray2D {
	float *vertexData;
	int nVertex;
	int resVertex;
};

QuadArray2D QuadArray2D_Create(int resVertex);

void QuadArray2D_Destroy(QuadArray2D *quadArray);

void QuadArray2D_Clean(QuadArray2D quadArray);

void QuadArray2D_AddVertex(QuadArray2D quadArray, float v[]);

void QuadArray2D_AddQuad(
	QuadArray2D quadArray, float x0, float y0, float u0, float v0, float x1, float y1, float u1, float v1,
	const float color[]);

#endif
