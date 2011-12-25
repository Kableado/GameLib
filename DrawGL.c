// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <math.h>
#include <stdlib.h>
#include <string.h>

#ifdef WIN32
	#define _WIN32_WINNT 0x0501
	#include <windows.h>
	#include <GL/gl.h>
	#include <GL/glext.h>
#else
#ifdef MACOSX
	#include <Cocoa/Cocoa.h>
	#include <OpenGL/OpenGL.h>
	#include <OpenGL/gl.h>
	#include <OpenGL/glu.h>
	#include <OpenGL/glext.h>
#else
	#include <GL/gl.h>
#endif
#endif
#include <SDL/SDL.h>

#include "Time.h"
#include "Util.h"
#include "Draw.h"
#include "Input.h"
#include "Audio.h"


// Globals
SDL_Surface *_screen=NULL;
int _width;
int _height;
long long _t_frame=17000;

/////////////////////////////
// Draw_Init
//
// Initializes the game window.
int Draw_Init(int width,int height,char *title,int fps){
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

	// Initialize SDL
	if(SDL_Init(SDL_INIT_VIDEO)<0){
		printf("Draw_Init: Failure initializing SDL.\n");
		printf("Draw_Init: SDL Error: %s\n",SDL_GetError());
		return(0);
	}


	// Prepare OpenGL inicialization
	SDL_GL_SetAttribute (SDL_GL_RED_SIZE, 8);
	SDL_GL_SetAttribute (SDL_GL_GREEN_SIZE, 8);
	SDL_GL_SetAttribute (SDL_GL_BLUE_SIZE, 8);
	SDL_GL_SetAttribute (SDL_GL_ALPHA_SIZE, 8);
	SDL_GL_SetAttribute (SDL_GL_DEPTH_SIZE, 24);
	SDL_GL_SetAttribute (SDL_GL_STENCIL_SIZE, 8);
	SDL_GL_SetAttribute (SDL_GL_SWAP_CONTROL, 0);
	SDL_GL_SetAttribute (SDL_GL_DOUBLEBUFFER, 1);


	// Initialize video mode
	_screen=SDL_SetVideoMode(width,height,32,SDL_HWSURFACE|SDL_OPENGL);
	if( _screen == NULL){
		printf("Draw_Init: Failure initializing video mode.\n");
		printf("Draw_Init: SDL Error: %s\n",SDL_GetError());
		return(0);
	}
	SDL_WM_SetCaption(title, NULL);
	_t_frame=1000000/fps;
	_width=width;
	_height=height;

	// Set the desired state
	glHint(GL_PERSPECTIVE_CORRECTION_HINT, GL_NICEST);
	glEnable(GL_CULL_FACE);
	glEnable(GL_TEXTURE_2D);
	glDisable(GL_LIGHTING);
	glDisable(GL_DEPTH_TEST);
	glDepthMask( GL_FALSE);

	// Triplebuffer swap
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
	glPushMatrix ();
	glLoadIdentity ();
	glOrtho (0,width, 0, height, -1000, 1000);
	glMatrixMode (GL_MODELVIEW);
	glPushMatrix ();
	glLoadIdentity ();

	// Enable Alpha blending
	glEnable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA,GL_ONE_MINUS_SRC_ALPHA);

	return(1);
}


/////////////////////////////
// Draw_Loop
//
// Loops updating the game window.
void Draw_Loop(int (*proc)(),void (*draw)()){
	int done=0;
	SDL_Event event;
	Uint8* keys;
	long long time,time2;
	long long t_frame=0;

	t_frame=0;
	while(!done){

		// Update screen
		time=Time_GetTime();
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

		// Process keys for Draw
		keys=SDL_GetKeyState(NULL);
		if(keys[SDLK_F12]){
			// Screenshot key
			SDL_SaveBMP(_screen,"shot.bmp");
		}

		// Input and sound Frame
		Input_Frame();
		Audio_Frame();

		// Process
		time2=Time_GetTime();
		t_frame+=time2-time;
		time=time2;
		if(proc){
			while(t_frame>_t_frame && !done){
				if(!proc()){
					done=1;
				}
				t_frame-=_t_frame;
			}
		}

		// Draw
		draw();

		Time_Pause(0);
		t_frame+=Time_GetTime()-time;
	}
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
	glClearColor(r/256.0f,g/256.0f,b/256.0f,1.0f);
	glClear(GL_COLOR_BUFFER_BIT);
}



