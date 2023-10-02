// Copyright (C) 2011-2023 Valeriano Alfonso Rodriguez (Kableado)

#ifdef WIN32

// Windows
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

// Linux + Emscripten
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
static SDL_Window *g_Window      = NULL;
static SDL_GLContext g_GLContext = NULL;
static SDL_Renderer *g_Renderer  = NULL;
int g_Width;
int g_Height;
long long g_ProcTFrame  = 33333;
long long g_DrawTFrame  = 16667;
int g_FPS               = 60;
QuadArray2D g_QuadArray = NULL;
DrawImage g_CurrentImg  = NULL;
float g_Color[4];

#if USE_OpenGLES

GLuint g_WhiteTex;

GLuint Draw_CompileShader(GLenum type, const char *source) {
	char *strType = type == GL_VERTEX_SHADER     ? "VertexShader"
	                : type == GL_FRAGMENT_SHADER ? "fragmentShader"
	                                             : "unknownShader";
	GLuint shader = glCreateShader(type);
	if (shader == 0) {
		Print("ERROR: Creating shader of type: %s\n", strType);
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
		Print("ERROR: Compiling shader of type: %s: %s\n", strType, strInfoLog);

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

GLuint g_ProgramObject;

GLint g_VertPosLoc;
GLint g_VertTexLoc;
GLint g_VertColorLoc;

GLint g_TextureLoc;
GLint g_ProjectionMatrixLoc;

GLuint g_VertexObject;

#define Max_Vertices 6000

#endif

void Draw_ShowInfo();
void Draw_SetMatrix(float matrix[16]);
GLuint Draw_UploadGLTexture(int w, int h, unsigned char *pixels);

/////////////////////////////
// Draw_Init
//
// Initializes the game window.
int Draw_Init(int width, int height, char *title, int pFps, int fps) {

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
	g_ProcTFrame = 1000000 / pFps;
	g_DrawTFrame = 1000000 / fps;
	g_FPS        = fps;
	g_Width      = width;
	g_Height     = height;

	// Initialize SDL
	if (SDL_Init(SDL_INIT_VIDEO) < 0) {
		Print("Draw_Init: Failure initializing SDL.\n");
		Print("\tSDL Error: %s\n", SDL_GetError());
		return (0);
	}

	// Initialize video mode
	g_Window =
		SDL_CreateWindow(title, SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, width, height, SDL_WINDOW_OPENGL);
	if (g_Window == NULL) {
		Print("Draw_Init: Failure initializing video mode.\n");
		Print("\tSDL Error: %s\n", SDL_GetError());
		return (0);
	}
	g_GLContext = SDL_GL_CreateContext(g_Window);

	g_Renderer = SDL_CreateRenderer(g_Window, -1, SDL_RENDERER_ACCELERATED | SDL_RENDERER_TARGETTEXTURE);

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
	SDL_GL_SwapWindow(g_Window);
	glClear(GL_COLOR_BUFFER_BIT);
	SDL_GL_SwapWindow(g_Window);
	glClear(GL_COLOR_BUFFER_BIT);
	SDL_GL_SwapWindow(g_Window);
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

	g_ProgramObject = Draw_BuildProgram(vertexShaderSource, fragmentShaderSource_20);
	if (g_ProgramObject == 0) {
		g_ProgramObject = Draw_BuildProgram(vertexShaderSource, fragmentShaderSource_10);
	}
	glUseProgram(g_ProgramObject);

	g_VertPosLoc   = glGetAttribLocation(g_ProgramObject, "aPosition");
	g_VertTexLoc   = glGetAttribLocation(g_ProgramObject, "aTexCoord");
	g_VertColorLoc = glGetAttribLocation(g_ProgramObject, "aColor");

	g_TextureLoc          = glGetUniformLocation(g_ProgramObject, "sTexture");
	g_ProjectionMatrixLoc = glGetUniformLocation(g_ProgramObject, "sProjectionMatrix");

	glUniform1i(g_TextureLoc, 0);

	glGenBuffers(1, &g_VertexObject);
	glBindBuffer(GL_ARRAY_BUFFER, g_VertexObject);
	glBufferData(GL_ARRAY_BUFFER, Vertex2D_Length * sizeof(float) * Max_Vertices, NULL, GL_DYNAMIC_DRAW);

	glBindBuffer(GL_ARRAY_BUFFER, g_VertexObject);

	glVertexAttribPointer(
		g_VertPosLoc, 2, GL_FLOAT, GL_FALSE, Vertex2D_Length * sizeof(float), (void *)(0 * sizeof(float)));
	glVertexAttribPointer(
		g_VertTexLoc, 2, GL_FLOAT, GL_FALSE, Vertex2D_Length * sizeof(float), (void *)(2 * sizeof(float)));
	glVertexAttribPointer(
		g_VertColorLoc, 4, GL_FLOAT, GL_FALSE, Vertex2D_Length * sizeof(float), (void *)(4 * sizeof(float)));

	glEnableVertexAttribArray(g_VertPosLoc);
	glEnableVertexAttribArray(g_VertTexLoc);
	glEnableVertexAttribArray(g_VertColorLoc);

	unsigned char whiteTexData[4] = {255, 255, 255, 255};
	g_WhiteTex                    = Draw_UploadGLTexture(1, 1, whiteTexData);

#endif

	// Set the projection (2D)
	glViewport(0, 0, g_Width, g_Height);
	float projectionMatrix[16] = {1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1};
	projectionMatrix[0]        = (2.0f / (float)g_Width);
	projectionMatrix[5]        = -(2.0f / (float)g_Height);
	projectionMatrix[10]       = -0.001f;
	projectionMatrix[3]        = -1.0f;
	projectionMatrix[7]        = 1.0f;
	Draw_SetMatrix(projectionMatrix);

	// Enable Alpha blending
	glEnable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

	// Initialize the triangle array
	g_QuadArray = QuadArray2D_Create(400);

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
	glUniformMatrix4fv(g_ProjectionMatrixLoc, 1, GL_FALSE, matrix);
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
	if (g_CurrentImg == NULL || g_QuadArray->nVertex <= 0) {
		return;
	}
	if (g_CurrentImg->tex == -1) {
		g_CurrentImg->tex = Draw_UploadGLTexture(g_CurrentImg->w, g_CurrentImg->h, g_CurrentImg->data);
	}

#if USE_OpenGL
	// Draw the quad array
	glBindTexture(GL_TEXTURE_2D, g_CurrentImg->tex);
	glColorPointer(4, GL_FLOAT, Vertex2D_Length * sizeof(float), (GLvoid *)(g_QuadArray->vertexData + 4));
	glTexCoordPointer(2, GL_FLOAT, Vertex2D_Length * sizeof(float), (GLvoid *)(g_QuadArray->vertexData + 2));
	glVertexPointer(2, GL_FLOAT, Vertex2D_Length * sizeof(float), (GLvoid *)(g_QuadArray->vertexData));
	glDrawArrays(GL_TRIANGLES, 0, g_QuadArray->nVertex);

#else

	// Draw the quad array
	glBindTexture(GL_TEXTURE_2D, g_CurrentImg->tex);
	glBufferSubData(
		GL_ARRAY_BUFFER, 0, Vertex2D_Length * sizeof(float) * g_QuadArray->nVertex, g_QuadArray->vertexData);
	glDrawArrays(GL_TRIANGLES, 0, g_QuadArray->nVertex);

#endif

	// Empty it
	QuadArray2D_Clean(g_QuadArray);
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
	float fr            = (float)r / 255.0f;
	float fg            = (float)g / 255.0f;
	float fb            = (float)b / 255.0f;
	float fWidth        = (float)g_Width;
	float fHeight       = (float)g_Height;
	GLfloat vVertices[] = {
		0.0f,   0.0f,              // Position 0
		0.0f,   0.0f,              // TexCoord 0
		fr,     fg,      fb, 1.0f, // Color

		0.0f,   fHeight,           // Position 1
		0.0f,   1.0f,              // TexCoord 1
		fr,     fg,      fb, 1.0f, // Color

		fWidth, fHeight,           // Position 2
		1.0f,   1.0f,              // TexCoord 2
		fr,     fg,      fb, 1.0f, // Color

		fWidth, fHeight,           // Position 2
		1.0f,   1.0f,              // TexCoord 2
		fr,     fg,      fb, 1.0f, // Color

		fWidth, 0.0f,              // Position 3
		1.0f,   0.0f,              // TexCoord 3
		fr,     fg,      fb, 1.0f, // Color

		0.0f,   0.0f,              // Position 0
		0.0f,   0.0f,              // TexCoord 0
		fr,     fg,      fb, 1.0f, // Color
	};
	glBindTexture(GL_TEXTURE_2D, g_WhiteTex);
	glBufferSubData(GL_ARRAY_BUFFER, 0, sizeof(vVertices), vVertices);
	glDrawArrays(GL_TRIANGLES, 0, 6);
#endif
}

/////////////////////////////
// Draw_LoopIteration
//
// One iteration of the loop updating the game window.
void (*g_ProcFunc)(void *data)          = NULL;
void (*g_DrawFunc)(void *data, float f) = NULL;
void *g_Data                            = NULL;
int g_DrawLooping                       = 0;
int g_DrawExitOverride                  = 0;
long long g_AccumulatedTime;
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
			Input_SetPointerPosition(event.motion.x / (float)g_Width, event.motion.y / (float)g_Height);
		}
		if (event.type == SDL_MOUSEBUTTONDOWN) {
			Input_SetPointerPosition(event.button.x / (float)g_Width, event.button.y / (float)g_Height);
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
			Input_SetPointerPosition(event.button.x / (float)g_Width, event.button.y / (float)g_Height);
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
			if (!g_DrawExitOverride) {
				g_DrawLooping = 0;
			}
		}
		if (event.type == SDL_KEYDOWN) {
			if (event.key.keysym.scancode == SDL_SCANCODE_ESCAPE) {
				Input_SetKey(InputKey_Exit, 1);
				if (!g_DrawExitOverride) {
					g_DrawLooping = 0;
				}
			}
		}
		if (event.type == SDL_MOUSEMOTION) {
			Input_SetPointerPosition((float)event.motion.x / (float)g_Width, (float)event.motion.y / (float)g_Height);
		}
		if (event.type == SDL_MOUSEBUTTONDOWN) {
			Input_SetPointerPosition((float)event.button.x / (float)g_Width, (float)event.button.y / (float)g_Height);
			Input_SetPointerDown(1);
		}
		if (event.type == SDL_MOUSEBUTTONUP) {
			Input_SetPointerPosition((float)event.button.x / (float)g_Width, (float)event.button.y / (float)g_Height);
			Input_SetPointerDown(0);
		}
	}
