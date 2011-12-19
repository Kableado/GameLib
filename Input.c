#include <math.h>
#include <SDL/SDL.h>

#include "Util.h"
#include "Input.h"


// Globals
InputKeyStatus _keys[InputKey_Max];


/////////////////////////////
// Input_Init
//
// Initializes the game input.
int Input_Init(){
	int i;

	// Mark released all the keys
	for(i=0;i<InputKey_Max;i++){
		_keys[i]=InputKey_Released;
	}

	return(1);
}


/////////////////////////////
// Input_Frame
//
// Notify a frame update to the input subsystem.
void Input_Frame(){
	Uint8* keys;

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
