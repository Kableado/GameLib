// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#ifdef WIN32
	// Windows
	#define _WIN32_WINNT 0x0501
	#include <windows.h>
	#include <GL/gl.h>
	#include <GL/glext.h>
	#define USE_OpenGL 1
	#define USE_OpenGLES 0
#else
#ifdef EMSCRIPTEN
	// Emscripten
	#include <GLES2/gl2.h>
	#define GL_GLEXT_PROTOTYPES 1
	#include <GLES2/gl2ext.h>
	#include <emscripten.h>
	#define USE_OpenGL 0
	#define USE_OpenGLES 1
#else
	// UNIX
	#include <GL/gl.h>
	#define USE_OpenGL 1
	#define USE_OpenGLES 0
#endif
#endif
#include "lodepng.c"
#include <SDL/SDL.h>

#include "Time.h"
#include "Util.h"
#include "QuadArray2D.h"
#include "Audio.h"
#include "Input.h"
#include "Draw.h"


////////////////////////////////////////////////
// DrawImage //
///////////////
// Image container.
typedef struct TDrawImage TDrawImage, *DrawImage;
struct TDrawImage {
	unsigned char *data;
	int x,y;
	int w,h;
	GLuint tex;
};



// Globals
SDL_Surface *_screen=NULL;
int _width;
int _height;
long long proc_t_frame=33333;
long long draw_t_frame=16667;
int _fps=60;
QuadArray2D _quadArray=NULL;
DrawImage _currentImg=NULL;
float _color[4];

#if USE_OpenGLES

GLuint Draw_CompileShader(GLenum type, const char *source){
	GLuint shader = glCreateShader(type);
	if (shader == 0) {
		return 0;
	}

	//load the shader source to the shader object and compile it
	glShaderSource(shader, 1, &source, NULL);
	glCompileShader(shader);

	//check if the shader compiled successfully
	GLint compiled;
	glGetShaderiv(shader, GL_COMPILE_STATUS, &compiled);
	if (!compiled) {
		glDeleteShader(shader);
		return 0;
	}

	return shader;
}


GLuint Draw_BuildProgram(
	const char *vertexShaderSource,
	const char *fragmentShaderSource)
{
	// Compile shaders
	GLuint vertexShader = Draw_CompileShader(GL_VERTEX_SHADER, vertexShaderSource);
	GLuint fragmentShader = Draw_CompileShader(GL_FRAGMENT_SHADER, fragmentShaderSource);
	if(vertexShader==0 || fragmentShader==0){
		return 0;
	}

	//create a GL program and link it
	GLuint programObject = glCreateProgram();
	glAttachShader(programObject, vertexShader);
	glAttachShader(programObject, fragmentShader);
	glLinkProgram(programObject);

	//check if the program linked successfully
	GLint linked;
	glGetProgramiv(programObject, GL_LINK_STATUS, &linked);
	if (!linked)
	{
		glDeleteProgram(programObject);
		return 0;
	}
	return programObject;
}

GLuint vertPosLoc;
GLuint vertTexLoc;
GLuint vertColorLoc;

GLuint textureLoc;
GLuint projectionMatrixLoc;


GLuint vertexObject;

#define Max_Vertices 6000

#endif

