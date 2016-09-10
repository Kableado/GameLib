// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#ifndef _ANIM_H_
#define _ANIM_H_

#include "Draw.h"

////////////////////////////////////////////////
// Anim //
//////////
//
typedef void *Anim;

/////////////////////////////
// Anim_LoadAnim
//
//
Anim Anim_LoadAnim(char *fichero, int width, int frames, float fps);

/////////////////////////////
// Anim_GetTime
//
//
int Anim_GetTime(Anim anim);

/////////////////////////////
// Anim_GetSize
//
// Gets the animation size.
void Anim_GetSize(Anim anim, int *w, int *h);

/////////////////////////////
// Anim_SetOffset
// Anim_GetOffset
//
//
void Anim_SetOffset(Anim anim, int x, int y);
void Anim_GetOffset(Anim anim, int *x, int *y);

/////////////////////////////
// Anim_SetFlip
// Draw_GetFlip
//
//
void Anim_SetFlip(Anim anim, int flip);
int Anim_GetFlip(Anim anim);

/////////////////////////////
// Anim_Draw
//
//
void Anim_Draw(Anim anim, int time_ms, int x, int y);

////////////////////////////////////////////////
// AnimPlay //
//////////////
//
typedef struct {
	Anim anim;
	int pause;
	int time_ms;

	DrawImg img;

	DrawImg imgPart;
	int w, h, i, j;

} AnimPlay;

/////////////////////////////
// AnimPlay_Copy
//
//
void AnimPlay_Copy(AnimPlay *ad, AnimPlay *ao);

/////////////////////////////
// AnimPlay_SetImg
// AnimPlay_SetAnim
// AnimPlay_SetImgPart
//
//
void AnimPlay_SetImg(AnimPlay *ap, DrawImg img);
void AnimPlay_SetAnim(AnimPlay *ap, Anim ani);
void AnimPlay_SetImgPart(AnimPlay *ap, DrawImg img, int w, int h, int i, int j);

/////////////////////////////
// AnimPlay_Draw
//
//
void AnimPlay_Draw(AnimPlay *ani, int x, int y);

/////////////////////////////
// AnimPlay_GetOffset
// AnimPlay_GetSize
//
//
void AnimPlay_GetOffset(AnimPlay *ani, int *x, int *y);
void AnimPlay_GetSize(AnimPlay *ani, int *w, int *h);

/////////////////////////////
// AnimPlay_SetPause
//
//
void AnimPlay_SetPause(AnimPlay *ani, int p);

/////////////////////////////
// AnimPlay_IncTime
//
//
void AnimPlay_IncTime(AnimPlay *ani, int t);

#endif
