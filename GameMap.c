// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <stdio.h>
#include <string.h>

#include "GameLib.h"
#include "GameEnts.h"

#include "GameMap.h"

Entity GameMapAux_CreateEnt(Entity ent,int i,int j){
	Entity e;
	e=Entity_Copy(ent);
	vec2_set(e->pos,16+i*32,16+j*32);
	Entity_CalcBBox(e);
	GameLib_AddEntity(e);
	return(e);
}

void Aux_Linea(FILE *f,char *line){
	int c;
	int i=0;
	memset(line,0,1024);
	while(i<1024){
		c=fgetc(f);
		if(c==EOF){
			line[i]=0;
			break;
		}
		if(c=='\r'){
			continue;
		}
		if(c=='\n'){
			line[i]=0;
			break;
		}
		line[i]=c;
		i++;
	}
}

int _startpoint;
int GameMapAux_CreatePlayer(Entity ent){
	if(ent->type==Ent_SavePoint){
		if(ent->A==_startpoint){
			Entity e;
			e=Entity_Copy(ent_player);
			vec2_copy(e->pos,ent->pos);
			GameLib_AddEntity(e);
			return(0);
		}
	}
	return(1);
}

int GameMapAux_IsFloor(char c){
	if( c=='.' ||
		c=='#' ||
		c=='m' ||
		c=='B' ||
		c=='S' ||
		c=='E' ||
		c=='F' ||
		c=='A' ||
		c=='V' ||
		c=='<' ||
		c=='>' ||
		c=='r' ||
		c=='T' ||
		c=='D' ||
		c=='l' )
	{
		return(1);
	}
	return(0);
}

int GameMap_CreateLevel(int level,int point){
	char filename[128];
	FILE *file;
	char line[1024];
	int w,h;
	int i,j,i2;
	int floor;

	sprintf(filename,"data/level_%02d.txt",level);
	file=fopen(filename,"r");
	if(!file){
		return(0);
	}

	GameLib_DelEnts();

	Aux_Linea(file,line);
	sscanf(line,"%d %d",&w,&h);
	for(j=0;j<h;j++){
		Aux_Linea(file,line);
		for(i=0;i<w;i++){
			i2=i*2;
			// Prepare the floor
			floor=0;
			if(i>0){
				if(GameMapAux_IsFloor(line[i2-2])){
					floor|=4;
				}
			}
			if(i<(w-1)){
				if(GameMapAux_IsFloor(line[i2+2])){
					floor|=1;
				}
			}
			if(GameMapAux_IsFloor(line[i2])){
				floor|=2;
			}
			if(floor==7){
				GameMapAux_CreateEnt(ent_floor,i,j);
			}
			if(floor==6){
				GameMapAux_CreateEnt(ent_floor_right,i,j);
			}
			if(floor==3){
				GameMapAux_CreateEnt(ent_floor_left,i,j);
			}
			if(floor==2){
				GameMapAux_CreateEnt(ent_floor_center,i,j);
			}


			// Put the rest of the entities
			if(line[i2]=='.'){
				// Floor
			}else
			if(line[i2]=='#'){
				// Column
				GameMapAux_CreateEnt(ent_column,i,j);
			}else
			if(line[i2]=='m'){
				// Column faded
				GameMapAux_CreateEnt(ent_column_faded,i,j);
			}else
			if(line[i2]=='r'){
				// Rock
				GameMapAux_CreateEnt(ent_rock,i,j);
			}else
			if(line[i2]=='l'){
				// Lamp
				GameMapAux_CreateEnt(ent_lamp,i,j);
			}else
			if(line[i2]=='B'){
				// Barrel
				GameMapAux_CreateEnt(ent_barrel,i,j);
			}else
			if(line[i2]=='|'){
				// Spiked hole
				GameMapAux_CreateEnt(ent_hole_spiked,i,j);
			}else
			if(line[i2]=='L'){
				// Lava hole
				GameMapAux_CreateEnt(ent_hole_lava,i,j);
			}else
			if(line[i2]=='S'){
				Entity e;
				// Save point
				e=GameMapAux_CreateEnt(ent_savepoint,i,j);
				e->A=line[i2+1]-'0';
			}else
			if(line[i2]=='E'){
				// Exit point
				GameMapAux_CreateEnt(ent_exitpoint,i,j);
			}else
			if(line[i2]=='F'){
				// End point
				GameMapAux_CreateEnt(ent_endpoint,i,j);
			}else
			if(line[i2]=='>'){
				// ArrowShooter right
				GameMapAux_CreateEnt(ent_arrowshooter_right,i,j);
			}else
			if(line[i2]=='<'){
				// ArrowShooter left
				GameMapAux_CreateEnt(ent_arrowshooter_left,i,j);
			}else
			if(line[i2]=='V'){
				// ArrowShooter down
				GameMapAux_CreateEnt(ent_arrowshooter_down,i,j);
			}else
			if(line[i2]=='A'){
				// ArrowShooter up
				GameMapAux_CreateEnt(ent_arrowshooter_up,i,j);
			}else
			/*if(line[i2]=='T'){
				// Teleporter
				Entity ent=GameMapAux_CreateEnt(ent_teleporter,i,j);
				ent->A=line[i2+1]-'0';
			}else
			if(line[i2]=='D'){
				// Teleporter Destination
				Entity ent=GameMapAux_CreateEnt(ent_teleporter_dest,i,j);
				ent->A=line[i2+1]-'0';
			}else
*/
			{}
		}
	}

	fclose(file);

	// Find the player start position
	_startpoint=point;
	GameLib_ForEachEnt(GameMapAux_CreatePlayer);

	// Iluminate
	//GameLib_Iluminate();

	return(1);
}