/////////////////////////////
// Draw_Init
//
// Initializes the game window.
int Draw_Init(int width,int height,char *title,int pfps,int fps){
#ifdef WIN32
	// Stdout on the parent console
	AttachConsole(ATTACH_PARENT_PROCESS);
	if(GetStdHandle(STD_OUTPUT_HANDLE)!=0){
		fclose(stdin);
		fclose(stdout);
		fclose(stderr);
		freopen("CONIN$","r",stdin);
		freopen("CONOUT$","w",stdout);
		freopen("CONOUT$","w",stderr);
	}
#endif

	// Set globals
	proc_t_frame=1000000/pfps;
	draw_t_frame=1000000/fps;
	_fps=fps;
	_width=width;
	_height=height;

	// Initialize SDL
	if(SDL_Init(SDL_INIT_VIDEO)<0){
		printf("Draw_Init: Failure initializing SDL.\n");
		printf("\tSDL Error: %s\n",SDL_GetError());
		return(0);
	}

#if USE_OpenGL
	// Prepare OpenGL inicialization
	SDL_GL_SetAttribute (SDL_GL_RED_SIZE, 8);
	SDL_GL_SetAttribute (SDL_GL_GREEN_SIZE, 8);
	SDL_GL_SetAttribute (SDL_GL_BLUE_SIZE, 8);
	SDL_GL_SetAttribute (SDL_GL_ALPHA_SIZE, 8);
	SDL_GL_SetAttribute (SDL_GL_DEPTH_SIZE, 24);
	SDL_GL_SetAttribute (SDL_GL_STENCIL_SIZE, 8);
	SDL_GL_SetAttribute (SDL_GL_DOUBLEBUFFER, 1);
#endif

	// Initialize video mode
	_screen=SDL_SetVideoMode(width,height,32,SDL_HWSURFACE|SDL_OPENGL);
	if( _screen == NULL){
		printf("Draw_Init: Failure initializing video mode.\n");
		printf("\tSDL Error: %s\n",SDL_GetError());
		return(0);
	}
	SDL_WM_SetCaption(title, NULL);

#if USE_OpenGL
	// Set the desired state
	glHint(GL_PERSPECTIVE_CORRECTION_HINT, GL_NICEST);
	glDisable(GL_CULL_FACE);
	glEnable(GL_TEXTURE_2D);
	glDisable(GL_LIGHTING);
	glDisable(GL_DEPTH_TEST);
	glDepthMask( GL_FALSE);

	// Triplebuffer swap
	glClear(GL_COLOR_BUFFER_BIT);
	SDL_GL_SwapBuffers();
	glClear(GL_COLOR_BUFFER_BIT);
	SDL_GL_SwapBuffers();
	glClear(GL_COLOR_BUFFER_BIT);
	SDL_GL_SwapBuffers();
	glClear(GL_COLOR_BUFFER_BIT);

	// Show device info
	char *str;
	printf("\n*********************************\n");
	printf("*** Draw Info\n");
	str=(char *)glGetString(GL_VENDOR);
	printf(" Vendor: %s\n",str);
	str=(char *)glGetString(GL_RENDERER);
	printf(" Renderer: %s\n",str);
	str=(char *)glGetString(GL_VERSION);
	printf(" Version: %s\n",str);
	printf("*********************************\n");

	// Set the proyection (Ortographic)
	glMatrixMode (GL_PROJECTION);
	glLoadIdentity ();
	glOrtho (0,_width, 0, _height, -1000, 1000);
	glMatrixMode (GL_MODELVIEW);
	glLoadIdentity ();

	glEnableClientState(GL_COLOR_ARRAY);
	glEnableClientState(GL_TEXTURE_COORD_ARRAY);
	glEnableClientState(GL_VERTEX_ARRAY);

#else

	// Show device info
	char *str;
	printf("\n*********************************\n");
	printf("*** Draw Info\n");
	str=(char *)glGetString(GL_VENDOR);
	printf(" Vendor: %s\n",str);
	str=(char *)glGetString(GL_RENDERER);
	printf(" Renderer: %s\n",str);
	str=(char *)glGetString(GL_VERSION);
	printf(" Version: %s\n",str);
	printf("*********************************\n");

	const char vertexShaderSource[] =
		"attribute vec4 aPosition;      \n"
		"attribute vec2 aTexCoord;      \n"
		"attribute vec4 aColor;         \n"
		"varying vec2 vTexCoord;        \n"
		"varying vec4 vColor;           \n"
		"uniform mat4 sProjectionMatrix; \n"
		"void main() {                  \n"
		"   gl_Position = aPosition *   \n"
		"            sProjectionMatrix;  \n"
		"   vTexCoord = aTexCoord;      \n"
		"   vColor = aColor;            \n"
		"}                              \n";

	const char fragmentShaderSource[] =
		"precision mediump float;                                \n"
		"varying vec2 vTexCoord;                                 \n"
		"varying vec4 vColor;                                    \n"
		"uniform sampler2D sTexture;                             \n"
		"void main() {                                           \n"
		"  gl_FragColor = texture2D(sTexture, vTexCoord)*vColor; \n"
		"}                                                       \n";

	GLuint programObject=Draw_BuildProgram(
		vertexShaderSource,
		fragmentShaderSource);
	glUseProgram(programObject);

	vertPosLoc = glGetAttribLocation(programObject, "aPosition");
	vertTexLoc = glGetAttribLocation(programObject, "aTexCoord");
	vertColorLoc = glGetAttribLocation(programObject, "aColor");

	textureLoc = glGetUniformLocation(programObject, "sTexture");
	projectionMatrixLoc = glGetUniformLocation(programObject, "sProjectionMatrix");

	glGenBuffers(1, &vertexObject);
	glBindBuffer(GL_ARRAY_BUFFER, vertexObject );
	glBufferData(GL_ARRAY_BUFFER, Vertex2D_Length*sizeof(float)*Max_Vertices,
		NULL, GL_DYNAMIC_DRAW);

	glBindBuffer(GL_ARRAY_BUFFER, vertexObject );

	glVertexAttribPointer(vertPosLoc, 2, GL_FLOAT,GL_FALSE,
		Vertex2D_Length*sizeof(float), (void*)(0*sizeof(float)));
	glVertexAttribPointer(vertTexLoc, 2, GL_FLOAT, GL_FALSE,
		Vertex2D_Length*sizeof(float), (void*)(2*sizeof(float)));
	glVertexAttribPointer(vertColorLoc, 4, GL_FLOAT, GL_FALSE,
		Vertex2D_Length*sizeof(float), (void*)(4*sizeof(float)));

	glEnableVertexAttribArray(vertPosLoc);
	glEnableVertexAttribArray(vertTexLoc);
	glEnableVertexAttribArray(vertColorLoc);

	glUniform1i(textureLoc, 0);

	GLfloat projectionMatrix[16]={
			2.0f/(float)_width, 0.0, 0.0, -1.0,
			0.0, 2.0/(float)_height, 0.0, -1.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		};
	glUniformMatrix4fv(projectionMatrixLoc,
		1, GL_FALSE, projectionMatrix);

#endif

	// Enable Alpha blending
	glEnable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA,GL_ONE_MINUS_SRC_ALPHA);

	// Initialize the triangle array
	_quadArray=QuadArray2D_Create(400);

	Draw_SetColor(1.0f,1.0f,1.0f,1.0f);

	return(1);
}



