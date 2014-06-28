// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>
#include <SDL/SDL.h>

#include "Time.h"
#include "Util.h"
#include "Draw.h"
#include "Input.h"
#include "Audio.h"
#include "Anim.h"
#include "Entity.h"

#include "GameLib.h"

// Globals
int _running;
Entity *_entity=NULL;
int *_entity_flag=NULL;
int _n_entities=0;
int _n_entities_res=0;
int _entities_lock=0;
int _entities_compactate=0;
void (*_gameproc)()=NULL;
void (*_gamepostproc)()=NULL;
void (*_gamepredraw)(float f)=NULL;
void (*_gamedraw)(float f)=NULL;
int _ft;
int _game_size[2];
int _game_pos0[2];
int _game_pos1[2];

long long t_proc;
long long t_col;
long long t_over;
long long t_postproc;
long long t_draw;
int fproc_count;
int fdraw_count;

int gamelib_debug=0;


/////////////////////////////
// GameLib_Init
//
// Initializes the game.
int GameLib_Init(int w,int h,char *title,int pfps,int fps){
	if(!Draw_Init(w,h,title,pfps,fps)){
		return(0);
	}
	if(!Input_Init()){
		return(0);
	}
	Audio_Init();

	_game_size[0]=w;
	_game_size[1]=h;
	_game_pos0[0]=0;
	_game_pos0[1]=0;
	_game_pos1[0]=0;
	_game_pos1[1]=0;

	_ft=1000/fps;

	return(1);
}


/////////////////////////////
// GameLib_AddEntity
//
// Adds an entity to the game.
void GameLib_AddEntity(Entity e){
	if(_n_entities>=_n_entities_res){
		Entity *entity_aux;
		int *entity_flag_aux;
		int i;

		// Grow the array
		if(_n_entities_res==0)
			_n_entities_res=32;
		else
			_n_entities_res*=2;
		entity_aux=malloc(sizeof(Entity)*_n_entities_res);
		entity_flag_aux=malloc(sizeof(int)*_n_entities_res);
		for(i=0;i<_n_entities;i++){
			entity_aux[i]=_entity[i];
			entity_flag_aux[i]=_entity_flag[i];
		}
		if(_entity){
			free(_entity);
			free(_entity_flag);
		}
		_entity=entity_aux;
		_entity_flag=entity_flag_aux;
	}

	// Add the entity
	_entity[_n_entities]=e;
	_entity_flag[_n_entities]=1;
	_n_entities++;

	// Mark for light update
	Entity_MarkUpdateLight(e,_entity,_n_entities);
}


/////////////////////////////
// GameLib_UnrefEntity
//
// removes the reference to the entity.
int GameLib_UnrefEntity(Entity e){
	int i;
	for(i=0;i<_n_entities;i++){
		if(e==_entity[i]){
			// Mark or unref
			if(_entities_lock){
				_entity_flag[i]=-2;
			}else{
				_entity[i]=NULL;
				_entity_flag[i]=0;
			}
			_entities_compactate=1;

			// Mark for light update
			Entity_MarkUpdateLight(e,_entity,_n_entities);
			return(i);
		}
	}
	return(-1);
}


/////////////////////////////
// GameLib_DelEntity
//
// Adds an entity to the game.
int GameLib_DelEntity(Entity e){
	int i;
	if((i=GameLib_UnrefEntity(e))==-1){
		return(0);
	}
	if(_entities_lock){
		// Delete latter
		_entity[i]=e;
		_entity_flag[i]=-1;
	}else{
		// Delete now
		Entity_Destroy(e);
	}
	return(1);
}


/////////////////////////////
// GameLib_Compactate
//
//
void GameLib_Compactate(){
	int i,j;
	j=0;
	if(!_entities_compactate)
		return;
	for(i=0;i<_n_entities;i++){
		if(!_entity[i] || _entity_flag[i]==-2)
			continue;
		if(_entity_flag[i]==-1){
			Entity_Destroy(_entity[i]);
			continue;
		}
		if(i>j){
			_entity[j]=_entity[i];
			_entity_flag[j]=_entity_flag[i];
		}
		j++;
	}
	_n_entities=j;
	_entities_compactate=0;
	_entities_lock=0;
}


