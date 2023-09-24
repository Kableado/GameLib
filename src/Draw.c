// Copyright (C) 2011-2015 Valeriano Alfonso Rodriguez (Kableado)

#ifdef WIN32

//	Windows
#define _WIN32_WINNT 0x0501
#include <GL/gl.h>
#include <GL/glext.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <windows.h>
#define USE_OpenGL 1
#define USE_OpenGLES 0
#include <unistd.h>

#else

//	Linux
#include <math.h>
#include <stdlib.h>
#include <string.h>
#define GL_GLEXT_PROTOTYPES 1
#include <SDL_opengl.h>
#define USE_OpenGL 0
#define USE_OpenGLES 1
// #define SDL_GetKeyState SDL_GetKeyboardState
#ifdef EMSCRIPTEN
#include <emscripten.h>
#endif

#endif

#include "lodepng.c"
#include <SDL.h>

#ifndef GL_CLAMP_TO_EDGE
#define GL_CLAMP_TO_EDGE 0x812F
#endif

#include "Audio.h"
#include "Draw.h"
#include "Input.h"
#include "QuadArray2D.h"
#include "TimeUtils.h"
#include "Util.h"

////////////////////////////////////////////////
// DrawImage //
///////////////
// Image container.
typedef struct TDrawImage TDrawImage, *DrawImage;
struct TDrawImage {
	unsigned char *data;
	int x, y;
	int w, h;
	int flip;
	GLuint tex;
};

// Globals
static SDL_Window *_window      = NULL;
static SDL_GLContext _glcontext = NULL;
static SDL_Renderer *_renderer  = NULL;
int _width;
int _height;
long long proc_t_frame = 33333;
long long draw_t_frame = 16667;
int _fps               = 60;
QuadArray2D _quadArray = NULL;
DrawImage _currentImg  = NULL;
float _color[4];

#if USE_OpenGLES

GLuint _whiteTex;

GLuint Draw_CompileShader(GLenum type, const char *source) {
	char *strType = type == GL_VERTEX_SHADER     ? "VertexShader"
	                : type == GL_FRAGMENT_SHADER ? "fragmentShader"
	                                             : "unknownShader";
	GLuint shader = glCreateShader(type);
	if (shader == 0) {
		Print("Error creating shader of type: %s\n", strType);
		return 0;
	}

	// load the shader source to the shader object and compile it
	glShaderSource(shader, 1, &source, NULL);
	glCompileShader(shader);

	// check if the shader compiled successfully
	GLint compiled;
	glGetShaderiv(shader, GL_COMPILE_STATUS, &compiled);
	if (!compiled) {
		GLint infoLogLength;
		glGetShaderiv(shader, GL_INFO_LOG_LENGTH, &infoLogLength);
		GLchar strInfoLog[infoLogLength + 1];
		glGetShaderInfoLog(shader, infoLogLength, NULL, strInfoLog);
		Print("Error compiling shader of type: %s: %s\n", strType, strInfoLog);

		glDeleteShader(shader);
		return 0;
	}

	return shader;
}

GLuint Draw_BuildProgram(const char *vertexShaderSource, const char *fragmentShaderSource) {
	// Compile shaders
	GLuint vertexShader   = Draw_CompileShader(GL_VERTEX_SHADER, vertexShaderSource);
	GLuint fragmentShader = Draw_CompileShader(GL_FRAGMENT_SHADER, fragmentShaderSource);
	if (vertexShader == 0 || fragmentShader == 0) {
		return 0;
	}

	// create a GL program and link it
	GLuint programObject = glCreateProgram();
	glAttachShader(programObject, vertexShader);
	glAttachShader(programObject, fragmentShader);
	glLinkProgram(programObject);

	// check if the program linked successfully
	GLint linked;
	glGetProgramiv(programObject, GL_LINK_STATUS, &linked);
	if (!linked) {
		glDeleteProgram(programObject);
		return 0;
	}
	return programObject;
}

GLuint programObject;

GLuint vertPosLoc;
GLuint vertTexLoc;
GLuint vertColorLoc;

GLuint textureLoc;
GLuint projectionMatrixLoc;

GLuint vertexObject;

#define Max_Vertices 6000

#endif

void Draw_ShowInfo();
void Draw_SetMatrix(float matrix[16]);
GLuint Draw_UploadGLTexture(int w, int h, unsigned char *pixels);

