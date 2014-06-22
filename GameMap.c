// Copyright (C) 2012 Valeriano Alfonso Rodriguez (Kableado)

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

#include "GameLib.h"

#include "GameEnts.h"
#include "GameMap.h"


int ReadLine(FILE *f,char *line,int max){
	int c;
	int i=0;
	while(i<(max-1)){
		c=fgetc(f);
		if(c==EOF){
			line[i]=0;
			return(-1);
		}
		if(c=='\r'){
			continue;
		}
		if(c=='\n'){
			line[i]=0;
			return(i);
		}
		line[i]=c;
		i++;
	}
	line[i]=0;
	return(i);
}


Entity GameMapAux_CreateEnt(Entity ent,int i,int j,int res){
	Entity e;
	vec2 pos;
	e=Entity_Copy(ent);
	vec2_set(pos,(res/2)+i*res,(res/2)+j*res);
	vec2_plus(e->pos,e->pos,pos);
	GameLib_AddEntity(e);
	return(e);
}


#define MaxLineLen 1024

int GameMap_LoadLevel(char *filename,int res){
	FILE *file;
	char line[MaxLineLen];
	int len,i,j;
	int width,height;
	char *map;


	// Open the file
	file=fopen(filename,"rb");
	if(!file){
		return(0);
	}

	// Read the file to determine sizes
	width=0;
	height=0;
	do{
		len=ReadLine(file,line,MaxLineLen);
		if(len>-1){
			if(len>height){
				height=len;
			}
			width++;
		}
	}while(len>-1);
	fseek(file,0,SEEK_SET);


	// Build the map
	map=malloc(sizeof(char)*width*height);
	memset(map,0,width*height);
	#define MAP(x,y) map[(x)+((y)*width)]
	j=0;
	do{
		len=ReadLine(file,line,MaxLineLen);
		for(i=0;i<len;i++){
			MAP(j,(height-1)-i)=line[i];
		}
		j++;
	}while(len>-1);


	// Close the file
	fclose(file);


	// Parse the map
	for(j=0;j<height;j++){
		for(i=0;i<width;i++){
			Entity ent;



			if(MAP(i,j)=='P'){
				// Player
				GameMapAux_CreateEnt(ent_Wizard,i,j,res);
			}
			if(MAP(i,j)=='#'){
				// Earth
				int x,y;
				int up,down,left,right;

				ent=GameMapAux_CreateEnt(ent_Earth,i,j,res);

				x=i;y=j-1;if(y<0)y=0;
				up=MAP(x,y)=='#'?0:1;
				x=i;y=j+1;if(y>=height)y=height-1;
				down=MAP(x,y)=='#'?0:1;
				x=i-1;y=j;if(x<0)x=0;
				left=MAP(x,y)=='#'?0:1;
				x=i+1;y=j;if(x>=width)x=width-1;
				right=MAP(x,y)=='#'?0:1;

				EntEarth_Init(ent,up,down,left,right);
			}
			if(MAP(i,j)=='R'){
				// StoneBrick
				int x,y;
				int up,down,left,right;

				ent=GameMapAux_CreateEnt(ent_StoneBrick,i,j,res);

				x=i;y=j-1;if(y<0)y=0;
				up=MAP(x,y)=='R'?0:1;
				x=i;y=j+1;if(y>=height)y=height-1;
				down=MAP(x,y)=='R'?0:1;
				x=i-1;y=j;if(x<0)x=0;
				left=MAP(x,y)=='R'?0:1;
				x=i+1;y=j;if(x>=width)x=width-1;
				right=MAP(x,y)=='R'?0:1;

				EntStoneBrick_Init(ent,up,down,left,right);
			}


			if(MAP(i,j)=='S'){
				// Spiked Bush
				ent=GameMapAux_CreateEnt(ent_SpikedBush,i,j,res);
			}

			if(MAP(i,j)=='F'){
				// Flower
				ent=GameMapAux_CreateEnt(ent_Flower[0],i,j,res);
			}
			if(MAP(i,j)=='f'){
				// Flower
				ent=GameMapAux_CreateEnt(ent_Flower[1],i,j,res);
			}

			if(MAP(i,j)=='B'){
				// Bunny
				ent=GameMapAux_CreateEnt(ent_Bunny,i,j,res);
			}
		}
	}


	// Cleanup
	free(map);
	#undef MAP

	return(1);
}