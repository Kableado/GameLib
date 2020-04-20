// Copyright (C) 2012 Valeriano Alfonso Rodriguez (Kableado)

#ifndef _GAMEENTS_H_
#define _GAMEENTS_H_


#define Ent_Player 1
#define Ent_Platform 2
#define Ent_Block 3

extern Entity ent_Player;
extern Entity ent_Platform;
extern Entity ent_Block;

int EntityApplyGravity(Entity e);

void GameEnts_Init();

#endif
