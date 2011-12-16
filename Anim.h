#ifndef _ANIM_H_
#define _ANIM_H_

#include "Draw.h"

typedef void *Anim;


Anim Anim_LoadAnim(char *fichero,int frames,int fps);

int Anim_GetTime(Anim anim);

void Anim_SetOffset(Anim anim,int  x,int  y);
void Anim_GetOffset(Anim anim,int *x,int *y);

void Anim_Draw(Anim anim,int time_ms,int x,int y);

typedef struct {
	Anim anim;
	DrawImg img;
	int time_ms;
} AnimPlay;

void AnimPlay_Copy(AnimPlay *ad,AnimPlay *ao);

void AnimPlay_SetImg(AnimPlay *ap,DrawImg img);
void AnimPlay_SetAnim(AnimPlay *ap,Anim ani);

void AnimPlay_Draw(AnimPlay *ani,int x,int y);

void AnimPlay_IncTime(AnimPlay *ani,int t);

#endif
