// Copyright (C) 2013-2023 Valeriano Alfonso Rodriguez (Kableado)

#include <stdlib.h>
#include <string.h>

#include "QuadArray2D.h"

QuadArray2D QuadArray2D_Create(int resVertex) {
	QuadArray2D quadArray = NULL;

	quadArray = malloc(sizeof(TQuadArray2D));

	quadArray->vertexData = malloc(sizeof(float) * Vertex2D_Length * resVertex);
	quadArray->nVertex    = 0;
	quadArray->resVertex  = resVertex;

	return quadArray;
}

void QuadArray2D_Destroy(QuadArray2D *quadArray) {
	if (!quadArray) {
		return;
	}
	if (!quadArray[0]) {
		return;
	}

	free(quadArray[0]->vertexData);
	free(quadArray[0]);
	quadArray[0] = NULL;
}

void QuadArray2D_Clean(QuadArray2D quadArray) { quadArray->nVertex = 0; }

void QuadArray2D_AddVertex(QuadArray2D quadArray, float v[]) {
	if (quadArray->resVertex <= quadArray->nVertex) {
		// Grow vertexData
		quadArray->resVertex *= 2;
		float *newVertexData = malloc(sizeof(float) * Vertex2D_Length * quadArray->resVertex);
		memcpy(newVertexData, quadArray->vertexData, sizeof(float) * Vertex2D_Length * quadArray->nVertex);
		free(quadArray->vertexData);
		quadArray->vertexData = newVertexData;
	}

	// Add the vertex
	memcpy(quadArray->vertexData + (Vertex2D_Length * quadArray->nVertex), v, sizeof(float) * Vertex2D_Length);
	quadArray->nVertex++;
}

void QuadArray2D_AddQuad(
	QuadArray2D quadArray, float x0, float y0, float u0, float v0, float x1, float y1, float u1, float v1,
	const float color[]) {
	float v[Vertex2D_Length];

	// Set the color
	v[4] = color[0];
	v[5] = color[1];
	v[6] = color[2];
	v[7] = color[3];

	// Add the vertexes
	v[0] = x0;
	v[1] = y0;
	v[2] = u0;
	v[3] = v0;
	QuadArray2D_AddVertex(quadArray, v);
	v[0] = x1;
	v[1] = y0;
	v[2] = u1;
	v[3] = v0;
	QuadArray2D_AddVertex(quadArray, v);
	v[0] = x1;
	v[1] = y1;
	v[2] = u1;
	v[3] = v1;
	QuadArray2D_AddVertex(quadArray, v);

	v[0] = x1;
	v[1] = y1;
	v[2] = u1;
	v[3] = v1;
	QuadArray2D_AddVertex(quadArray, v);
	v[0] = x0;
	v[1] = y1;
	v[2] = u0;
	v[3] = v1;
	QuadArray2D_AddVertex(quadArray, v);
	v[0] = x0;
	v[1] = y0;
	v[2] = u0;
	v[3] = v0;
	QuadArray2D_AddVertex(quadArray, v);
}

void QuadArray2D_AddArbitraryQuad(
	QuadArray2D quadArray,
	float x_tl, float y_tl, float u_tl, float v_tl, // Top-Left vertex
	float x_tr, float y_tr, float u_tr, float v_tr, // Top-Right vertex
	float x_br, float y_br, float u_br, float v_br, // Bottom-Right vertex
	float x_bl, float y_bl, float u_bl, float v_bl, // Bottom-Left vertex
	const float color[]) {

	float v[Vertex2D_Length];

	// Set the common color for all vertices
	v[4] = color[0];
	v[5] = color[1];
	v[6] = color[2];
	v[7] = color[3];

	// Triangle 1: TL, TR, BR
	// TL
	v[0] = x_tl; v[1] = y_tl; v[2] = u_tl; v[3] = v_tl;
	QuadArray2D_AddVertex(quadArray, v);
	// TR
	v[0] = x_tr; v[1] = y_tr; v[2] = u_tr; v[3] = v_tr;
	QuadArray2D_AddVertex(quadArray, v);
	// BR
	v[0] = x_br; v[1] = y_br; v[2] = u_br; v[3] = v_br;
	QuadArray2D_AddVertex(quadArray, v);

	// Triangle 2: BR, BL, TL
	// BR
	v[0] = x_br; v[1] = y_br; v[2] = u_br; v[3] = v_br;
	QuadArray2D_AddVertex(quadArray, v);
	// BL
	v[0] = x_bl; v[1] = y_bl; v[2] = u_bl; v[3] = v_bl;
	QuadArray2D_AddVertex(quadArray, v);
	// TL
	v[0] = x_tl; v[1] = y_tl; v[2] = u_tl; v[3] = v_tl;
	QuadArray2D_AddVertex(quadArray, v);
}
