// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

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
Entity **_entity=NULL;
int *_entity_flag=NULL;
int _n_entities=0;
int _n_entities_res=0;
int _entities_lock=0;
int _entities_compactate=0;
void (*_gameproc)()=NULL;
void (*_gamepostproc)()=NULL;
int _ft;
int _game_size[2];
int _game_pos[2];


/////////////////////////////
// GameLib_Init
//
// Initializes the game.
int GameLib_Init(int w,int h,char *title,int fps){
	if(!Draw_Init(w,h,title,fps)){
		return(0);
	}
	if(!Input_Init()){
		return(0);
	}
	Audio_Init();

	_game_size[0]=w;
	_game_size[1]=h;
	_game_pos[0]=0;
	_game_pos[1]=0;

	_ft=1000/fps;

	return(1);
}


/////////////////////////////
// GameLib_AddEntity
//
// Adds an entity to the game.
void GameLib_AddEntity(Entity *e){
	if(_n_entities>=_n_entities_res){
		Entity **entity_aux;
		int *entity_flag_aux;
		int i;

		// Grow the array
		if(_n_entities_res==0)
			_n_entities_res=32;
		else
			_n_entities_res*=2;
		entity_aux=malloc(sizeof(Entity *)*_n_entities_res);
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
}


/////////////////////////////
// GameLib_UnrefEntity
//
// removes the reference to the entity.
int GameLib_UnrefEntity(Entity *e){
	int i;
	for(i=0;i<_n_entities;i++){
		if(e==_entity[i]){
			if(_entities_lock){
				_entity_flag[i]=-2;
			}else{
				_entity[i]=NULL;
				_entity_flag[i]=0;
			}
			_entities_compactate=1;
			return(i);
		}
	}
	return(-1);
}


/////////////////////////////
// GameLib_DelEntity
//
// Adds an entity to the game.
int GameLib_DelEntity(Entity *e){
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
long long t_proc;
long long t_col;
long long t_over;
long long t_postproc;
int f_count;
int GameLib_ProcLoop(){
	int i,j;
	int repeat,count;
	long long time;


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
		for(i=0;i<_n_entities-1;i++){
			if(!(_entity[i]->flags&EntityFlag_Collision))
				continue;
			for(j=i+1;j<_n_entities;j++){
				if(!(_entity[j]->flags&EntityFlag_Collision))
					continue;
				if(Entity_Collide(_entity[i],_entity[j])){
					repeat=1;
				}
			}
		}
		count++;
	}while(repeat && count<10);
	// Stop remaining collisions
	if(count==10){
		for(i=0;i<_n_entities-1;i++){
			if(!(_entity[i]->flags&EntityFlag_Collision))
				continue;
			for(j=i+1;j<_n_entities;j++){
				if(!(_entity[j]->flags&EntityFlag_Collision))
					continue;
				if(Entity_Collide(_entity[i],_entity[j])){
					vec2_set(_entity[i]->vel,0,0);
					vec2_set(_entity[j]->vel,0,0);
				}
			}
		}
	}
	GameLib_Compactate();
	t_col+=Time_GetTime()-time;

	// Process Overlaps
	time=Time_GetTime();
	GameLib_Compactate();_entities_lock=1;
	for(i=0;i<_n_entities-1;i++){
		if(!(_entity[i]->flags&EntityFlag_Overlap))
			continue;
		for(j=i+1;j<_n_entities;j++){
			if(!(_entity[j]->flags&EntityFlag_Overlap))
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
				Entity *ent;
				ent=_entity[i];
				_entity[i]=_entity[i-1];
				_entity[i-1]=ent;
				n2=i;
			}
		}
		n=n2;
	}while(n>0);


	// PostProcess and draw entities
	time=Time_GetTime();
	GameLib_Compactate();_entities_lock=1;
	for(i=0;i<_n_entities;i++){
		Entity *e;
		Entity_PostProcess(_entity[i],_ft);

		// FIXME: This is a hack
		e=_entity[i];
		if(e->pos[0]<(_game_pos[0]-128))
			continue;
		if(e->pos[0]>(_game_pos[0]+_game_size[0]+128))
			continue;
		if(e->pos[1]<(_game_pos[1]-128))
			continue;
		if(e->pos[1]>(_game_pos[1]+_game_size[1]+128))
			continue;

		Entity_Draw(e,-_game_pos[0],-_game_pos[1]);
	}
	if(_gamepostproc){
		_gamepostproc();
	}
	GameLib_Compactate();
	t_postproc+=Time_GetTime()-time;

	f_count++;

	return(_running);
}


/////////////////////////////
// GameLib_Loop
//
// Loops the game.
void GameLib_Loop(
	void (*gameproc)(),
	void (*gamepostproc)())
{
	_running=1;

	_gameproc=gameproc;
	_gamepostproc=gamepostproc;
	t_proc=0;
	t_col=0;
	t_over=0;
	t_postproc=0;
	f_count=0;
	Draw_Loop(GameLib_ProcLoop);

	printf("Profiling::::::::::::\n");
	printf("t_proc........:%6lld\n",t_proc/f_count);
	printf("t_col.........:%6lld\n",t_col/f_count);
	printf("t_over........:%6lld\n",t_over/f_count);
	printf("t_postprocdraw:%6lld\n",t_postproc/f_count);
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
// GameLib_SetPos
//
//
void GameLib_GetPos(int pos[2]){
	pos[0]=_game_pos[0];
	pos[1]=_game_pos[1];
}
void GameLib_SetPos(int pos[2]){
	_game_pos[0]=pos[0];
	_game_pos[1]=pos[1];
}
void GameLib_GetSize(int size[2]){
	size[0]=_game_size[0];
	size[1]=_game_size[1];
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
void GameLib_ForEachEnt(int (*func)(Entity *ent)){
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
// GameLib_PlaySound
//
//
void GameLib_PlaySound(AudioSnd snd,int x,int y){
	float vleft,vright,vcen;
	int r,cx,cy,off;

	// Get the screen context
	cx=_game_pos[0]+_game_size[0]/2;
	cy=_game_pos[1]+_game_size[1]/2;
	if(_game_size[0]>_game_size[1]){
		r=_game_size[0]/2;
	}else{
		r=_game_size[1]/2;
	}
	r=r*1.2f;
	off=r/10.0f;

	// Calculate volumes
	vcen=1.0f-(abs(y-cy)/(float)r);
	vright=1.0f-(abs(x-(cx+off))/(float)r);
	vleft=1.0f-(abs(x-(cx-off))/(float)r);
	vright*=vcen;
	vleft*=vcen;

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