/////////////////////////////
// Draw_UploadGLTexture
//
// Uploads a OpenGL texture.
GLuint Draw_UploadGLTexture(int w, int h, unsigned char *pixels){
	GLuint tex;

	// Generate OpenGL texture
	glGenTextures(1, &tex);
	glBindTexture(GL_TEXTURE_2D, tex);
	glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MAG_FILTER,GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MIN_FILTER,GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);

	// Load OpenGL texture
	glBindTexture(GL_TEXTURE_2D, tex);
#if USE_OpenGL
	glPixelStorei( GL_UNPACK_ROW_LENGTH, w );
#endif
	glPixelStorei( GL_UNPACK_ALIGNMENT, 1 );
	glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA,
				 w, h, 0,
				 GL_RGBA, GL_UNSIGNED_BYTE, pixels);

	return(tex);
}


/////////////////////////////
// Draw_Flush
//
// Performs all the queued draw actions.
void Draw_Flush(){
	if(_currentImg==NULL || _quadArray->nVertex<=0){
		return;
	}
	if(_currentImg->tex==-1){
		_currentImg->tex=Draw_UploadGLTexture(_currentImg->w, _currentImg->h, _currentImg->data);
	}

#if USE_OpenGL
	// Draw the quad array
	glBindTexture(GL_TEXTURE_2D, _currentImg->tex);
	glColorPointer( 4, GL_FLOAT, Vertex2D_Length*sizeof(float),
		(GLvoid *)(_quadArray->vertexData+4) );
	glTexCoordPointer( 2, GL_FLOAT, Vertex2D_Length*sizeof(float),
		(GLvoid *)(_quadArray->vertexData+2) );
	glVertexPointer( 2, GL_FLOAT, Vertex2D_Length*sizeof(float),
		(GLvoid *)(_quadArray->vertexData) );
	glDrawArrays(GL_TRIANGLES,0,_quadArray->nVertex);

#else

	// Draw the quad array
	glBindTexture(GL_TEXTURE_2D, _currentImg->tex);
	glBufferSubData(GL_ARRAY_BUFFER, 0,
		Vertex2D_Length*sizeof(float)*_quadArray->nVertex,
		_quadArray->vertexData);
	glDrawArrays(GL_TRIANGLES, 0, _quadArray->nVertex);

#endif

	// Empty it
	QuadArray2D_Clean(_quadArray);
}


