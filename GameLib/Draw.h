// Copyright (C) 2011-2015 Valeriano Alfonso Rodriguez (Kableado)

#ifndef _DRAW_H_
#define _DRAW_H_


/////////////////////////////
// Draw_Init
//
// Initializes the game window.
int Draw_Init(int width,int height,char *title,int pfps,int fps);


/////////////////////////////
// Draw_Clean
//
// Cleans the game window.
void Draw_Clean(
	unsigned char r,
	unsigned char g,
	unsigned char b);


/////////////////////////////
// Draw_Loop
//
// Loops updating the game window.
void Draw_Loop(
	void (*proc)(void *data),
	void (*draw)(void *data,float f),
	void *data);


/////////////////////////////
// Draw_BreakLoop
//
// Breaks the drawing loop
void Draw_BreakLoop();


/////////////////////////////
// Draw_OverrideExit
//
// Overrides the default exit mechanism
void Draw_OverrideExit(int override);


/////////////////////////////
// Draw_Flush
//
// Performs all the queued draw actions.
void Draw_Flush();


////////////////////////////////////////////////
// DrawImg //
/////////////
// Reference to a image.
typedef void *DrawImg;


/////////////////////////////
// Draw_CreateImage
//
DrawImg Draw_CreateImage(int w,int h);


/////////////////////////////
// Draw_LoadImage
//
// Loads a image, giving a reference.
DrawImg Draw_LoadImage(char *filename);


/////////////////////////////
// Draw_GetSize
//
// Gets the image size.
void Draw_GetSize(DrawImg img,int *w,int *h);


/////////////////////////////
// Draw_SetOffset
// Draw_GetOffset
//
// Sets and Gets the image offset.
void Draw_SetOffset(DrawImg img,int  x,int  y);
void Draw_GetOffset(DrawImg img,int *x,int *y);


/////////////////////////////
// Draw_SetFlip
// Draw_GetFlip
//
//
void Draw_SetFlip(DrawImg img,int flip);
int Draw_GetFlip(DrawImg img);


/////////////////////////////
// Draw_DrawImg
//
// Draws an image.
void Draw_DrawImg(DrawImg img,int x,int y);


/////////////////////////////
// Draw_DrawImgResized
//
// Draws an image, resizing.
void Draw_DrawImgResized(DrawImg img,int x,int y,float w,float h);


/////////////////////////////
// Draw_DrawImgPart
//
// Draws an image part.
void Draw_DrawImgPart(DrawImg img,int x,int y,int w,int h,int i,int j);


/////////////////////////////
// Draw_DrawImgPartHoriz
//
// Draws an image part horizontally.
void Draw_DrawImgPartHoriz(DrawImg img,int x,int y,int w,int i);


/////////////////////////////
// Draw_SetColor
//
//
void Draw_SetColor(float r,float g,float b,float a);


////////////////////////////////////////////////
// DrawFnt //
/////////////
// Reference to a Font.
typedef void *DrawFnt;


/////////////////////////////
// Draw_DefaultFont
//
// Creates the default font.
DrawFnt Draw_DefaultFont(
	unsigned char r,
	unsigned char g,
	unsigned char b,
	unsigned char a);


/////////////////////////////
// Draw_LoadFont
//
// Load a font from a file.
DrawFnt Draw_LoadFont(char *fichero,int min,int max);


/////////////////////////////
// Draw_DrawText
//
// Draws text using a font
void Draw_DrawText(DrawFnt f,char *text,int x,int y);


/////////////////////////////
// Draw_SaveScreenshoot
//
//
void Draw_SaveScreenshoot(char *filename);


#endif
