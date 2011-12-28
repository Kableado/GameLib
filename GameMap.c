// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <stdio.h>
#include <string.h>

#include "GameLib.h"
#include "GameEnts.h"

#include "GameMap.h"

void GameMapAux_CreateEnt(Entity *ent,int i,int j){
	Entity *e;
	e=Entity_Copy(ent);
	vec2_set(e->pos,16+i*32,16+j*32);
	GameLib_AddEntity(e);
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
int GameMapAux_CreatePlayer(Entity *ent){
	if(ent->type==Ent_SavePoint){
		if(ent->A==_startpoint){
			Entity *e;
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
		c=='1' ||
		c=='2' ||
		c=='3' ||
		c=='4' ||
		c=='5' ||
		c=='6' ||
		c=='7' ||
		c=='8' ||
		c=='9' ||
		c=='E' ||
		c=='F' ||
		c=='A' ||
		c=='V' ||
		c=='<' ||
		c=='>' )
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
	int i,j;
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
			// Prepare the floor
			floor=0;
			if(i>0){
				if(GameMapAux_IsFloor(line[i-1])){
					floor|=4;
				}
			}
			if(i<(w-1)){
				if(GameMapAux_IsFloor(line[i+1])){
					floor|=1;
				}
			}
			if(GameMapAux_IsFloor(line[i])){
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
			if(line[i]=='.'){
				// Floor
			}else
			if(line[i]=='#'){
				// Column
				GameMapAux_CreateEnt(ent_column,i,j);
			}else
			if(line[i]=='m'){
				// Column faded
				GameMapAux_CreateEnt(ent_column_faded,i,j);
			}else
			if(line[i]=='B'){
				// Barrel
				GameMapAux_CreateEnt(ent_barrel,i,j);
			}else
			if(line[i]=='S'){
				// Spiked hole
				GameMapAux_CreateEnt(ent_hole_spiked,i,j);
			}else
			if(line[i]=='L'){
				// Lava hole
				GameMapAux_CreateEnt(ent_hole_lava,i,j);
			}else
			if(line[i]=='1'){
				// Save point 1
				GameMapAux_CreateEnt(ent_savepoint_1,i,j);
			}else
			if(line[i]=='2'){
				// Save point 2
				GameMapAux_CreateEnt(ent_savepoint_2,i,j);
			}else
			if(line[i]=='3'){
				// Save point 3
				GameMapAux_CreateEnt(ent_savepoint_3,i,j);
			}else
			if(line[i]=='4'){
				// Save point 4
				GameMapAux_CreateEnt(ent_savepoint_4,i,j);
			}else
			if(line[i]=='5'){
				// Save point 5
				GameMapAux_CreateEnt(ent_savepoint_5,i,j);
			}else
			if(line[i]=='6'){
				// Save point 6
				GameMapAux_CreateEnt(ent_savepoint_6,i,j);
			}else
			if(line[i]=='7'){
				// Save point 7
				GameMapAux_CreateEnt(ent_savepoint_7,i,j);
			}else
			if(line[i]=='8'){
				// Save point 8
				GameMapAux_CreateEnt(ent_savepoint_8,i,j);
			}else
			if(line[i]=='9'){
				// Save point 9
				GameMapAux_CreateEnt(ent_savepoint_9,i,j);
			}else
			if(line[i]=='E'){
				// Exit point
				GameMapAux_CreateEnt(ent_exitpoint,i,j);
			}else
			if(line[i]=='F'){
				// End point
				GameMapAux_CreateEnt(ent_endpoint,i,j);
			}else
			if(line[i]=='>'){
				// ArrowShooter right
				GameMapAux_CreateEnt(ent_arrowshooter_right,i,j);
			}else
			if(line[i]=='<'){
				// ArrowShooter left
				GameMapAux_CreateEnt(ent_arrowshooter_left,i,j);
			}else
			if(line[i]=='V'){
				// ArrowShooter down
				GameMapAux_CreateEnt(ent_arrowshooter_down,i,j);
			}else
			if(line[i]=='A'){
				// ArrowShooter up
				GameMapAux_CreateEnt(ent_arrowshooter_up,i,j);
			}else

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