/////////////////////////////
// Draw_Init
//
// Initializes the game window.
int Draw_Init(int width, int height, char *title, int pfps, int fps) {

#ifdef WIN32
#ifndef ATTACH_PARENT_PROCESS
#define ATTACH_PARENT_PROCESS ((DWORD)-1)
#endif
	// Salida en la consola del padre
	AttachConsole(ATTACH_PARENT_PROCESS);
	if (GetStdHandle(STD_OUTPUT_HANDLE) != 0) {
		fclose(stdin);
		fclose(stdout);
		fclose(stderr);
		freopen("CONIN$", "r", stdin);
		freopen("CONOUT$", "w", stdout);
		freopen("CONOUT$", "w", stderr);
	}
#endif // WIN32

	// Set globals
	proc_t_frame = 1000000 / pfps;
	draw_t_frame = 1000000 / fps;
	_fps         = fps;
	_width       = width;
	_height      = height;

	// Initialize SDL
	if (SDL_Init(SDL_INIT_VIDEO) < 0) {
		Print("Draw_Init: Failure initializing SDL.\n");
		Print("\tSDL Error: %s\n", SDL_GetError());
		return (0);
	}

	// Initialize video mode
	_window =
		SDL_CreateWindow(title, SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, width, height, SDL_WINDOW_OPENGL);
	if (_window == NULL) {
		Print("Draw_Init: Failure initializing video mode.\n");
		Print("\tSDL Error: %s\n", SDL_GetError());
		return (0);
	}
	_glcontext = SDL_GL_CreateContext(_window);

	_renderer = SDL_CreateRenderer(_window, -1, SDL_RENDERER_ACCELERATED | SDL_RENDERER_TARGETTEXTURE);

	Draw_ShowInfo();

#if USE_OpenGL
	// Set the desired state
	glHint(GL_PERSPECTIVE_CORRECTION_HINT, GL_NICEST);
	glDisable(GL_CULL_FACE);
	glEnable(GL_TEXTURE_2D);
	glDisable(GL_LIGHTING);
	glDisable(GL_DEPTH_TEST);
	glDepthMask(GL_FALSE);

	// Triplebuffer swap
	glClear(GL_COLOR_BUFFER_BIT);
	SDL_GL_SwapWindow(_window);
	glClear(GL_COLOR_BUFFER_BIT);
	SDL_GL_SwapWindow(_window);
	glClear(GL_COLOR_BUFFER_BIT);
	SDL_GL_SwapWindow(_window);
	glClear(GL_COLOR_BUFFER_BIT);

	glEnableClientState(GL_COLOR_ARRAY);
	glEnableClientState(GL_TEXTURE_COORD_ARRAY);
	glEnableClientState(GL_VERTEX_ARRAY);

#endif

#if USE_OpenGLES

	const char vertexShaderSource[] = "attribute vec4 aPosition;       \n"
									  "attribute vec2 aTexCoord;       \n"
									  "attribute vec4 aColor;          \n"
									  "varying vec2 vTexCoord;         \n"
									  "varying vec4 vColor;            \n"
									  "uniform mat4 sProjectionMatrix; \n"
									  "void main() {                   \n"
									  "   gl_Position = aPosition *    \n"
									  "            sProjectionMatrix;  \n"
									  "   vTexCoord = aTexCoord;       \n"
									  "   vColor = aColor;             \n"
									  "}                               \n";

	const char fragmentShaderSource_10[] = "precision mediump float;                                \n"
										   "varying vec2 vTexCoord;                                 \n"
										   "varying vec4 vColor;                                    \n"
										   "uniform sampler2D sTexture;                             \n"
										   "void main() {                                           \n"
										   "  gl_FragColor = texture2D(sTexture, vTexCoord)*vColor; \n"
										   "}                                                       \n";

	const char fragmentShaderSource_20[] = "varying vec2 vTexCoord;                                 \n"
										   "varying vec4 vColor;                                    \n"
										   "uniform sampler2D sTexture;                             \n"
										   "void main() {                                           \n"
										   "  gl_FragColor = texture2D(sTexture, vTexCoord)*vColor; \n"
										   "}                                                       \n";

	programObject = Draw_BuildProgram(vertexShaderSource, fragmentShaderSource_20);
	if (programObject == 0) {
		programObject = Draw_BuildProgram(vertexShaderSource, fragmentShaderSource_10);
	}
	glUseProgram(programObject);

	vertPosLoc   = glGetAttribLocation(programObject, "aPosition");
	vertTexLoc   = glGetAttribLocation(programObject, "aTexCoord");
	vertColorLoc = glGetAttribLocation(programObject, "aColor");

	textureLoc          = glGetUniformLocation(programObject, "sTexture");
	projectionMatrixLoc = glGetUniformLocation(programObject, "sProjectionMatrix");

	glUniform1i(textureLoc, 0);

	glGenBuffers(1, &vertexObject);
	glBindBuffer(GL_ARRAY_BUFFER, vertexObject);
	glBufferData(GL_ARRAY_BUFFER, Vertex2D_Length * sizeof(float) * Max_Vertices, NULL, GL_DYNAMIC_DRAW);

	glBindBuffer(GL_ARRAY_BUFFER, vertexObject);

	glVertexAttribPointer(
		vertPosLoc, 2, GL_FLOAT, GL_FALSE, Vertex2D_Length * sizeof(float), (void *)(0 * sizeof(float)));
	glVertexAttribPointer(
		vertTexLoc, 2, GL_FLOAT, GL_FALSE, Vertex2D_Length * sizeof(float), (void *)(2 * sizeof(float)));
	glVertexAttribPointer(
		vertColorLoc, 4, GL_FLOAT, GL_FALSE, Vertex2D_Length * sizeof(float), (void *)(4 * sizeof(float)));

	glEnableVertexAttribArray(vertPosLoc);
	glEnableVertexAttribArray(vertTexLoc);
	glEnableVertexAttribArray(vertColorLoc);

	unsigned char whiteTexData[4] = {255, 255, 255, 255};
	_whiteTex                     = Draw_UploadGLTexture(1, 1, whiteTexData);

#endif

	// Set the proyection (2D)
	glViewport(0, 0, _width, _height);
	float projectionMatrix[16] = {1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1};
	projectionMatrix[0]        = (2.0f / _width);
	projectionMatrix[5]        = -(2.0f / _height);
	projectionMatrix[10]       = -0.001f;
	projectionMatrix[3]        = -1.0f;
	projectionMatrix[7]        = 1.0f;
	Draw_SetMatrix(projectionMatrix);

	// Enable Alpha blending
	glEnable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

	// Initialize the triangle array
	_quadArray = QuadArray2D_Create(400);

	Draw_SetColor(1.0f, 1.0f, 1.0f, 1.0f);

	return (1);
}

