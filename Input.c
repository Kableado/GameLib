// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>
#include <SDL/SDL.h>

#include "Util.h"
#include "Input.h"


// Globals
InputKeyStatus _keys[InputKey_Max];
SDL_Joystick *_joy;

/////////////////////////////
// Input_Init
//
// Initializes the game input.
int Input_Init(){
	int i;

	// Init the SDL Joystick subsistem
	SDL_InitSubSystem(SDL_INIT_JOYSTICK);

	// Mark released all the keys
	for(i=0;i<InputKey_Max;i++){
		_keys[i]=InputKey_Released;
	}
/*
	// Check for joystick
	if(SDL_NumJoysticks()>0){
		// Open joystick
		_joy=SDL_JoystickOpen(0);

		if(_joy){
			printf("Opened Joystick 0\n");
			printf("Name: %s\n", SDL_JoystickName(0));
			printf("Number of Axes: %d\n", SDL_JoystickNumAxes(_joy));
			printf("Number of Buttons: %d\n", SDL_JoystickNumButtons(_joy));
			printf("Number of Balls: %d\n", SDL_JoystickNumBalls(_joy));
		}else
			printf("Couldn't open Joystick 0\n");

		// Close if opened
		if(SDL_JoystickOpened(0))
			SDL_JoystickClose(_joy);
	}
*/
	return(1);
}


/////////////////////////////
// Input_Frame
//
// Notify a frame update to the input subsystem.
void Input_Frame(){
	Uint8* keys;
	/*Uint8 buttons;
	int mx,my;
	vec2 mdir;
	float temp;
	int mup,mdown,mleft,mright;
	extern int _width,_height;


	// Get mouse state
	buttons=SDL_GetMouseState(&mx,&my);
	vec2_set(mdir,mx-(_width/2),my-(_height/2.0f));
	temp=1.0f/sqrtf(vec2_dot(mdir,mdir));
	vec2_scale(mdir,mdir,temp);
	mup=mdown=mleft=mright=0;

	// Virtual Dpad on screen using mouse position
	if(buttons){
		if(mdir[0]>0.5f){
			mright=1;
		}
		if(mdir[0]<-0.5f){
			mleft=1;
		}
		if(mdir[1]>0.5f){
			mdown=1;
		}
		if(mdir[1]<-0.5f){
			mup=1;
		}
	}

	// Process Keys
	keys=SDL_GetKeyState(NULL);
	Input_SetKey(InputKey_Action1,keys[SDLK_z]);
	Input_SetKey(InputKey_Action2,keys[SDLK_x]);
	Input_SetKey(InputKey_Up,keys[SDLK_UP]|mup);
	Input_SetKey(InputKey_Down,keys[SDLK_DOWN]|mdown);
	Input_SetKey(InputKey_Left,keys[SDLK_LEFT]|mleft);
	Input_SetKey(InputKey_Right,keys[SDLK_RIGHT]|mright);
	Input_SetKey(InputKey_Jump,keys[SDLK_SPACE]);
	Input_SetKey(InputKey_Continue,keys[SDLK_RETURN]|keys[SDLK_KP_ENTER]);
*/

	// Process Keys
	keys=SDL_GetKeyState(NULL);
	Input_SetKey(InputKey_Action1,keys[SDLK_z]);
	Input_SetKey(InputKey_Action2,keys[SDLK_x]);
	Input_SetKey(InputKey_Up,keys[SDLK_UP]);
	Input_SetKey(InputKey_Down,keys[SDLK_DOWN]);
	Input_SetKey(InputKey_Left,keys[SDLK_LEFT]);
	Input_SetKey(InputKey_Right,keys[SDLK_RIGHT]);
	Input_SetKey(InputKey_Jump,keys[SDLK_SPACE]);
	Input_SetKey(InputKey_Continue,keys[SDLK_RETURN]|keys[SDLK_KP_ENTER]);
}


/////////////////////////////
// Input_SetKey
//
// Notify a key press to the input subsystem.
void Input_SetKey(InputKey key,int status){
	if(!status){
		_keys[key]=InputKey_Released;
	}else{
		if(_keys[key]>=InputKey_Pressed){
			_keys[key]=InputKey_Holded;
		}else{
			_keys[key]=InputKey_Pressed;
		}
	}
}


/////////////////////////////
// Input_GetKey
//
// Reports a the status of a key.
InputKeyStatus Input_GetKey(InputKey key){
	return(_keys[key]);
}


/////////////////////////////
// Input_AnyKey
//
//
int Input_AnyKey(){
	int i;
	for(i=0;i<InputKey_Max;i++){
		if(_keys[i]==InputKey_Pressed){
			return(1);
		}
	}
	return(0);
}


/////////////////////////////
// Input_GetDir
//
// Reports the direction of the dpad.
int Input_GetDir(vec2 dir){
	float vlen;
	Uint8 buttons;
	int mx,my;
	float dlen;
	extern int _width,_height;


	// Get mouse state
	buttons=SDL_GetMouseState(&mx,&my);
	if(buttons){
		// Use the mouse
		vec2_set(dir,mx-(_width/2),my-(_height/2.0f));
		dlen=1.0f/sqrtf(vec2_dot(dir,dir));
		vec2_scale(dir,dir,dlen);
		return(1);
	}else{
		// Use the keyboar
		vec2_set(dir,0.0f,0.0f);
		if(Input_GetKey(InputKey_Up) ){
			dir[1]-=1.0f;
		}
		if(Input_GetKey(InputKey_Down) ){
			dir[1]+=1.0f;
		}
		if(Input_GetKey(InputKey_Left) ){
			dir[0]-=1.0f;
		}
		if(Input_GetKey(InputKey_Right) ){
			dir[0]+=1.0f;
		}
		vlen=vec2_dot(dir,dir);
		if(vlen>0.0f){
			vlen=sqrtf(vlen);
			vec2_scale(dir,dir,1.0f/vlen);
			return(1);
		}else{
			return(0);
		}
	}
}