/////////////////////////////
// Draw_Clean
//
// Cleans the game window.
void Draw_Clean(
	unsigned char r,
	unsigned char g,
	unsigned char b)
{
#ifndef EMSCRIPTEN
	glClearColor(r/255.0f,g/255.0f,b/255.0f,1.0f);
	glClear(GL_COLOR_BUFFER_BIT);
#else
	Draw_Flush();
	float fr=r/255.0f;
	float fg=g/255.0f;
	float fb=b/255.0f;
	GLfloat vVertices[] = {
		 0.0,  0.0,  // Position 0
		 0.0,  0.0,  // TexCoord 0
		 fr,  fg,  fb,  1.0, // Color

		 0.0, _height,  // Position 1
		 0.0,  1.0,  // TexCoord 1
		 fr,  fg,  fb,  1.0, // Color

		 _width, _height,  // Position 2
		 1.0,  1.0,  // TexCoord 2
		 fr,  fg,  fb,  1.0, // Color

		 _width, _height,  // Position 2
		 1.0,  1.0,  // TexCoord 2
		 fr,  fg,  fb,  1.0, // Color

		 _width,  0.0,  // Position 3
		 1.0,  0.0,  // TexCoord 3
		 fr,  fg,  fb,  1.0, // Color

		 0.0,  0.0,  // Position 0
		 0.0,  0.0,  // TexCoord 0
		 fr,  fg,  fb,  1.0, // Color
	};
	glBufferSubData(GL_ARRAY_BUFFER, 0, sizeof(vVertices), vVertices);
	glDrawArrays(GL_TRIANGLES, 0, 6);
#endif
}


/////////////////////////////
// Draw_LoopIteration
//
// One iteracion of the loop updating the game window.
int (*_proc_func)()=NULL;
void (*_draw_func)(float f)=NULL;
long long _accTime;
int Draw_LoopIteration(){
	SDL_Event event;
	Uint8* keys;
	int done=0;
	// Update screen
	SDL_GL_SwapBuffers();

	// Process Events
	while(SDL_PollEvent(&event) ){
		if(event.type == SDL_QUIT ){
			done=1;
		}
		if(event.type == SDL_KEYDOWN ){
			if(event.key.keysym.sym == SDLK_ESCAPE ) {
				done=1;
			}
		}
	}

#ifndef EMSCRIPTEN
	// Process keys for Draw
	keys=(Uint8 *)SDL_GetKeyState(NULL);
	if(keys[SDLK_F12]){
		// Screenshot key
		Draw_SaveScreenshoot("shot.bmp");
	}
#endif

	// Sound Frame
	Audio_Frame();

	// Process
	if(_proc_func){
		if(_accTime>100000){
			_accTime=100000;
		}
		while(_accTime>=proc_t_frame && !done){
			Input_Frame();
			if(!_proc_func()){
				done=1;
			}
			_accTime-=proc_t_frame;
		}
	}

	// Draw
	if(_draw_func){
		float frameFactor=0.0f;
		frameFactor=(float)_accTime/(float)proc_t_frame;
		_draw_func(frameFactor);
		Draw_Flush();
	}

	return done;
}

#ifdef EMSCRIPTEN
long long _procTime1;
long long _procTime2;
void Draw_LoopIterationAux(){
	Draw_LoopIteration();

	// Update time
	_procTime2=Time_GetTime();
	_accTime+=_procTime2-_procTime1;
	_procTime1=_procTime2;
}
#endif

/////////////////////////////
// Draw_Loop
//
// Loops updating the game window.
void Draw_Loop(int (*proc)(),void (*draw)(float f)){
	long long newTime;
	long long procTime1,procTime2,drawTime1,drawTime2,waitTime;

	_proc_func=proc;
	_draw_func=draw;
#ifndef EMSCRIPTEN
	_accTime=proc_t_frame;
	procTime1=drawTime1=Time_GetTime();
	while(!Draw_LoopIteration()){

		// Wait to round draw_t_frame
		drawTime2=Time_GetTime();
		waitTime=draw_t_frame-(drawTime2-drawTime1);
		Time_Pause(waitTime);
		drawTime2=Time_GetTime();
		drawTime1=drawTime2;

		// Update time
		procTime2=Time_GetTime();
		_accTime+=procTime2-procTime1;
		procTime1=procTime2;
	}
#else
	_accTime=proc_t_frame;
	_procTime1=Time_GetTime();
	emscripten_set_main_loop(Draw_LoopIterationAux, _fps, 1);
#endif
}


