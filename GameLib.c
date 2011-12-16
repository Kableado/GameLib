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
int _n_entities=0;
int _n_entities_res=0;
void (*_gameproc)()=NULL;
void (*_gamepostproc)()=NULL;
int _ft;

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
		int i;

		// Grow the array
		if(_n_entities_res==0)
			_n_entities_res=32;
		else
			_n_entities_res*=2;
		entity_aux=malloc(sizeof(Entity *)*_n_entities_res);
		for(i=0;i<_n_entities;i++)
			entity_aux[i]=_entity[i];
		if(_entity)
			free(_entity);
		_entity=entity_aux;
	}

	// Add the entity
	_entity[_n_entities]=e;
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
			_entity[i]=NULL;
			return(1);
		}
	}
	return(0);
}


/////////////////////////////
// GameLib_DelEntity
//
// Adds an entity to the game.
int GameLib_DelEntity(Entity *e){
	if(!GameLib_UnrefEntity(e)){
		return(0);
	}
	Entity_Destroy(e);
	return(1);
}


/////////////////////////////
// GameLib_ProcLoop
//
// Process the loop.
int GameLib_ProcLoop(){
	int i,j;
	int repeat,count;

	// Launch the method
	if(_gameproc){
		_gameproc();
	}

	// Process entities
	vec2 grav;
	vec2_set(grav,0,1);
	for(i=0;i<_n_entities;i++){
		if(!_entity[i])
			continue;
		Entity_Process(_entity[i],_ft);
/*
		if(_entity[i]->mass>0.0f){
			vec2_plus(_entity[i]->vel,_entity[i]->vel,grav);
		}
*/
	}

	// Process colisions between entities
	count=0;
	do{
		repeat=0;
		for(i=0;i<_n_entities-1;i++){
			for(j=i+1;j<_n_entities;j++){
				if(!_entity[i] || !_entity[j])
					continue;
				if(Entity_Collide(_entity[i],_entity[j])){
					repeat=1;
				}
			}
		}
		count++;
	}while(repeat && count<20);

	// Stop remaining collisions
	for(i=0;i<_n_entities-1;i++){
		for(j=i+1;j<_n_entities;j++){
			if(!_entity[i] || !_entity[j])
				continue;
			if(Entity_Collide(_entity[i],_entity[j])){
				vec2_set(_entity[i]->vel,0,0);
				vec2_set(_entity[j]->vel,0,0);
			}
		}
	}

	// PostProcess and draw entities
	for(i=0;i<_n_entities;i++){
		if(!_entity[i])
			continue;
		Entity_PostProcess(_entity[i],_ft);
		Entity_Draw(_entity[i]);
	}

	// Compactate
	j=0;
	for(i=0;i<_n_entities;i++){
		if(!_entity[i])
			continue;
		if(i>j)
			_entity[j]=_entity[i];
		j++;
	}
	_n_entities=j;

	// Launch the method
	if(_gamepostproc){
		_gamepostproc();
	}

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
	Draw_Loop(GameLib_ProcLoop);
}


/////////////////////////////
// GameLib_BreakLoop
//
// Breaks the game loop.
void GameLib_BreakLoop(){
	_running=0;
}
