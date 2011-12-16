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
Anim Anim_LoadAnim(char *fichero,int frames,float fps);


/////////////////////////////
// Anim_GetTime
//
//
int Anim_GetTime(Anim anim);


/////////////////////////////
// Anim_SetOffset
// Anim_GetOffset
//
//
void Anim_SetOffset(Anim anim,int  x,int  y);
void Anim_GetOffset(Anim anim,int *x,int *y);


/////////////////////////////
// Anim_Draw
//
//
void Anim_Draw(Anim anim,int time_ms,int x,int y);


////////////////////////////////////////////////
// AnimPlay //
//////////////
//
typedef struct {
	Anim anim;
	DrawImg img;
	int time_ms;
} AnimPlay;


/////////////////////////////
// AnimPlay_Copy
//
//
void AnimPlay_Copy(AnimPlay *ad,AnimPlay *ao);


/////////////////////////////
// AnimPlay_SetImg
// AnimPlay_SetAnim
//
//
void AnimPlay_SetImg(AnimPlay *ap,DrawImg img);
void AnimPlay_SetAnim(AnimPlay *ap,Anim ani);


/////////////////////////////
// AnimPlay_Draw
//
//
void AnimPlay_Draw(AnimPlay *ani,int x,int y);


/////////////////////////////
// AnimPlay_IncTime
//
//
void AnimPlay_IncTime(AnimPlay *ani,int t);


#endif