/////////////////////////////
// Draw_CreateImage
//
DrawImg Draw_CreateImage(int w,int h){
	DrawImage image;

	// Create the image container
	image=malloc(sizeof(TDrawImage));
	image->data=malloc(w*h*4);
	image->x=0;
	image->y=0;
	image->w=w;
	image->h=h;
	image->tex=-1;

	return((DrawImg)image);
}


/////////////////////////////
// Draw_LoadImage
//
// Loads a image, giving a reference.
DrawImg Draw_LoadImage(char *filename){
	DrawImage image;

	// Try loading PNG images
	if(EndsWith(filename,".png") || EndsWith(filename,".PNG")){
		image=malloc(sizeof(TDrawImage));
		unsigned error = lodepng_decode32_file(
			&image->data,
			(unsigned*)&image->w,
			(unsigned*)&image->h,
			filename);
		if(error){
			printf("Draw_LoadImage: PNG decoder error %u: %s\n", error, lodepng_error_text(error));
			return(NULL);
		}
		image->x=-(int)(image->w/2);
		image->y=-(int)(image->h/2);
		image->tex=-1;
		return (DrawImg)image;
	}

	printf("Draw_LoadImage: Image type not supported: %s\n",filename);
	return(NULL);
}


/////////////////////////////
// Draw_GetSize
//
// Gets the image size.
void Draw_GetSize(DrawImg img,int *w,int *h){
	DrawImage image=img;

	// Gets the image size
	*w=image->w;
	*h=image->h;
}


/////////////////////////////
// Draw_SetOffset
// Draw_GetOffset
//
// Sets and Gets the image offset.
void Draw_SetOffset(DrawImg img,int  x,int  y){
	DrawImage image=img;

	// Sets the image offset
	image->x=x;
	image->y=y;
}
void Draw_GetOffset(DrawImg img,int *x,int *y){
	DrawImage image=img;

	// Gets the image offset
	*x=image->x;
	*y=image->y;
}


/////////////////////////////
// Draw_DrawImg
//
// Draws an image.
void Draw_DrawImg(DrawImg img,int x,int y){
	DrawImage image=img;
	float x1,x2,y1,y2;

	// Prepare
	x1=x+image->x;
	y1=_height-(y+image->y);
	x2=(x+image->x)+image->w;
	y2=_height-((y+image->y)+image->h);

	// Draw a quad
	if(_currentImg!=image){
		Draw_Flush();
		_currentImg=image;
	}
	QuadArray2D_AddQuad(_quadArray,
		x1,y1,0.0f,0.0f,
		x2,y2,1.0f,1.0f,
		_color);
}


/////////////////////////////
// Draw_DrawImgResized
//
// Draws an image, resizing.
void Draw_DrawImgResized(DrawImg img,int x,int y,float w,float h){
	DrawImage image=img;
	int x1,x2,y1,y2;

	// Prepare
	x1=x+image->x;
	y1=_height-(y+image->y);
	x2=(x+image->x)+w;
	y2=_height-((y+image->y)+h);

	// Draw a quad
	if(_currentImg!=image){
		Draw_Flush();
		_currentImg=image;
	}
	QuadArray2D_AddQuad(_quadArray,
		x1,y1,0.0f,0.0f,
		x2,y2,1.0f,1.0f,
		_color);
}



/////////////////////////////
// Draw_DrawImgPart
//
// Draws an image part.
void Draw_DrawImgPart(DrawImg img,int x,int y,int w,int i){
	DrawImage image=img;
	int x1,x2,y1,y2;
	float us,u1,u2;

	// Prepare
	x1=x+image->x;
	y1=_height-(y+image->y);
	x2=(x+image->x)+w;
	y2=_height-((y+image->y)+image->h);
	us=1.0f/image->w;
	u1=us*i*w;
	u2=u1+us*w;

	// Draw a quad
	if(_currentImg!=image){
		Draw_Flush();
		_currentImg=image;
	}
	QuadArray2D_AddQuad(_quadArray,
		x1,y1,u1,0.0f,
		x2,y2,u2,1.0f,
		_color);
}


/////////////////////////////
// Draw_SetColor
//
//
void Draw_SetColor(float r,float g,float b,float a){
	_color[0]=r;
	_color[1]=g;
	_color[2]=b;
	_color[3]=a;
}


