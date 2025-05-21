// Copyright (C) 2011-2023 Valeriano Alfonso Rodriguez (Kableado)

#ifndef Draw_H
#define Draw_H

#include <stdint.h>

/////////////////////////////
// Draw_Init
//
// Initializes the game window.
int Draw_Init(int width, int height, const char *title, int pFps, int fps);

/////////////////////////////
// Draw_Clean
//
// Cleans the game window.
void Draw_Clean(uint8_t r, uint8_t g, uint8_t b);

/////////////////////////////
// Draw_Loop
//
// Loops updating the game window.
void Draw_Loop(void (*proc)(void *data), void (*draw)(void *data, float f), void *data);

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
// Reference to an image.
typedef void *DrawImg;
typedef uint8_t ColorRgba[4];

/////////////////////////////
// Draw_CreateImage
//
DrawImg Draw_CreateImage(int w, int h);

/////////////////////////////
// Draw_LoadImage
//
// Loads an image, giving a reference.
DrawImg Draw_LoadImage(char *filename);

/////////////////////////////
// Draw_GetSize
//
// Gets the image size.
void Draw_GetSize(DrawImg img, int *w, int *h);

/////////////////////////////
// Draw_SetOffset
// Draw_GetOffset
//
// Sets and Gets the image offset.
void Draw_SetOffset(DrawImg img, int x, int y);
void Draw_GetOffset(DrawImg img, int *x, int *y);

/////////////////////////////
// Draw_SetFlip
// Draw_GetFlip
//
//
void Draw_SetFlip(DrawImg img, int flip);
int Draw_GetFlip(DrawImg img);

/////////////////////////////
// Draw_SetPixel
// Draw_AddPixel
//
//
DrawImg Draw_SetPixel(DrawImg img, int x, int y, const ColorRgba color);
DrawImg Draw_AddPixel(DrawImg img, int x, int y, const ColorRgba color, float factor);

/////////////////////////////
// Draw_DrawBoxFilled
//
//
DrawImg Draw_DrawBoxFilled(DrawImg img, int x1, int y1, int x2, int y2, const ColorRgba color);

/////////////////////////////
// Draw_DrawBox
//
//
DrawImg Draw_DrawBox(DrawImg img, int x1, int y1, int x2, int y2, const ColorRgba color);

/////////////////////////////
// Draw_DrawCircle
//
//
DrawImg Draw_DrawCircle(DrawImg img, int centerX, int centerY, int radius, int innerRadius, const ColorRgba color);

/////////////////////////////
// Draw_DrawImg
//
// Draws an image.
void Draw_DrawImg(DrawImg img, int x, int y, const float scale[2], float rotation);

/////////////////////////////
// Draw_DrawImgResized
//
// Draws an image, resizing.
void Draw_DrawImgResized(DrawImg img, int x, int y, float w, float h, float rotation);

/////////////////////////////
// Draw_DrawImgPart
//
// Draws an image part.
void Draw_DrawImgPart(DrawImg img, int x, int y, int w, int h, int i, int j, const float scale[2], float rotation);

/////////////////////////////
// Draw_DrawImgPartHoriz
//
// Draws an image part horizontally.
void Draw_DrawImgPartHoriz(DrawImg img, int x, int y, int w, int i, const float scale[2], float rotation);

/////////////////////////////
// Draw_ImgParallax
//
//
void Draw_ImgParallax(
	DrawImg img, int imgSize[2], const int imgOffset[2], const float parallaxFactor[2], const int gamePos[2],
	const int gameSize[2]);

/////////////////////////////
// Draw_SetColor
//
//
void Draw_SetColor(float r, float g, float b, float a);

////////////////////////////////////////////////
// DrawFnt //
/////////////
// Reference to a Font.
typedef void *DrawFnt;

/////////////////////////////
// Draw_DefaultFont
//
// Creates the default font.
DrawFnt Draw_DefaultFont(ColorRgba color);

/////////////////////////////
// Draw_LoadFont
//
// Load a font from a file.
DrawFnt Draw_LoadFont(char *fichero, int min, int max);

/////////////////////////////
// Draw_FontScale
//
void Draw_FontScale(DrawFnt f, const float scale[2]);

/////////////////////////////
// Draw_DrawText
//
// Draws text using a font
void Draw_DrawText(DrawFnt f, const char *text, int x, int y);

/////////////////////////////
// Draw_SaveRGBAToBMP
//
//
void Draw_SaveRGBAToBMP(const char *filename, const uint8_t *data, int width, int height);

/////////////////////////////
// Draw_SaveRGBAToPNG
//
//
void Draw_SaveRGBAToPNG(const char *filename, const uint8_t *data, int width, int height);

/////////////////////////////
// Draw_SaveScreenshot
//
//
void Draw_SaveScreenshot(char *filename);

/////////////////////////////
// Draw_ShowCursor
//
//
void Draw_ShowCursor(int showCursor);

#endif