/////////////////////////////
// GameLib_ProcLoop
//
// Process the loop.
int GameLib_ProcLoop(){
	int i,j;
	int repeat,count;
	long long time;

	// Step the gamePosition
	_game_pos0[0]=_game_pos1[0];
	_game_pos0[0]=_game_pos1[0];

	// Process
	time=Time_GetTime();
	GameLib_Compactate();_entities_lock=1;
	if(_gameproc){
		_gameproc();
	}
	for(i=0;i<_n_entities;i++){
		if(!_entity[i])
			continue;
		Entity_Process(_entity[i],_ft);
	}
	GameLib_Compactate();
	t_proc+=Time_GetTime()-time;

	// Colisions between entities
	time=Time_GetTime();
	GameLib_Compactate();_entities_lock=1;
	count=0;
	do{
		repeat=0;
		CollisionInfo collInfo=NULL;
		for(i=0;i<_n_entities;i++){
			if(!(_entity[i]->flags&EntityFlag_Collision) || _entity[i]->mass<0.0f)
				continue;
			if(_entity[i]->vel[0]<=0.0f && _entity[i]->vel[0]>=-0.0f &&
				_entity[i]->vel[1]<=0.0f && _entity[i]->vel[1]>=-0.0f)
			{
				continue;
			}
			for(j=0;j<_n_entities;j++){
				if(!(_entity[j]->flags&EntityFlag_Collision) ||
					!Entity_BBoxIntersect(_entity[i],_entity[j]) ||
					CollisionInfo_CheckRepetition(collInfo,_entity[i],_entity[j]))
				{
					continue;
				}
				Entity_CheckCollision(_entity[i],_entity[j],&collInfo);
			}
		}
		if(Entity_CollisionInfoResponse(collInfo)){
			repeat=1;
		}
		CollisionInfo_Destroy(&collInfo);
		count++;
	}while(repeat && count<50);

	// Stop remaining collisions
	if(count==10){
		for(i=0;i<_n_entities;i++){
			if(!(_entity[i]->flags&EntityFlag_Collision) || _entity[i]->mass<0.0f)
				continue;
			for(j=0;j<_n_entities;j++){
				if(!(_entity[j]->flags&EntityFlag_Collision) || i==j)
					continue;
				if(Entity_CheckCollision(_entity[i],_entity[j],NULL)){
					vec2_set(_entity[i]->vel,0,0);
					Entity_CalcBBox(_entity[i]);
					vec2_set(_entity[j]->vel,0,0);
					Entity_CalcBBox(_entity[j]);
				}
			}
		}
	}
	GameLib_Compactate();
	t_col+=Time_GetTime()-time;

	// Process Overlaps
	time=Time_GetTime();
	GameLib_Compactate();_entities_lock=1;
	for(i=0;i<_n_entities;i++){
		if(!(_entity[i]->flags&EntityFlag_Overlap) || _entity[i]->mass<0.0f)
			continue;
		for(j=0;j<_n_entities;j++){
			if(!(_entity[j]->flags&EntityFlag_Overlap) || i==j)
				continue;
			Entity_Overlaps(_entity[i],_entity[j]);
		}
	}
	GameLib_Compactate();
	t_over+=Time_GetTime()-time;

	// Sort
	int n,n2,swap;
	n=_n_entities;
	do{
		n2=0;
		for(i=1;i<n;i++){
			swap=0;
			if(_entity[i-1]->zorder > _entity[i]->zorder){
				// Lower level
				swap=1;
			}else
			if(_entity[i-1]->zorder < _entity[i]->zorder){
				// Upper level
			}else{
				// Same level
				if(_entity[i-1]->pos[1] > _entity[i]->pos[1]){
					swap=1;
				}
			}
			if(swap){
				Entity ent;
				ent=_entity[i];
				_entity[i]=_entity[i-1];
				_entity[i-1]=ent;
				n2=i;
			}
		}
		n=n2;
	}while(n>0);

	// PostProcess
	time=Time_GetTime();
	GameLib_Compactate();_entities_lock=1;
	for(i=0;i<_n_entities;i++){
		Entity_PostProcess(_entity[i],_ft);
		if(_entity[i]->flags&EntityFlag_UpdatedPos){
			Entity_MarkUpdateLight(_entity[i],_entity,_n_entities);
		}
	}
	if(_gamepostproc){
		_gamepostproc();
	}
	GameLib_Compactate();
	t_postproc+=Time_GetTime()-time;

	fproc_count++;

	return(_running);
}