#endif

	// Process
	if (g_ProcFunc) {
		if (g_AccumulatedTime > 100000) {
			g_AccumulatedTime = 100000;
		}
		while (g_AccumulatedTime >= g_ProcTFrame && g_DrawLooping) {
			Input_Frame();
			g_ProcFunc(g_Data);
			g_AccumulatedTime -= g_ProcTFrame;
			Input_PostFrame();
		}
	}

	// Sound Frame
	Audio_Frame();

	// Draw
	SDL_GL_SwapWindow(g_Window);
	if (g_DrawFunc) {
		g_DrawFunc(g_Data, (float)g_AccumulatedTime / (float)g_ProcTFrame);
		Draw_Flush();
	}

	return g_DrawLooping;
}

#ifdef EMSCRIPTEN
long long _procTime1;
long long _procTime2;
void Draw_LoopIterationAux() {
	Draw_LoopIteration();

	// Update time
	_procTime2 = Time_GetTime();
	g_AccumulatedTime += _procTime2 - _procTime1;
	_procTime1 = _procTime2;
}
#endif

/////////////////////////////
// Draw_Loop
//
// Loops updating the game window.
void Draw_Loop(void (*proc)(void *data), void (*draw)(void *data, float f), void *data) {

	g_ProcFunc = proc;
	g_DrawFunc = draw;
	g_Data     = data;
	if (g_DrawLooping) {
		return;
	}
	g_DrawLooping = 1;
#ifndef EMSCRIPTEN
	long long procTime1, procTime2, drawTime1, drawTime2;
	g_AccumulatedTime = g_ProcTFrame;
	procTime1 = drawTime1 = Time_GetTime();
	while (Draw_LoopIteration()) {

		// Wait to round g_DrawTFrame
		drawTime2 = Time_GetTime();
		Time_Pause(g_DrawTFrame - (drawTime2 - drawTime1));
		drawTime2 = Time_GetTime();
		drawTime1 = drawTime2;

		// Update time
		procTime2 = Time_GetTime();
		g_AccumulatedTime += procTime2 - procTime1;
		procTime1 = procTime2;
	}
#else
	g_AccumulatedTime = g_ProcTFrame;
	_procTime1        = Time_GetTime();
	if (g_FPS <= 50) {
		emscripten_set_main_loop(Draw_LoopIterationAux, g_FPS, 1);
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
	g_DrawLooping = 0;
#endif
}

/////////////////////////////
// Draw_OverrideExit
//
// Overrides the default exit mechanism
void Draw_OverrideExit(int override) { g_DrawExitOverride = override; }

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
// Loads an image, giving a reference.
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
void Draw_DrawImg(DrawImg img, int x, int y, const float scale[2]) {
	DrawImage image = img;
	float x1, x2, y1, y2;
	float u1 = 0.0f, u2 = 1.0f;
	float v1 = 0.0f, v2 = 1.0f;

	// Prepare screen coordinates
	x1 = (float)x + ((float)image->x * scale[0]);
	y1 = (float)y + ((float)image->y * scale[1]);
	x2 = x1 + ((float)image->w * scale[0]);
	y2 = y1 + ((float)image->h * scale[1]);

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
	if (g_CurrentImg != image) {
		Draw_Flush();
		g_CurrentImg = image;
	}
	QuadArray2D_AddQuad(g_QuadArray, x1, y1, u1, v1, x2, y2, u2, v2, g_Color);
}

/////////////////////////////
// Draw_DrawImgResized
//
// Draws an image, resizing.
void Draw_DrawImgResized(DrawImg img, int x, int y, float w, float h) {
	DrawImage image = img;
	float x1, x2, y1, y2;
	float u1 = 0.0f, u2 = 1.0f;
	float v1 = 0.0f, v2 = 1.0f;

	// Prepare
	x1 = (float)x + (float)image->x;
	y1 = (float)y + (float)image->y;
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
	if (g_CurrentImg != image) {
		Draw_Flush();
		g_CurrentImg = image;
	}
	QuadArray2D_AddQuad(g_QuadArray, x1, y1, u1, v1, x2, y2, u2, v2, g_Color);
}

/////////////////////////////
// Draw_DrawImgPart
//
// Draws an image part.
void Draw_DrawImgPart(DrawImg img, int x, int y, int w, int h, int i, int j, const float scale[2]) {
	DrawImage image = img;
	float x1, x2, y1, y2;
	float us, u1, u2;
	float vs, v1, v2;

	// Prepare screen coordinates
	x1 = (float)x + ((float)image->x * scale[0]);
	y1 = (float)y + ((float)image->y * scale[1]);
	x2 = x1 + ((float)w * scale[0]);
	y2 = y1 + ((float)h * scale[1]);

	// Prepare image coordinates
	us = 1.0f / (float)image->w;
	u1 = us * (float)(i * w);
	u2 = u1 + (us * (float)w);
	vs = 1.0f / (float)image->h;
	v1 = vs * (float)(j * h);
	v2 = v1 + (vs * (float)h);

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
	if (g_CurrentImg != image) {
		Draw_Flush();
		g_CurrentImg = image;
	}
	QuadArray2D_AddQuad(g_QuadArray, x1, y1, u1, v1, x2, y2, u2, v2, g_Color);
}

/////////////////////////////
// Draw_DrawImgPartHoriz
//
// Draws an image part horizontally.
void Draw_DrawImgPartHoriz(DrawImg img, int x, int y, int w, int i, const float scale[2]) {
	DrawImage image = img;
	float x1, x2, y1, y2;
	float us, u1, u2;
	float v1 = 0.0f, v2 = 1.0f;

	// Prepare screen coordinates
	x1 = (float)x + ((float)image->x * scale[0]);
	y1 = (float)y + ((float)image->y * scale[1]);
	x2 = x1 + ((float)w * scale[0]);
	y2 = y1 + ((float)image->h * scale[1]);

	// Prepare image coordinates
	us = 1.0f / (float)image->w;
	u1 = us * (float)(i * w);
	u2 = u1 + (us * (float)w);

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
	if (g_CurrentImg != image) {
		Draw_Flush();
		g_CurrentImg = image;
	}
	QuadArray2D_AddQuad(g_QuadArray, x1, y1, u1, v1, x2, y2, u2, v2, g_Color);
}

/////////////////////////////
// Draw_ImgParallax
//
//
void Draw_ImgParallax(
	DrawImg img, int imgSize[2], const int imgOffset[2], const float parallaxFactor[2], const int gamePos[2],
	const int gameSize[2]) {
	int parallaxPos[2];
	int multiply[2];
	int x, y;

	parallaxPos[0] = (int)((float)gamePos[0] * parallaxFactor[0]) + imgOffset[0];
	parallaxPos[1] = (int)((float)gamePos[1] * parallaxFactor[1]) + imgOffset[1];

	multiply[0] = (int)floorf((float)parallaxPos[0] / (float)imgSize[0]);
	if (parallaxPos[0] < 0) {
		multiply[0]--;
	}
	multiply[1] = (int)floorf((float)parallaxPos[1] / (float)imgSize[1]);
	if (parallaxPos[1] < 0) {
		multiply[1]--;
	}

	y = (multiply[1] * imgSize[1]) - parallaxPos[1];
	while (y < gameSize[1]) {
		x = (multiply[0] * imgSize[0]) - parallaxPos[0];
		while (x < gameSize[0]) {
			Draw_DrawImgResized(img, x, y, (float)imgSize[0], (float)imgSize[1]);
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
	g_Color[0] = r;
	g_Color[1] = g;
	g_Color[2] = b;
	g_Color[3] = a;
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
// Creates an image with the default font.
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
				if (((fontData_8x8[c * 8 + y] >> (7 - x)) & 0x01) == 1) {
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
void Draw_FontScale(DrawFnt f, const float scale[2]) {
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
		x += (int)((float)font->w * font->scale[0]);
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
// Draw_SaveScreenshot
//
//
void Draw_SaveScreenshot(char *filename) {
#if USE_OpenGL
	unsigned char *pixelData;
	unsigned char *image_line;
	int i, half_height, line_size;

	pixelData = malloc(g_Width * g_Height * 4);

	glReadPixels(0, 0, g_Width, g_Height, GL_RGBA, GL_UNSIGNED_BYTE, pixelData);

	// Flip the image data
	line_size   = g_Width * 4;
	half_height = g_Height / 2;
	image_line  = malloc(line_size);
	for (i = 0; i < half_height; i++) {
		memcpy(image_line, pixelData + i * line_size, line_size);
		memcpy(pixelData + i * line_size, pixelData + (g_Height - (i + 1)) * line_size, line_size);
		memcpy(pixelData + (g_Height - (i + 1)) * line_size, image_line, line_size);
	}

	// Save the image
	if (EndsWith(filename, ".bmp") || EndsWith(filename, ".BMP")) {
		Draw_SaveRGBAToBMP(filename, pixelData, g_Width, g_Height);
	} else if (EndsWith(filename, ".png") || EndsWith(filename, ".PNG")) {
		Draw_SaveRGBAToPNG(filename, pixelData, g_Width, g_Height);
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