/////////////////////////////
// Draw_ShowInfo
//
// Show device information
void Draw_ShowInfo() {
	char *str;
	Print("\n*********************************\n");
	Print("*** Draw Info\n");
	str = (char *)glGetString(GL_VENDOR);
	Print(" Vendor: %s\n", str);
	str = (char *)glGetString(GL_RENDERER);
	Print(" Renderer: %s\n", str);
	str = (char *)glGetString(GL_VERSION);
	Print(" Version: %s\n", str);
	GLint major, minor;
	glGetIntegerv(GL_MAJOR_VERSION, &major);
	glGetIntegerv(GL_MINOR_VERSION, &minor);
	Print(" Version : %d.%d\n", major, minor);
	str = (char *)glGetString(GL_SHADING_LANGUAGE_VERSION);
	Print(" Shader Version: %s\n", str);
	Print("*********************************\n");
}

/////////////////////////////
// Draw_SetMatrix
//
// Sets the render matrix
void Draw_SetMatrix(float matrix[16]) {
#if USE_OpenGL
	float tempMatrix[16] = {
		matrix[0],
		matrix[4],
		matrix[8],
		matrix[12],
		matrix[1],
		matrix[5],
		matrix[9],
		matrix[13],
		matrix[2],
		matrix[6],
		matrix[10],
		matrix[14],
		matrix[3],
		matrix[7],
		matrix[11],
		matrix[15]};
	glLoadMatrixf(tempMatrix);
#endif
#if USE_OpenGLES
	glUniformMatrix4fv(projectionMatrixLoc, 1, GL_FALSE, matrix);
#endif
}

/////////////////////////////
// Draw_UploadGLTexture
//
// Uploads a OpenGL texture.
GLuint Draw_UploadGLTexture(int w, int h, unsigned char *pixels) {
	GLuint tex;

	// Generate OpenGL texture
	glGenTextures(1, &tex);
	glBindTexture(GL_TEXTURE_2D, tex);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);

	// Load OpenGL texture
	glBindTexture(GL_TEXTURE_2D, tex);
#if USE_OpenGL
	glPixelStorei(GL_UNPACK_ROW_LENGTH, w);
#endif
	glPixelStorei(GL_UNPACK_ALIGNMENT, 1);
	glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, w, h, 0, GL_RGBA, GL_UNSIGNED_BYTE, pixels);

	return (tex);
}

