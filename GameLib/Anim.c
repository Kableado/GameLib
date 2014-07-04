// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <stdio.h>
#include <stdlib.h>

#include "Draw.h"
#include "Anim.h"


////////////////////////////////////////////////
// Animation //
///////////////
//
typedef struct {
	DrawImg img;
	int w;
	float fps;
	int frames;
	int ftime;
	int time;
} Animation;


/////////////////////////////
// Anim_LoadAnim
//
//
Anim Anim_LoadAnim(char *fichero,int width,int frames,float fps){
	DrawImg img;
	Animation *anim;
	int w,h;

	img=Draw_LoadImage(fichero);
	if(!img){
		return(NULL);
	}
	Draw_GetSize(img,&w,&h);

	// Create the animation container
	anim=malloc(sizeof(Animation));
	anim->img=img;
	anim->w=width;
	if(width<=0){
		anim->w=w/frames;
	}
	anim->fps=fps;
	anim->frames=frames;
	anim->ftime=1000/fps;
	anim->time=anim->ftime*frames;

	return((Anim)anim);
}


/////////////////////////////
// Anim_GetTime
//
//
int Anim_GetTime(Anim a){
	Animation *anim=a;

	return(anim->time);
}


/////////////////////////////
// Anim_GetSize
//
// Gets the animation size.
void Anim_GetSize(Anim a,int *w,int *h){
	Animation *anim=a;
	int waux;

	*w=anim->w;
	Draw_GetSize(anim->img,&waux,h);
}


/////////////////////////////
// Anim_SetOffset
// Anim_GetOffset
//
//
void Anim_SetOffset(Anim a,int  x,int  y){
	Animation *anim=a;

	Draw_SetOffset(anim->img,x,y);
}
void Anim_GetOffset(Anim a,int *x,int *y){
	Animation *anim=a;

	Draw_GetOffset(anim->img,x,y);
}


/////////////////////////////
// Anim_Draw
//
//
void Anim_Draw(Anim a,int time_ms,int x,int y){
	Animation *anim=a;
	int frame;

	frame=(time_ms%anim->time)/anim->ftime;
	Draw_DrawImgPart(anim->img,x,y,anim->w,frame);
}


/////////////////////////////
// AnimPlay_Copy
//
//
void AnimPlay_Copy(AnimPlay *ad,AnimPlay *ao){
	ad->img=ao->img;
	ad->anim=ao->anim;
	ad->time_ms=ao->time_ms;
}


/////////////////////////////
// AnimPlay_SetImg
// AnimPlay_SetAnim
//
//
void AnimPlay_SetImg(AnimPlay *ap,DrawImg img){
	ap->anim=NULL;
	ap->img=img;
	ap->time_ms=0;
}
void AnimPlay_SetAnim(AnimPlay *ap,Anim ani){
	ap->pause=0;
	if(ap->anim==ani){
		return;
	}
	ap->anim=ani;
	ap->img=NULL;
	ap->time_ms=0;
}


/////////////////////////////
// AnimPlay_Draw
//
//
void AnimPlay_Draw(AnimPlay *ani,int x,int y){
	if(ani->anim){
		Anim_Draw(ani->anim,ani->time_ms,x,y);
	}else
	if(ani->img){
		Draw_DrawImg(ani->img,x,y);
	}
}


/////////////////////////////
// AnimPlay_GetOffset
// AnimPlay_GetSize
//
//
void AnimPlay_GetOffset(AnimPlay *ani,int *x,int *y){
	if(ani->anim){
		Anim_GetOffset(ani->anim,x,y);
	}else
	if(ani->img){
		Draw_GetOffset(ani->img,x,y);
	}
}
void AnimPlay_GetSize(AnimPlay *ani,int *w,int *h){
	if(ani->anim){
		Anim_GetSize(ani->anim,w,h);
	}else
	if(ani->img){
		Draw_GetSize(ani->img,w,h);
	}
}



/////////////////////////////
// AnimPlay_SetPause
//
//
void AnimPlay_SetPause(AnimPlay *ani,int p){
	ani->pause=p;
}


/////////////////////////////
// AnimPlay_IncTime
//
//
void AnimPlay_IncTime(AnimPlay *ani,int t){
	if(ani->anim){
		if(!ani->pause){
			ani->time_ms+=t;
		}
	}
}

