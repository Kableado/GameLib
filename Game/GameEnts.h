// Copyright (C) 2012 Valeriano Alfonso Rodriguez (Kableado)

#ifndef _GAMEENTS_H_
#define _GAMEENTS_H_



enum {
	Ent_Player,
	Ent_Platform,
	Ent_Block,

	Ent_Last
} EntityType;

extern Entity ent_Player;
extern Entity ent_Platform;
extern Entity ent_Block;

int EntityApplyGravity(Entity e);

void GameEnts_Init();

#endif