/////////////////////////////
// Draw_Flush
//
// Performs all the queued draw actions.
void Draw_Flush() {
	if (_currentImg == NULL || _quadArray->nVertex <= 0) {
		return;
	}
	if (_currentImg->tex == -1) {
		_currentImg->tex = Draw_UploadGLTexture(_currentImg->w, _currentImg->h, _currentImg->data);
	}

#if USE_OpenGL
	// Draw the quad array
	glBindTexture(GL_TEXTURE_2D, _currentImg->tex);
	glColorPointer(4, GL_FLOAT, Vertex2D_Length * sizeof(float), (GLvoid *)(_quadArray->vertexData + 4));
	glTexCoordPointer(2, GL_FLOAT, Vertex2D_Length * sizeof(float), (GLvoid *)(_quadArray->vertexData + 2));
	glVertexPointer(2, GL_FLOAT, Vertex2D_Length * sizeof(float), (GLvoid *)(_quadArray->vertexData));
	glDrawArrays(GL_TRIANGLES, 0, _quadArray->nVertex);

#else

	// Draw the quad array
	glBindTexture(GL_TEXTURE_2D, _currentImg->tex);
	glBufferSubData(GL_ARRAY_BUFFER, 0, Vertex2D_Length * sizeof(float) * _quadArray->nVertex, _quadArray->vertexData);
	glDrawArrays(GL_TRIANGLES, 0, _quadArray->nVertex);

#endif

	// Empty it
	QuadArray2D_Clean(_quadArray);
}

/////////////////////////////
// Draw_Clean
//
// Cleans the game window.
void Draw_Clean(unsigned char r, unsigned char g, unsigned char b) {
#if USE_OpenGL
	glClearColor(r / 255.0f, g / 255.0f, b / 255.0f, 1.0f);
	glClear(GL_COLOR_BUFFER_BIT);
#else
	Draw_Flush();
	float fr            = r / 255.0f;
	float fg            = g / 255.0f;
	float fb            = b / 255.0f;
	GLfloat vVertices[] = {
		0.0,    0.0,              // Position 0
		0.0,    0.0,              // TexCoord 0
		fr,     fg,      fb, 1.0, // Color

		0.0,    _height,          // Position 1
		0.0,    1.0,              // TexCoord 1
		fr,     fg,      fb, 1.0, // Color

		_width, _height,          // Position 2
		1.0,    1.0,              // TexCoord 2
		fr,     fg,      fb, 1.0, // Color

		_width, _height,          // Position 2
		1.0,    1.0,              // TexCoord 2
		fr,     fg,      fb, 1.0, // Color

		_width, 0.0,              // Position 3
		1.0,    0.0,              // TexCoord 3
		fr,     fg,      fb, 1.0, // Color

		0.0,    0.0,              // Position 0
		0.0,    0.0,              // TexCoord 0
		fr,     fg,      fb, 1.0, // Color
	};
	glBindTexture(GL_TEXTURE_2D, _whiteTex);
	glBufferSubData(GL_ARRAY_BUFFER, 0, sizeof(vVertices), vVertices);
	glDrawArrays(GL_TRIANGLES, 0, 6);
#endif
}

