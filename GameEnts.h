// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#ifndef _GAMEENTS_H_
#define _GAMEENTS_H_

void GameEnts_Init();

enum {
	Ent_Player,
	Ent_Barrel,
	Ent_Column,
	Ent_Floor,
	Ent_Hole_Spiked,
	Ent_Hole_Filled,
	Ent_Hole_Lava,
	Ent_ArrowShooter,
	Ent_Arrow,
	Ent_SavePoint,
	Ent_ExitPoint,
	Ent_Effect
} EntityType;
extern Entity *ent_player;
extern Entity *ent_barrel;
extern Entity *ent_column;
extern Entity *ent_column_faded;
extern Entity *ent_floor;
extern Entity *ent_floor_right;
extern Entity *ent_floor_left;
extern Entity *ent_floor_center;
extern Entity *ent_hole_spiked;
extern Entity *ent_hole_filled;
extern Entity *ent_hole_lava;
extern Entity *ent_arrowshooter_up;
extern Entity *ent_arrowshooter_down;
extern Entity *ent_arrowshooter_left;
extern Entity *ent_arrowshooter_right;
extern Entity *ent_arrow_up;
extern Entity *ent_arrow_down;
extern Entity *ent_arrow_left;
extern Entity *ent_arrow_right;
extern Entity *ent_exitpoint;
extern Entity *ent_endpoint;
extern Entity *ent_savepoint_1;
extern Entity *ent_savepoint_2;
extern Entity *ent_savepoint_3;
extern Entity *ent_savepoint_4;

#endif
