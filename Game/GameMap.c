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
	Entity_CalcBBox(e);
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
				GameMapAux_CreateEnt(ent_Player,i,j,res);
			}
			if(MAP(i,j)=='#'){
				// Block
				ent=GameMapAux_CreateEnt(ent_Block,i,j,res);
			}
			if(MAP(i,j)=='|'){
				// Platform
				ent=GameMapAux_CreateEnt(ent_Platform,i,j,res);
			}

		}
	}


	// Cleanup
	free(map);
	#undef MAP

	return(1);
}