/////////////////////////////
// Draw_LoopIteration
//
// One iteracion of the loop updating the game window.
void (*_proc_func)(void *data)          = NULL;
void (*_draw_func)(void *data, float f) = NULL;
void *_data                             = NULL;
int _draw_looping                       = 0;
int _draw_exitoverrided                 = 0;
long long _accTime;
int Draw_LoopIteration() {
	SDL_Event event;

// Process Events
#ifdef EMSCRIPTEN
	while (SDL_PollEvent(&event)) {
		if (event.type == SDL_QUIT) {
			Input_SetKey(InputKey_Exit, 1);
		}
		if (event.type == SDL_KEYDOWN) {
			if (event.key.keysym.sym == SDL_SCANCODE_ESCAPE) {
				Input_SetKey(InputKey_Exit, 1);
			}
		}
		if (event.type == SDL_MOUSEMOTION) {
			Input_SetPointerPosition(event.motion.x / (float)_width, event.motion.y / (float)_height);
		}
		if (event.type == SDL_MOUSEBUTTONDOWN) {
			Input_SetPointerPosition(event.button.x / (float)_width, event.button.y / (float)_height);
			Input_SetPointerDown(1);
		}
		if (event.type == SDL_FINGERMOTION) {
			Input_SetPointerPosition(event.tfinger.x, event.tfinger.y);
		}
		if (event.type == SDL_FINGERDOWN) {
			Input_SetPointerPosition(event.tfinger.x, event.tfinger.y);
			Input_SetPointerDown(1);
		}
		if (event.type == SDL_MOUSEBUTTONUP) {
			Input_SetPointerPosition(event.button.x / (float)_width, event.button.y / (float)_height);
			Input_SetPointerDown(0);
		}
		if (event.type == SDL_FINGERUP) {
			Input_SetPointerPosition(event.tfinger.x, event.tfinger.y);
			Input_SetPointerDown(0);
		}
	}
#else
	while (SDL_PollEvent(&event)) {
		if (event.type == SDL_QUIT) {
			Input_SetKey(InputKey_Exit, 1);
			if (!_draw_exitoverrided) {
				_draw_looping = 0;
			}
		}
		if (event.type == SDL_KEYDOWN) {
			if (event.key.keysym.scancode == SDL_SCANCODE_ESCAPE) {
				Input_SetKey(InputKey_Exit, 1);
				if (!_draw_exitoverrided) {
					_draw_looping = 0;
				}
			}
		}
		if (event.type == SDL_MOUSEMOTION) {
			Input_SetPointerPosition(event.motion.x / (float)_width, event.motion.y / (float)_height);
		}
		if (event.type == SDL_MOUSEBUTTONDOWN) {
			Input_SetPointerPosition(event.button.x / (float)_width, event.button.y / (float)_height);
			Input_SetPointerDown(1);
		}
		if (event.type == SDL_MOUSEBUTTONUP) {
			Input_SetPointerPosition(event.button.x / (float)_width, event.button.y / (float)_height);
			Input_SetPointerDown(0);
		}
	}
#endif

	// Process
	if (_proc_func) {
		if (_accTime > 100000) {
			_accTime = 100000;
		}
		while (_accTime >= proc_t_frame && _draw_looping) {
			Input_Frame();
			_proc_func(_data);
			_accTime -= proc_t_frame;
			Input_PostFrame();
		}
	}

	// Sound Frame
	Audio_Frame();

	// Draw
	SDL_GL_SwapWindow(_window);
	if (_draw_func) {
		_draw_func(_data, (float)_accTime / (float)proc_t_frame);
		Draw_Flush();
	}

	return _draw_looping;
}

#ifdef EMSCRIPTEN
long long _procTime1;
long long _procTime2;
void Draw_LoopIterationAux() {
	Draw_LoopIteration();

	// Update time
	_procTime2 = Time_GetTime();
	_accTime += _procTime2 - _procTime1;
	_procTime1 = _procTime2;
}
#endif

/////////////////////////////
// Draw_Loop
//
// Loops updating the game window.
void Draw_Loop(void (*proc)(void *data), void (*draw)(void *data, float f), void *data) {

	_proc_func = proc;
	_draw_func = draw;
	_data      = data;
	if (_draw_looping) {
		return;
	}
	_draw_looping = 1;
#ifndef EMSCRIPTEN
	long long procTime1, procTime2, drawTime1, drawTime2;
	_accTime  = proc_t_frame;
	procTime1 = drawTime1 = Time_GetTime();
	while (Draw_LoopIteration()) {

		// Wait to round draw_t_frame
		drawTime2 = Time_GetTime();
		Time_Pause(draw_t_frame - (drawTime2 - drawTime1));
		drawTime2 = Time_GetTime();
		drawTime1 = drawTime2;

		// Update time
		procTime2 = Time_GetTime();
		_accTime += procTime2 - procTime1;
		procTime1 = procTime2;
	}
#else
	_accTime   = proc_t_frame;
	_procTime1 = Time_GetTime();
	if (_fps <= 50) {
		emscripten_set_main_loop(Draw_LoopIterationAux, _fps, 1);
	} else {
		emscripten_set_main_loop(Draw_LoopIterationAux, 0, 1);
	}
#endif
}

/////////////////////////////
// Draw_BreakLoop
//
// Breaks the drawing loop
void Draw_BreakLoop() {
#ifndef EMSCRIPTEN
	_draw_looping = 0;
#endif
}

/////////////////////////////
// Draw_OverrideExit
//
// Overrides the default exit mechanism
void Draw_OverrideExit(int override) { _draw_exitoverrided = override; }

/////////////////////////////
// Draw_CreateImage
//
DrawImg Draw_CreateImage(int w, int h) {
	DrawImage image;

	// Create the image container
	image       = malloc(sizeof(TDrawImage));
	image->data = malloc(w * h * 4);
	image->x    = 0;
	image->y    = 0;
	image->w    = w;
	image->h    = h;
	image->flip = 0;
	image->tex  = -1;

	return ((DrawImg)image);
}

