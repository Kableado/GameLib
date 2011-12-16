#ifndef _DRAW_H_
#define _DRAW_H_


/////////////////////////////
// Draw_Init
//
// Initializes the game window.
int Draw_Init(int width,int height,char *title,int fps);


/////////////////////////////
// Draw_Loop
//
// Loops updating the game window.
void Draw_Loop(int (*proc)());


/////////////////////////////
// Draw_Clean
//
// Cleans the game window.
void Draw_Clean(
	unsigned char r,
	unsigned char g,
	unsigned char b);


////////////////////////////////////////////////
// DrawImg //
/////////////
// Reference to a image.
typedef void *DrawImg;


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
// Draw_ImgSetKeyCol
//
// Setting the image color key.
void Draw_ImgSetKeyCol(DrawImg img,
	unsigned char r,
	unsigned char g,
	unsigned char b);


/////////////////////////////
// Draw_ImgSetAlpha
//
// Setting the image alpha.
void Draw_ImgSetAlpha(DrawImg img, unsigned char a);


/////////////////////////////
// Draw_DrawImg
//
// Draws an image.
void Draw_DrawImg(DrawImg img,int x,int y);


/////////////////////////////
// Draw_DrawImgPart
//
// Draws an image part.
void Draw_DrawImgPart(DrawImg img,int x,int y,int w,int i);


////////////////////////////////////////////////
// DrawFnt //
/////////////
// Reference to a Font.
typedef void *DrawFnt;


/////////////////////////////
// Draw_DefaultFont
//
// Loads a image, giving a reference.
DrawFnt Draw_DefaultFont(
	unsigned char r,
	unsigned char g,
	unsigned char b,
	unsigned char a);


/////////////////////////////
// Draw_DrawText
//
// Draws text using a font
void Draw_DrawText(DrawFnt f,char *text,int x,int y);

#endif
