// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <SDL/SDL.h>
#include <math.h>
#ifdef EMSCRIPTEN
#define SDL_GetKeyState SDL_GetKeyboardState
#endif

#include "Input.h"
#include "Util.h"

// Globals
InputKeyStatus _keys[InputKey_Max];

int _pointerDown = 0;
float _pointerX = 0;
float _pointerY = 0;

int _clicked = 0;
float _clickedPositionX = 0;
float _clickedPositionY = 0;

/////////////////////////////
// Input_Init
//
// Initializes the game input.
int Input_Init() {
	int i;

	// Mark released all the keys
	for (i = 0; i < InputKey_Max; i++) {
		_keys[i] = InputKey_Released;
	}

	return (1);
}

/////////////////////////////
// Input_Frame
//
// Notify a frame update to the input subsystem.
void Input_Frame() {
	Uint8 *keys;

	// Get keyboard state
	keys = (Uint8 *)SDL_GetKeyState(NULL);

	// Process Keys
	Input_SetKey(InputKey_Action1, keys[SDLK_z] | keys[SDLK_o]);
	Input_SetKey(InputKey_Action2, keys[SDLK_x] | keys[SDLK_p]);
	Input_SetKey(InputKey_Up, keys[SDLK_UP] | keys[SDLK_w]);
	Input_SetKey(InputKey_Down, keys[SDLK_DOWN] | keys[SDLK_s]);
	Input_SetKey(InputKey_Left, keys[SDLK_LEFT] | keys[SDLK_a]);
	Input_SetKey(InputKey_Right, keys[SDLK_RIGHT] | keys[SDLK_d]);
	Input_SetKey(InputKey_Jump, keys[SDLK_SPACE]);
	Input_SetKey(InputKey_Continue,
				 keys[SDLK_RETURN] | keys[SDLK_KP_ENTER] | _pointerDown);

	Input_SetKey(InputKey_DumpProfiling, keys[SDLK_m]);
}

/////////////////////////////
// Input_PostFrame
//
// Notify a frame update to the input subsystem.
void Input_PostFrame() {
	Input_SetKey(InputKey_Exit, 0);
	_clicked = 0;
}

/////////////////////////////
// Input_SetKey
//
// Notify a key press to the input subsystem.
void Input_SetKey(InputKey key, int status) {
	if (!status) {
		_keys[key] = InputKey_Released;
	} else {
		if (_keys[key] >= InputKey_Pressed) {
			_keys[key] = InputKey_Holded;
		} else {
			_keys[key] = InputKey_Pressed;
		}
	}
}

/////////////////////////////
// Input_GetKey
//
// Reports a the status of a key.
InputKeyStatus Input_GetKey(InputKey key) { return (_keys[key]); }

/////////////////////////////
// Input_SetPointerPosition
//
void Input_SetPointerPosition(float x, float y) {
	_pointerX = x;
	_pointerY = y;
}

/////////////////////////////
// Input_SetPointerDown
//
void Input_SetPointerDown(int pointerDown) {
	if (pointerDown == 0 && _pointerDown == 1) {
		_clicked = 1;
		_clickedPositionX = _pointerX;
		_clickedPositionY = _pointerY;
	}
	_pointerDown = pointerDown;
}

/////////////////////////////
// Input_GetPointerPosition
//
int Input_GetPointerPosition(vec2 pointer) {
	pointer[0] = _pointerX;
	pointer[1] = _pointerY;
	return _pointerDown;
}

/////////////////////////////
// Input_GetClickedPosition
//
int Input_GetClickedPosition(vec2 clickPosition) {
	clickPosition[0] = _clickedPositionX;
	clickPosition[1] = _clickedPositionY;
	return _clicked;
}

/////////////////////////////
// Input_AnyKey
//
//
int Input_AnyKey() {
	int i;
	for (i = 0; i < InputKey_Max; i++) {
		if (_keys[i] == InputKey_Pressed) {
			return (1);
		}
	}
	return (0);
}

/////////////////////////////
// Input_GetDir
//
// Reports the direction of the dpad.
int Input_GetDir(vec2 dir) {
	float vlen;
	Uint8 buttons;
	int mx, my;
	float dlen;
	extern int _width, _height;

	// Get mouse state
	buttons = SDL_GetMouseState(&mx, &my);
	if (buttons) {
		// Use the mouse
		vec2_set(dir, mx - (_width / 2), my - (_height / 2.0f));
		dlen = 1.0f / sqrtf(vec2_dot(dir, dir));
		vec2_scale(dir, dir, dlen);
		return (1);
	} else {
		// Use the keyboar
		vec2_set(dir, 0.0f, 0.0f);
		if (Input_GetKey(InputKey_Up)) {
			dir[1] -= 1.0f;
		}
		if (Input_GetKey(InputKey_Down)) {
			dir[1] += 1.0f;
		}
		if (Input_GetKey(InputKey_Left)) {
			dir[0] -= 1.0f;
		}
		if (Input_GetKey(InputKey_Right)) {
			dir[0] += 1.0f;
		}
		vlen = vec2_dot(dir, dir);
		if (vlen > 0.0f) {
			vlen = sqrtf(vlen);
			vec2_scale(dir, dir, 1.0f / vlen);
			return (1);
		} else {
			return (0);
		}
	}
}