/////////////////////////////
// Draw_LoadImage
//
// Loads a image, giving a reference.
DrawImg Draw_LoadImage(char *filename) {
	DrawImage image;

	// Try loading PNG images
	if (EndsWith(filename, ".png") || EndsWith(filename, ".PNG")) {
		image          = malloc(sizeof(TDrawImage));
		unsigned error = lodepng_decode32_file(&image->data, (unsigned *)&image->w, (unsigned *)&image->h, filename);
		if (error) {
			Print("Draw_LoadImage: PNG decoder error %u: %s on file %s\n", error, lodepng_error_text(error), filename);
			return (NULL);
		}
		image->x    = -(int)(image->w / 2);
		image->y    = -(int)(image->h / 2);
		image->flip = 0;
		image->tex  = -1;
		return (DrawImg)image;
	}

	Print("Draw_LoadImage: Image type not supported: %s\n", filename);
	return (NULL);
}

/////////////////////////////
// Draw_GetSize
//
// Gets the image size.
void Draw_GetSize(DrawImg img, int *w, int *h) {
	DrawImage image = img;

	// Gets the image size
	*w = image->w;
	*h = image->h;
}

/////////////////////////////
// Draw_SetOffset
// Draw_GetOffset
//
// Sets and Gets the image offset.
void Draw_SetOffset(DrawImg img, int x, int y) {
	DrawImage image = img;

	// Sets the image offset
	image->x = x;
	image->y = y;
}
void Draw_GetOffset(DrawImg img, int *x, int *y) {
	DrawImage image = img;

	// Gets the image offset
	*x = image->x;
	*y = image->y;
}

/////////////////////////////
// Draw_SetFlip
// Draw_GetFlip
//
//
void Draw_SetFlip(DrawImg img, int flip) {
	DrawImage image = img;
	image->flip     = flip;
}
int Draw_GetFlip(DrawImg img) {
	DrawImage image = img;
	return image->flip;
}

/////////////////////////////
// Draw_DrawImg
//
// Draws an image.
void Draw_DrawImg(DrawImg img, int x, int y, float scale[2]) {
	DrawImage image = img;
	float x1, x2, y1, y2;
	float u1 = 0.0f, u2 = 1.0f;
	float v1 = 0.0f, v2 = 1.0f;

	// Prepare screen coordinates
	x1 = x + (image->x * scale[0]);
	y1 = y + (image->y * scale[1]);
	x2 = x1 + (image->w * scale[0]);
	y2 = y1 + (image->h * scale[1]);

	// Apply flipping
	if (image->flip & 1) {
		float t = u1;
		u1      = u2;
		u2      = t;
	}
	if (image->flip & 2) {
		float t = v1;
		v1      = v2;
		v2      = t;
	}

	// Draw a quad
	if (_currentImg != image) {
		Draw_Flush();
		_currentImg = image;
	}
	QuadArray2D_AddQuad(_quadArray, x1, y1, u1, v1, x2, y2, u2, v2, _color);
}

/////////////////////////////
// Draw_DrawImgResized
//
// Draws an image, resizing.
void Draw_DrawImgResized(DrawImg img, int x, int y, float w, float h) {
	DrawImage image = img;
	int x1, x2, y1, y2;
	float u1 = 0.0f, u2 = 1.0f;
	float v1 = 0.0f, v2 = 1.0f;

	// Prepare
	x1 = x + image->x;
	y1 = y + image->y;
	x2 = x1 + w;
	y2 = y1 + h;

	// Apply flipping
	if (image->flip & 1) {
		float t = u1;
		u1      = u2;
		u2      = t;
	}
	if (image->flip & 2) {
		float t = v1;
		v1      = v2;
		v2      = t;
	}

	// Draw a quad
	if (_currentImg != image) {
		Draw_Flush();
		_currentImg = image;
	}
	QuadArray2D_AddQuad(_quadArray, x1, y1, u1, v1, x2, y2, u2, v2, _color);
}

/////////////////////////////
// Draw_DrawImgPart
//
// Draws an image part.
void Draw_DrawImgPart(DrawImg img, int x, int y, int w, int h, int i, int j, float scale[2]) {
	DrawImage image = img;
	int x1, x2, y1, y2;
	float us, u1, u2;
	float vs, v1, v2;

	// Prepare screen coordinates
	x1 = x + (image->x * scale[0]);
	y1 = y + (image->y * scale[1]);
	x2 = x1 + (w * scale[0]);
	y2 = y1 + (h * scale[1]);

	// Prepare image coordinates
	us = 1.0f / image->w;
	u1 = us * i * w;
	u2 = u1 + (us * w);
	vs = 1.0f / image->h;
	v1 = vs * j * h;
	v2 = v1 + (vs * h);

	// Apply flipping
	if (image->flip & 1) {
		float t = u1;
		u1      = u2;
		u2      = t;
	}
	if (image->flip & 2) {
		float t = v1;
		v1      = v2;
		v2      = t;
	}

	// Draw a quad
	if (_currentImg != image) {
		Draw_Flush();
		_currentImg = image;
	}
	QuadArray2D_AddQuad(_quadArray, x1, y1, u1, v1, x2, y2, u2, v2, _color);
}

