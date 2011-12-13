#ifndef _INPUT_H_
#define _INPUT_H_


/////////////////////////////
// Input_Init
//
// Initializes the game input.
int Input_Init();


/////////////////////////////
// Input_Frame
//
// Notify a frame update to the input subsystem.
void Input_Frame();


////////////////////////////////////////////////
// InputKey //
//////////////
// Key enumeration.
typedef enum {
	InputKey_Action1,
	InputKey_Action2,
	InputKey_Up,
	InputKey_Down,
	InputKey_Left,
	InputKey_Right,
	InputKey_Jump,
	InputKey_Max
} InputKey;


/////////////////////////////
// Input_SetKey
//
// Notify a key press to the input subsystem.
void Input_SetKey(InputKey key,int status);


////////////////////////////////////////////////
// InputKeyStatus //
///////////////////
// Key status enumeration.
typedef enum {
	InputKey_Released,
	InputKey_Pressed,
	InputKey_Holded
} InputKeyStatus;


/////////////////////////////
// Input_GetKey
//
// Reports a the status of a key.
InputKeyStatus Input_GetKey(InputKey key);



#endif