////////////////////////////////////////////////
// DrawFnt //
/////////////
// Reference to a Font.
typedef struct {
	DrawImage img;
	int w,h;
	int min,max;
} DrawFont;


/////////////////////////////
// Draw_DefaultImage
//
// Creates a image with the default font.
#include "FontData.h"
DrawImage Draw_DefaultFontImage(
	unsigned char r,
	unsigned char g,
	unsigned char b,
	unsigned char a)
{
	DrawImage img;
	int x,y,c;
	Uint32 color,color2;

	// Create the image and colors
	img=Draw_CreateImage(8*256,8);

	// Draw the font
	for(c=0;c<256;c++){
		for(y=0;y<8;y++){
			for(x=0;x<8;x++){
				int offset=((c*8+x)+(8*256*y))*4;
				img->data[offset+0]=r;
				img->data[offset+1]=g;
				img->data[offset+2]=b;
				if(((fontdata_8x8[c*8+y]>>(7-x)) & 0x01)==1){
					img->data[offset+3]=0xFF;
				}else{
					img->data[offset+3]=0x00;
				}
			}
		}
	}

	return(img);
}


/////////////////////////////
// Draw_DefaultFont
//
// Creates the default font.
DrawFnt Draw_DefaultFont(
	unsigned char r,
	unsigned char g,
	unsigned char b,
	unsigned char a)
{
	DrawFont *font;

	// Create the default font
	font=malloc(sizeof(DrawFont));
	font->img=Draw_DefaultFontImage(r,g,b,a);
	font->w=8;
	font->h=8;
	font->min=0;
	font->max=256;

	return((DrawFnt)font);
}

/////////////////////////////
// Draw_LoadFont
//
// Load a font from a file.
DrawFnt Draw_LoadFont(char *fichero,int min,int max){
	DrawFont *font;

	// Create the font form the image
	font=malloc(sizeof(DrawFont));
	font->img=Draw_LoadImage(fichero);
	font->w=font->img->w/(max-min);
	font->h=font->img->h;
	font->min=min;
	font->max=max;

	return((DrawFnt)font);
}


/////////////////////////////
// Draw_DrawText
//
// Draws text using a font.
void Draw_DrawText(DrawFnt f,char *text,int x,int y){
	DrawFont *font=f;
	char *ptr;

	// Iterate the string
	ptr=text;
	while(*ptr){
		if((*ptr)<font->max){
			Draw_DrawImgPart(font->img,x,y,font->w,(*ptr)-font->min);
		}
		x+=font->w;
		ptr++;
	}
}


/////////////////////////////
// Draw_SaveScreenshoot
//
//
void Draw_SaveScreenshoot(char *filename){
#if USE_OpenGL
	SDL_Surface *surf;
	unsigned char *image_line;
	int i,half_height,line_size;

	// Create the surface
	surf = SDL_CreateRGBSurface(SDL_SWSURFACE,
		_width, _height, 32,0,0,0,0);
	surf->format->Amask=0xFF000000;
	surf->format->Ashift=24;
	SDL_SetAlpha(surf, SDL_SRCALPHA, 255);

	// Get the screenshot
	SDL_LockSurface(surf);
	glReadPixels(0, 0,
		_width, _height, GL_RGBA,
		GL_UNSIGNED_BYTE, surf->pixels);
	SDL_UnlockSurface(surf);

	// Flip the image data
	line_size=_width*4;
	half_height=_height/2;
	image_line=malloc(line_size);
	for(i=0;i<half_height;i++){
		memcpy(image_line,surf->pixels+i*line_size,line_size);
		memcpy(surf->pixels+i*line_size,surf->pixels+(_height-(i+1))*line_size,line_size);
		memcpy(surf->pixels+(_height-(i+1))*line_size,image_line,line_size);
	}

	// Swap RGB to BGR
	Uint32 *ptr,*ptr_end;
	ptr=(Uint32 *)surf->pixels;
	ptr_end=ptr+(surf->w*surf->h);
	while (ptr<ptr_end) {
		unsigned char temp;
		unsigned char *pixel;
		pixel=(unsigned char *)ptr;
		temp=pixel[2];
		pixel[2]=pixel[0];
		pixel[0]=temp;
		ptr++;
	}

	// Save the image
	SDL_SaveBMP(surf,filename);

	// Cleanup
	SDL_FreeSurface(surf);
#endif
}



