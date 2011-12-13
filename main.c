#include <stdio.h>
#include <stdlib.h>
#include "GameLib.h"


#define MAP_ANCHO 11
#define MAP_ALTO 9

DrawImg tiles[20];
int mapa[MAP_ANCHO][MAP_ALTO];

// Dibujar el mapa
void DrawMapa(){
	int x;
	int y;
	int value;

	// dibujar el entorno
	for(x=0;x<MAP_ANCHO-1;x++){
		for(y=0;y<MAP_ALTO-1;y++){
			value  = mapa[x  ][y  ] * 8;
			value += mapa[x+1][y  ] * 4;
			value += mapa[x  ][y+1] * 2;
			value += mapa[x+1][y+1] * 1;
			Draw_DrawImg(tiles[value], x*64, y*64);
		}
	}
}

// Crear un mapa aleatorio
int CrearMapa(){
	int x;
	int y;
	double rnd;

	for(x=0;x<MAP_ANCHO;x++){
		for(y=0;y<MAP_ALTO;y++){
			rnd=rand();
			rnd=rnd/RAND_MAX;
			if(rnd>0.7){
				mapa[x][y]=0;
			}else{
				mapa[x][y]=1;
			}
		}
	}
	return 0;
}

DrawFnt font;
DrawFnt fonts;
DrawImg bisho;
float xacel,yacel;
int xpos=0,ypos=0;
AudioSnd coin;
int t_start,t_end;
int frames=0;

int ProcGame(){
	int i;

	//Draw_Clean(0,0,0);
	DrawMapa();

	if(Input_GetKey(InputKey_Up) && yacel>-10){
		yacel-=2;
	}
	if(Input_GetKey(InputKey_Down) && yacel<10){
		yacel+=2;
	}
	if(Input_GetKey(InputKey_Left) && xacel>-10){
		xacel-=2;
	}
	if(Input_GetKey(InputKey_Right) && xacel<10){
		xacel+=2;
	}
	if(xacel!=0){
		xpos+=xacel;
		if(xacel>0){
			xacel-=1;
		}else{
			xacel+=1;
		}
	}
	if(yacel!=0){
		ypos+=yacel;
		if(yacel>0){
			yacel-=1;
		}else{
			yacel+=1;
		}
	}
	Draw_DrawImgCenter(bisho,xpos,ypos);
	Draw_DrawText(fonts,"BISHO!",xpos-15,ypos-23);
	Draw_DrawText(font ,"BISHO!",xpos-16,ypos-24);


	if(Input_GetKey(InputKey_Action1)==InputKey_Pressed){
		Audio_PlaySound(coin,1,1);
	}

	/*for(i=0;i<1000;i++){
		Draw_DrawImgCenter(bisho,rand()%640,rand()%480);
	}*/

	Draw_DrawText(fonts,"Hola Mundo!",11,11);
	Draw_DrawText(font ,"Hola Mundo!",10,10);

	frames++;

	return(1);
}

int main(int argc,char *argv[]){

	srand(time(NULL));

	GameLib_Init(640,480,"Game",60);

	tiles[0]  = Draw_LoadImage("data/tile0000.bmp");
	tiles[1]  = Draw_LoadImage("data/tile0001.bmp");
	tiles[2]  = Draw_LoadImage("data/tile0010.bmp");
	tiles[3]  = Draw_LoadImage("data/tile0011.bmp");
	tiles[4]  = Draw_LoadImage("data/tile0100.bmp");
	tiles[5]  = Draw_LoadImage("data/tile0101.bmp");
	tiles[6]  = Draw_LoadImage("data/tile0110.bmp");
	tiles[7]  = Draw_LoadImage("data/tile0111.bmp");
	tiles[8]  = Draw_LoadImage("data/tile1000.bmp");
	tiles[9]  = Draw_LoadImage("data/tile1001.bmp");
	tiles[10] = Draw_LoadImage("data/tile1010.bmp");
	tiles[11] = Draw_LoadImage("data/tile1011.bmp");
	tiles[12] = Draw_LoadImage("data/tile1100.bmp");
	tiles[13] = Draw_LoadImage("data/tile1101.bmp");
	tiles[14] = Draw_LoadImage("data/tile1110.bmp");
	tiles[15] = Draw_LoadImage("data/tile1111.bmp");

	font=Draw_DefaultFont(255,255,255,255);
	fonts=Draw_DefaultFont(0,0,0,127);

	//bisho=Draw_LoadImage("data/bisho.bmp");
	//Draw_ImgSetKeyCol(bisho,0,255,0);
	//Draw_ImgSetAlpha(bisho,127);

	bisho=Draw_LoadImage("data/bisho_alpha.bmp");
	Draw_ImgSetAlpha(bisho,255);

	xpos=320;
	ypos=240;


	coin=Audio_LoadSound("data/coin.wav");


	CrearMapa();

	t_start=SDL_GetTicks();
	Draw_Loop(ProcGame);
	t_end=SDL_GetTicks();
	printf("%d %d %.2f\n",t_end-t_start,frames,frames/((t_end-t_start)/1000.0f));

	return(0);
}