/////////////////////////////
// GameLib_DrawLoop
//
//
void GameLib_DrawLoop(float f){
	long long time;
	int i;
	int game_pos[2];

	game_pos[0]=_game_pos0[0]+f*(_game_pos1[0]-_game_pos0[0]);
	game_pos[1]=_game_pos0[1]+f*(_game_pos1[1]-_game_pos0[1]);

	time=Time_GetTime();

	// Predibujado
	if(_gamepredraw){
		_gamepredraw(f);
	}else{
		// Limpiar pantalla
		Draw_Clean(0,0,0);
	}

	// Draw entities
	GameLib_Compactate();_entities_lock=1;
	for(i=0;i<_n_entities;i++){
		Entity e=_entity[i];

		// Check visivility
		if(!Entity_IsVisible(e,
			game_pos[0],game_pos[1],
			_game_size[0],_game_size[1]))
		{
			continue;
		}

		// Update ilumination of this entity
		if(e->flags&EntityFlag_UpdateLight){
			Entity_Iluminate(e,_entity,_n_entities);
			e->flags&=~EntityFlag_UpdateLight;
		}

		Entity_Draw(e,-game_pos[0],-game_pos[1],f);
	}
	Draw_SetColor(1,1,1,1);
	if(_gamedraw){
		_gamedraw(f);
	}
	GameLib_Compactate();

	t_draw+=Time_GetTime()-time;

	fdraw_count++;
}


/////////////////////////////
// GameLib_Loop
//
// Loops the game.
void GameLib_Loop(
	void (*gameproc)(),
	void (*gamepostproc)(),
	void (*gamepredraw)(float f),
	void (*gamedraw)(float f))
{
	_running=1;

	_gameproc=gameproc;
	_gamepostproc=gamepostproc;
	_gamepredraw=gamepredraw;
	_gamedraw=gamedraw;
	t_proc=0;
	t_col=0;
	t_over=0;
	t_postproc=0;
	t_draw=0;
	fproc_count=0;
	fdraw_count=0;
	Draw_Loop(GameLib_ProcLoop,GameLib_DrawLoop);

	if (gamelib_debug) {
		printf("Profiling:::::::::\n");
		printf("t_proc.....:%6lld\n",t_proc/fproc_count);
		printf("t_col......:%6lld\n",t_col/fproc_count);
		printf("t_over.....:%6lld\n",t_over/fproc_count);
		printf("t_postproc.:%6lld\n",t_postproc/fproc_count);
		printf("t_draw.....:%6lld\n",t_draw/fdraw_count);
	}
}


/////////////////////////////
// GameLib_BreakLoop
//
// Breaks the game loop.
void GameLib_BreakLoop(){
	_running=0;
}


/////////////////////////////
// GameLib_GetPos
// GameLib_SetPos
// GameLib_UpdatePos
// GameLib_SetPos
//
//
void GameLib_GetPos(int pos[2]){
	pos[0]=_game_pos1[0];
	pos[1]=_game_pos1[1];
}
void GameLib_SetPos(int pos[2]){
	_game_pos0[0]=pos[0];
	_game_pos0[1]=pos[1];
	_game_pos1[0]=pos[0];
	_game_pos1[1]=pos[1];
}
void GameLib_UpdatePos(int pos[2]){
	_game_pos1[0]=pos[0];
	_game_pos1[1]=pos[1];
}
void GameLib_GetSize(int size[2]){
	size[0]=_game_size[0];
	size[1]=_game_size[1];
}




