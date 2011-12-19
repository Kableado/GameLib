#ifdef WIN32
	#define _WIN32_WINNT 0x0501
	#include <windows.h>
#endif
#include <SDL/SDL.h>
#include <time.h>

#include "Time.h"
#include "Util.h"
#include "Draw.h"
#include "Input.h"
#include "Audio.h"


// Globals
SDL_Surface *_screen=NULL;
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

	// Initialize video mode
	_screen=SDL_SetVideoMode(width,height,32,SDL_HWSURFACE);
	if( _screen == NULL){
		printf("Draw_Init: Failure initializing video mode.\n");
		printf("Draw_Init: SDL Error: %s\n",SDL_GetError());
		return(0);
	}
	SDL_WM_SetCaption(title, NULL);
	_t_frame=1000000/fps;


	return(1);
}


/////////////////////////////
// Draw_Loop
//
// Loops updating the game window.
void Draw_Loop(int (*proc)()){
	int done=0;
	SDL_Event event;
	Uint8* keys;
	long long t_framestart;
	long long t_frame;
	long long t_swap;
	long long t_proc;
	int f_count;

	t_framestart=Time_GetTime();

	while(!done){

		// Update screen
		t_swap=Time_GetTime();
		SDL_Flip(_screen);
		t_swap=Time_GetTime()-t_swap;

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

		// Process loop, with frameskip for slow swapping systems
		t_proc=Time_GetTime();
		if(!proc()){
			done=1;
		}
		f_count=(t_swap/_t_frame);
		while(f_count>0 && !done){
			if(!proc()){
				done=1;
			}
			f_count--;
			t_framestart+=_t_frame;
		}
		t_proc=Time_GetTime()-t_proc;
		t_framestart+=_t_frame*(t_proc/_t_frame);


		// Sleep to limit frames
		t_frame=Time_GetTime()-t_framestart;
		if(t_frame<_t_frame){
			Time_Pause(_t_frame-t_frame);
		}else{
			Time_Pause(0);
		}
		t_framestart=Time_GetTime();
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
	SDL_Rect rect;

	// Draw a full rectangle
	rect.x=0;
	rect.y=0;
	rect.w=_screen->w;
	rect.h=_screen->h;
	SDL_FillRect(_screen, &rect,
		 SDL_MapRGB(_screen->format, r, g, b));
}

////////////////////////////////////////////////
// DrawImage //
///////////////
// Image container.
typedef struct Tag_DrawImage {
	SDL_Surface *surf;
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

	// FIX: Setting up the alpha channel.
	if(surf->format->BytesPerPixel==4){
		int i,len,trans;

		// set the correct values
		surf->format->Amask=0xFF000000;
		surf->format->Ashift=24;

		// Check if the image has some area transparent
		trans=0;
		len=surf->w*surf->h;
		for(i=0;i<len;i++){
			if((((Uint32 *)surf->pixels)[i]&0xFF000000)!=0xFF000000){
				trans=1;
				break;
			}
		}
		if(trans){
			// Make it use the alpha channel
			SDL_SetAlpha(surf, SDL_SRCALPHA, 255);
		}
	}

	return(surf);
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
// Draw_ImgSetKeyCol
//
// Setting the image color key.
void Draw_ImgSetKeyCol(DrawImg img,
	unsigned char r,
	unsigned char g,
	unsigned char b)
{
	DrawImage *image=img;

	// Set the color key for the surface
	SDL_SetColorKey(image->surf, SDL_SRCCOLORKEY,
		SDL_MapRGB(image->surf->format, r, g, b));
}


/////////////////////////////
// Draw_ImgSetAlpha
//
// Setting the image alpha.
void Draw_ImgSetAlpha(DrawImg img, unsigned char a){
	DrawImage *image=img;

	// Set the alpha for the surface
	SDL_SetAlpha(image->surf, SDL_SRCALPHA, a);
}


/////////////////////////////
// Draw_DrawImg
//
// Draws an image.
void Draw_DrawImg(DrawImg img,int x,int y){
	DrawImage *image=img;
	SDL_Rect orig;
	SDL_Rect dest;

	// Prepare the rects
	orig.x=0;
	orig.y=0;
	dest.x=x+image->x;
	dest.y=y+image->y;
	orig.w=dest.w=image->surf->w;
	orig.h=dest.h=image->surf->h;

	// Blit the surface on the screen
	SDL_BlitSurface(image->surf,&orig,_screen,&dest);
}


/////////////////////////////
// Draw_DrawImgPart
//
// Draws an image part.
void Draw_DrawImgPart(DrawImg img,int x,int y,int w,int i){
	DrawImage *image=img;
	SDL_Rect orig;
	SDL_Rect dest;

	// Prepare the rects
	orig.x=w*i;
	orig.y=0;
	dest.x=x+image->x;
	dest.y=y+image->y;
	orig.w=dest.w=w;
	orig.h=dest.h=image->surf->h;

	// Blit the surface on the screen
	SDL_BlitSurface(image->surf,&orig,_screen,&dest);
}


/////////////////////////////
// Draw_DrawImgTrans
//
// Draws an image transformed.
void Draw_DrawImgTrans(DrawImg img,int x,int y,float angle){
	DrawImage *image=img;
	SDL_Rect orig;
	SDL_Rect dest;

	// Prepare the rects
	orig.x=0;
	orig.y=0;
	dest.x=x+image->x;
	dest.y=y+image->y;
	orig.w=dest.w=image->surf->w;
	orig.h=dest.h=image->surf->h;

	// Blit the surface on the screen
	SDL_BlitSurface(image->surf,&orig,_screen,&dest);
}


////////////////////////////////////////////////
// DrawFnt //
/////////////
// Reference to a Font.
typedef struct {
	SDL_Surface *surf;
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

	// Draw the font
	SDL_LockSurface(surf);
	color =SDL_MapRGBA(surf->format,r,g,b,a);
	color2=SDL_MapRGBA(surf->format,r,g,b,0);
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
	font->surf = Draw_DefaultFontSurface(r,g,b,a);
	font->w=8;
	font->h=8;

	font->surf->format->Amask=0xFF000000;
	font->surf->format->Ashift=24;
	SDL_SetAlpha(font->surf, SDL_SRCALPHA, 255);



	return((DrawFnt)font);
}

/////////////////////////////
// Draw_LoadFont
//
// Load a font from a file.
DrawFnt Draw_LoadFont(char *fichero,int min,int max){
	/*DrawFont *font;
	int x,y,c;
	Uint32 color,color2;

	// Create the default font
	font=malloc(sizeof(DrawFont));
	font->surf = SDL_CreateRGBSurface(SDL_SWSURFACE,
		8*256, 8, 32,0,0,0,0);
	font->w=8;
	font->h=8;
	font->surf->format->Amask=0xFF000000;
	font->surf->format->Ashift=24;
	SDL_SetAlpha(font->surf, SDL_SRCALPHA, 255);

	// Draw the font
	SDL_LockSurface(font->surf);
	color =SDL_MapRGBA(font->surf->format,r,g,b,a);
	color2=SDL_MapRGBA(font->surf->format,r,g,b,0);
	for(c=0;c<256;c++){
		for(y=0;y<8;y++){
			for(x=0;x<8;x++){
				if(((fontdata_8x8[c*8+y]>>(7-x)) & 0x01)==1){
					//Imagen_PutPixel(dest,c*8+x,y,color);
					((Uint32 *)font->surf->pixels)[(c*8+x)+(8*256*y)]=
						color;
				}else{
					//Imagen_PutPixel(dest,c*8+x,y,color2);
					((Uint32 *)font->surf->pixels)[(c*8+x)+(8*256*y)]=
						color2;
				}
			}
		}
	}
	SDL_UnlockSurface(font->surf);

	return((DrawFnt)font);*/
	return(NULL);
}

/////////////////////////////
// Draw_DrawText
//
// Draws text using a font
void Draw_DrawText(DrawFnt f,char *text,int x,int y){
	DrawFont *font=f;
	SDL_Rect orig;
	SDL_Rect dest;
	char *ptr;

	// Prepare the rects
	orig.w=dest.w=font->w;
	orig.h=dest.h=font->h;
	orig.y=0;
	dest.x=x;
	dest.y=y;

	// Iterate the string
	ptr=text;
	while(*ptr){
		orig.x=(*ptr)*font->w;
		dest.x=x;
		dest.y=y;
		// Blit every character
		SDL_BlitSurface(font->surf,&orig,_screen,&dest);
		x+=font->w;
		ptr++;
	}
}