/////////////////////////////
// Draw_DrawImgPartHoriz
//
// Draws an image part horizontally.
void Draw_DrawImgPartHoriz(DrawImg img, int x, int y, int w, int i, float scale[2]) {
	DrawImage image = img;
	int x1, x2, y1, y2;
	float us, u1, u2;
	float v1 = 0.0f, v2 = 1.0f;

	// Prepare screen coordinates
	x1 = x + (image->x * scale[0]);
	y1 = y + (image->y * scale[1]);
	x2 = x1 + (w * scale[0]);
	y2 = y1 + (image->h * scale[1]);

	// Prepare image coordinates
	us = 1.0f / image->w;
	u1 = us * i * w;
	u2 = u1 + us * w;

	// Apply flipping
	if (image->flip & 1) {
		float t = u1;
		u1      = u2;
		u2      = t;
	}
	if (image->flip & 2) {
		float t = v1;
		v1      = v2;
		v2      = t;
	}

	// Draw a quad
	if (_currentImg != image) {
		Draw_Flush();
		_currentImg = image;
	}
	QuadArray2D_AddQuad(_quadArray, x1, y1, u1, v1, x2, y2, u2, v2, _color);
}

/////////////////////////////
// Draw_ImgParallax
//
//
void Draw_ImgParallax(
	DrawImg img, int imgSize[2], int imgOffset[2], float parallaxFactor[2], int gamePos[2], int gameSize[2]) {
	int paralaxPos[2];
	int mult[2];
	int x, y;

	paralaxPos[0] = (gamePos[0] * parallaxFactor[0]) + imgOffset[0];
	paralaxPos[1] = (gamePos[1] * parallaxFactor[1]) + imgOffset[1];

	mult[0] = floor(paralaxPos[0] / imgSize[0]);
	if (paralaxPos[0] < 0) {
		mult[0]--;
	}
	mult[1] = floor(paralaxPos[1] / imgSize[1]);
	if (paralaxPos[1] < 0) {
		mult[1]--;
	}

	y = (mult[1] * imgSize[1]) - paralaxPos[1];
	while (y < gameSize[1]) {
		x = (mult[0] * imgSize[0]) - paralaxPos[0];
		while (x < gameSize[0]) {
			Draw_DrawImgResized(img, x, y, imgSize[0], imgSize[1]);
			x += imgSize[0];
		}
		y += imgSize[1];
	}
}

/////////////////////////////
// Draw_SetColor
//
//
void Draw_SetColor(float r, float g, float b, float a) {
	_color[0] = r;
	_color[1] = g;
	_color[2] = b;
	_color[3] = a;
}

////////////////////////////////////////////////
// DrawFnt //
/////////////
// Reference to a Font.
typedef struct {
	DrawImage img;
	int w, h;
	int min, max;
	float scale[2];
} DrawFont;

/////////////////////////////
// Draw_DefaultImage
//
// Creates a image with the default font.
#include "FontData.h"
DrawImage Draw_DefaultFontImage(unsigned char r, unsigned char g, unsigned char b, unsigned char a) {
	DrawImage img;
	int x, y, c;

	// Create the image and colors
	img = Draw_CreateImage(8 * 256, 8);

	// Draw the font
	for (c = 0; c < 256; c++) {
		for (y = 0; y < 8; y++) {
			for (x = 0; x < 8; x++) {
				int offset            = ((c * 8 + x) + (8 * 256 * y)) * 4;
				img->data[offset + 0] = r;
				img->data[offset + 1] = g;
				img->data[offset + 2] = b;
				if (((fontdata_8x8[c * 8 + y] >> (7 - x)) & 0x01) == 1) {
					img->data[offset + 3] = a;
				} else {
					img->data[offset + 3] = 0x00;
				}
			}
		}
	}

	return (img);
}

/////////////////////////////
// Draw_DefaultFont
//
// Creates the default font.
DrawFnt Draw_DefaultFont(unsigned char r, unsigned char g, unsigned char b, unsigned char a) {
	DrawFont *font;

	// Create the default font
	font           = malloc(sizeof(DrawFont));
	font->img      = Draw_DefaultFontImage(r, g, b, a);
	font->w        = 8;
	font->h        = 8;
	font->min      = 0;
	font->max      = 256;
	font->scale[0] = 1.0f;
	font->scale[1] = 1.0f;

	return ((DrawFnt)font);
}