////////////////////////////////////////////////
// DrawImage //
///////////////
// Image container.
typedef struct Tag_DrawImage {
	SDL_Surface *surf;
	GLuint tex;
	int x,y;
} DrawImage;


/////////////////////////////
// Draw_LoadSurface
//
// Loads a surface.
SDL_Surface *Draw_LoadSurface(char *filename){
	SDL_Surface *surf;

	// Load the BMP as a surface
	surf=SDL_LoadBMP(filename);
	if(surf == NULL){
		printf("Draw_LoadImage: Failure Loading image: %s\n",filename);
		printf("Draw_LoadImage: SDL Error: %s\n",SDL_GetError());
		return(NULL);
	}

	if (surf->format->BytesPerPixel==4) {
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
	}

	return(surf);
}


/////////////////////////////
// Draw_UploadGLTexture
//
// Uploads a OpenGL texture.
GLuint Draw_UploadGLTexture(SDL_Surface *surf){
	GLuint tex;

	// Generate OpenGL texture
	glGenTextures(1, &tex);
	glBindTexture(GL_TEXTURE_2D, tex);
	glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MAG_FILTER,GL_LINEAR);
	//glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MAG_FILTER,GL_NEAREST);
	glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MIN_FILTER,GL_LINEAR);
	//glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MIN_FILTER,GL_NEAREST);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);


	// Load OpenGL texture
	glBindTexture(GL_TEXTURE_2D, tex);
	glPixelStorei( GL_UNPACK_ROW_LENGTH, surf->w );
	glPixelStorei( GL_UNPACK_ALIGNMENT, 1 );
	//glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA8,
	//			 surf->w, surf->h, 0,
	//			 GL_RGBA, GL_UNSIGNED_BYTE, surf->pixels);
	glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA,
				 surf->w, surf->h, 0,
				 GL_RGBA, GL_UNSIGNED_BYTE, surf->pixels);
	//glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB8,
	//			imagen->ancho, imagen->alto, 0,
	//			GL_RGB, GL_UNSIGNED_BYTE, imagen->data);

	return(tex);
}


/////////////////////////////
// Draw_LoadImage
//
// Loads a image, giving a reference.
DrawImg Draw_LoadImage(char *filename){
	DrawImage *image;
	SDL_Surface *surf;


	// Loads the surface
	surf=Draw_LoadSurface(filename);
	if(surf == NULL){
		return(NULL);
	}


	// Create the image container
	image=malloc(sizeof(DrawImage));
	image->surf=surf;
	image->tex=Draw_UploadGLTexture(surf);
	image->x=0;
	image->y=0;


	return((DrawImg)image);
}


/////////////////////////////
// Draw_GetSize
//
// Gets the image size.
void Draw_GetSize(DrawImg img,int *w,int *h){
	DrawImage *image=img;

	// Gets the image size
	*w=image->surf->w;
	*h=image->surf->h;
}


/////////////////////////////
// Draw_SetOffset
// Draw_GetOffset
//
// Sets and Gets the image offset.
void Draw_SetOffset(DrawImg img,int  x,int  y){
	DrawImage *image=img;

	// Sets the image offset
	image->x=x;
	image->y=y;
}
void Draw_GetOffset(DrawImg img,int *x,int *y){
	DrawImage *image=img;

	// Gets the image offset
	*x=image->x;
	*y=image->y;
}