/////////////////////////////
// GameLib_MoveToPos
// GameLib_MoveToPosH
// GameLib_MoveToPosV
//
//
void GameLib_MoveToPos(vec2 pos,float f){
	GameLib_MoveToPosH(pos,f);
	GameLib_MoveToPosV(pos,f);
}
void GameLib_MoveToPosH(vec2 pos,float f){
	_game_pos1[0]=_game_pos1[0]+(pos[0]-(_game_pos1[0]+(_game_size[0]/2.0f)))*f;
}
void GameLib_MoveToPosV(vec2 pos,float f){
	_game_pos1[1]=_game_pos1[1]+(pos[1]-(_game_pos1[1]+(_game_size[1]/2.0f)))*f;
}




/////////////////////////////
// GameLib_ForEachEn
//
// Deletes every entity.
void GameLib_DelEnts(){
	int i;

	for(i=0;i<_n_entities;i++){
		if(!_entity[i])
			continue;
		Entity_Destroy(_entity[i]);
	}
	_n_entities=0;
}


/////////////////////////////
// GameLib_ForEachEn
//
// Iterates every entity.
void GameLib_ForEachEnt(int (*func)(Entity ent)){
	int i;
	for(i=0;i<_n_entities;i++){
		if(!_entity[i])
			continue;
		if(!func(_entity[i])){
			break;
		}
	}
}


/////////////////////////////
// GameLib_SearchEnt
//
// Searches throught the entities.
Entity GameLib_SearchEnt(int (*func)(Entity ent,void *d),void *d){
	int i;
	Entity ent=NULL;
	for(i=0;i<_n_entities;i++){
		if(!_entity[i])
			continue;
		if(func(_entity[i],d)){
			ent=_entity[i];
			break;
		}
	}
	return ent;
}


/////////////////////////////
// GameLib_PlaySound
//
//
void GameLib_PlaySound(AudioSnd snd,int x,int y){
	float vleft,vright,dx,dy;
	int r,cx,cy,off;

	// Get the screen context
	cx=_game_pos1[0]+_game_size[0]/2;
	cy=_game_pos1[1]+_game_size[1]/2;
	if(_game_size[0]>_game_size[1]){
		r=_game_size[0]/2;
	}else{
		r=_game_size[1]/2;
	}
	r=r*1.2f;
	off=r/10.0f;

	// Calculate volumes
	dx=x-(cx+off);
	dy=y-(cy);
	vright=1.0f-(sqrtf(dx*dx+dy*dy)/(float)r);
	dx=x-(cx-off);
	dy=y-(cy);
	vleft=1.0f-(sqrtf(dx*dx+dy*dy)/(float)r);

	// Clamp to 0
	if(vleft<0.0f)
		vleft=0.0f;
	if(vright<0.0f)
		vright=0.0f;
	if(vleft<=0.0f && vright<=0.0f){
		return;
	}

	// PLAY!
	Audio_PlaySound(snd,vleft,vright);
}


/////////////////////////////
// GameLib_Iluminate
//
//
void GameLib_Iluminate(){
	int i;

	for(i=0;i<_n_entities;i++){
		Entity_Iluminate(_entity[i],_entity,_n_entities);
	}
}


/////////////////////////////
// GameLib_EntitySetLight
//
//
void GameLib_EntitySetLight(Entity e,float r,float g,float b,float rad){
	if(e->flags&EntityFlag_Light){
		Entity_MarkUpdateLight(e,_entity,_n_entities);
		Entity_SetLight(e,r,g,b,rad);
		Entity_MarkUpdateLight(e,_entity,_n_entities);
	}else{
		Entity_SetLight(e,r,g,b,rad);
		e->flags|=EntityFlag_UpdateLight;
	}
}


/////////////////////////////
// GameLib_UpdateIlumination
//
//
void GameLib_UpdateIlumination(){
	int i;

	for(i=0;i<_n_entities;i++){
		if(_entity[i]->flags&EntityFlag_UpdateLight){
			Entity_Iluminate(_entity[i],_entity,_n_entities);
			_entity[i]->flags&=~EntityFlag_UpdateLight;
		}
	}
}