/////////////////////////////
// Draw_LoadFont
//
// Load a font from a file.
DrawFnt Draw_LoadFont(char *fichero, int min, int max) {
	DrawFont *font;

	// Create the font form the image
	font           = malloc(sizeof(DrawFont));
	font->img      = Draw_LoadImage(fichero);
	font->w        = font->img->w / (max - min);
	font->h        = font->img->h;
	font->min      = min;
	font->max      = max;
	font->scale[0] = 1.0f;
	font->scale[1] = 1.0f;

	return ((DrawFnt)font);
}

/////////////////////////////
// Draw_FontScale
//
void Draw_FontScale(DrawFnt f, float scale[2]) {
	DrawFont *font = f;

	font->scale[0] = scale[0];
	font->scale[1] = scale[1];
}

/////////////////////////////
// Draw_DrawText
//
// Draws text using a font.
void Draw_DrawText(DrawFnt f, char *text, int x, int y) {
	DrawFont *font = f;
	char *ptr;

	// Iterate the string
	ptr = text;
	while (*ptr) {
		if ((*ptr) < font->max) {
			Draw_DrawImgPartHoriz(font->img, x, y, font->w, (*ptr) - font->min, font->scale);
		}
		x += font->w * font->scale[0];
		ptr++;
	}
}

/////////////////////////////
// Draw_SaveRGBAToBMP
//
//
void Draw_SaveRGBAToBMP(char *filename, unsigned char *data, int width, int height) {
	SDL_Surface *surf;

	// Create the surface
	surf                 = SDL_CreateRGBSurface(SDL_SWSURFACE, width, height, 32, 0, 0, 0, 0);
	surf->format->Amask  = 0xFF000000;
	surf->format->Ashift = 24;
	// SDL_SetAlpha(surf, GL_SRC_ALPHA, 255);
	SDL_LockSurface(surf);
	memcpy(surf->pixels, data, width * height * 4);
	SDL_UnlockSurface(surf);

	// Swap RGB to BGR
	Uint32 *ptr, *ptr_end;
	ptr     = (Uint32 *)surf->pixels;
	ptr_end = ptr + (surf->w * surf->h);
	while (ptr < ptr_end) {
		unsigned char temp;
		unsigned char *pixel;
		pixel    = (unsigned char *)ptr;
		temp     = pixel[2];
		pixel[2] = pixel[0];
		pixel[0] = temp;
		ptr++;
	}

	// Save the image
	SDL_SaveBMP(surf, filename);

	// Cleanup
	SDL_FreeSurface(surf);
}

/////////////////////////////
// Draw_SaveRGBAToPNG
//
//
void Draw_SaveRGBAToPNG(char *filename, unsigned char *data, int width, int height) {
	unsigned error = lodepng_encode32_file(filename, data, width, height);
	if (error) {
		Print("Draw_SaveRGBAToPNG: Error %u: %s\n", error, lodepng_error_text(error));
	}
}

/////////////////////////////
// Draw_SaveScreenshoot
//
//
void Draw_SaveScreenshoot(char *filename) {
#if USE_OpenGL
	unsigned char *pixelData;
	unsigned char *image_line;
	int i, half_height, line_size;

	pixelData = malloc(_width * _height * 4);

	glReadPixels(0, 0, _width, _height, GL_RGBA, GL_UNSIGNED_BYTE, pixelData);

	// Flip the image data
	line_size   = _width * 4;
	half_height = _height / 2;
	image_line  = malloc(line_size);
	for (i = 0; i < half_height; i++) {
		memcpy(image_line, pixelData + i * line_size, line_size);
		memcpy(pixelData + i * line_size, pixelData + (_height - (i + 1)) * line_size, line_size);
		memcpy(pixelData + (_height - (i + 1)) * line_size, image_line, line_size);
	}

	// Save the image
	if (EndsWith(filename, ".bmp") || EndsWith(filename, ".BMP")) {
		Draw_SaveRGBAToBMP(filename, pixelData, _width, _height);
	} else if (EndsWith(filename, ".png") || EndsWith(filename, ".PNG")) {
		Draw_SaveRGBAToPNG(filename, pixelData, _width, _height);
	}

	// Cleanup
	free(pixelData);
#endif
}

/////////////////////////////
// Draw_ShowCursor
//
//
void Draw_ShowCursor(int showCursor) {
	if (showCursor) {
		SDL_ShowCursor(31);
	} else {
		SDL_ShowCursor(0);
	}
}