/////////////////////////////
// Draw_DrawImg
//
// Draws an image.
void Draw_DrawImg(DrawImg img,int x,int y){
	DrawImage *image=img;
	int x1,x2,y1,y2;

	// Prepare
	x1=x+image->x;
	y1=_height-(y+image->y);
	x2=(x+image->x)+image->surf->w;
	y2=_height-((y+image->y)+image->surf->h);

	// Draw a quad
	glBindTexture(GL_TEXTURE_2D, image->tex);
	glBegin (GL_QUADS);
		glTexCoord2f (1, 0);
		glVertex2i (x2, y1);

		glTexCoord2f (0, 0);
		glVertex2i (x1, y1);

		glTexCoord2f (0, 1);
		glVertex2i (x1, y2);

		glTexCoord2f (1, 1);
		glVertex2i (x2, y2);
	glEnd ();
}


/////////////////////////////
// Draw_DrawImgPart
//
// Draws an image part.
void Draw_DrawImgPart(DrawImg img,int x,int y,int w,int i){
	DrawImage *image=img;
	int x1,x2,y1,y2;
	float us,u1,u2;

	// Prepare
	x1=x+image->x;
	y1=_height-(y+image->y);
	x2=(x+image->x)+w;
	y2=_height-((y+image->y)+image->surf->h);
	us=1.0f/image->surf->w;
	u1=us*i*w;
	u2=u1+us*w;

	// Draw a quad
	glBindTexture(GL_TEXTURE_2D, image->tex);
	glBegin (GL_QUADS);
		glTexCoord2f (u2, 0);
		glVertex2i (x2, y1);

		glTexCoord2f (u1, 0);
		glVertex2i (x1, y1);

		glTexCoord2f (u1, 1);
		glVertex2i (x1, y2);

		glTexCoord2f (u2, 1);
		glVertex2i (x2, y2);
	glEnd ();
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
// Draw_DefaultFont
//
// Creates a surface with the default font.
#include "FontData.h"
SDL_Surface *Draw_DefaultFontSurface(
	unsigned char r,
	unsigned char g,
	unsigned char b,
	unsigned char a)
{
	SDL_Surface *surf;
	int x,y,c;
	Uint32 color,color2;

	// Create the surface
	surf = SDL_CreateRGBSurface(SDL_SWSURFACE,
		8*256, 8, 32,0,0,0,0);
	surf->format->Amask=0xFF000000;
	surf->format->Ashift=24;
	SDL_SetAlpha(surf, SDL_SRCALPHA, 255);

	// HACK: Set the colors in BGR order
	color =SDL_MapRGBA(surf->format,b,g,r,a);
	color2=SDL_MapRGBA(surf->format,b,g,r,0);

	// Draw the font
	SDL_LockSurface(surf);
	for(c=0;c<256;c++){
		for(y=0;y<8;y++){
			for(x=0;x<8;x++){
				if(((fontdata_8x8[c*8+y]>>(7-x)) & 0x01)==1){
					//Imagen_PutPixel(dest,c*8+x,y,color);
					((Uint32 *)surf->pixels)[(c*8+x)+(8*256*y)]=
						color;
				}else{
					//Imagen_PutPixel(dest,c*8+x,y,color2);
					((Uint32 *)surf->pixels)[(c*8+x)+(8*256*y)]=
						color2;
				}
			}
		}
	}
	SDL_UnlockSurface(surf);

	return(surf);
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
	font->img.surf=Draw_DefaultFontSurface(r,g,b,a);
	font->img.tex=Draw_UploadGLTexture(font->img.surf);
	font->img.x=0;
	font->img.y=0;
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
	font->img.surf=Draw_LoadSurface(fichero);
	font->img.tex=Draw_UploadGLTexture(font->img.surf);
	font->img.x=0;
	font->img.y=0;
	font->w=font->img.surf->w/(max-min);
	font->h=font->img.surf->h;
	font->min=min;
	font->max=max;

	return((DrawFnt)font);
}


/////////////////////////////
// Draw_DrawText
//
// Draws text using a font
void Draw_DrawText(DrawFnt f,char *text,int x,int y){
	DrawFont *font=f;
	char *ptr;

	// Iterate the string
	ptr=text;
	while(*ptr){
		if((*ptr)<font->max){
			Draw_DrawImgPart((DrawImg)&font->img,x,y,font->w,(*ptr)-font->min);
		}
		x+=font->w;
		ptr++;
	}
}

