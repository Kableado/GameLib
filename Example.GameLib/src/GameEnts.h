// Copyright (C) 2012-2023 Valeriano Alfonso Rodriguez (Kableado)

#ifndef GameEnts_H
#define GameEnts_H

#define Ent_Player 1
#define Ent_Platform 2
#define Ent_Block 3
#define Ent_Box 4

extern Entity ent_Player;
extern Entity ent_Platform;
extern Entity ent_Block;
extern Entity ent_Box;

int EntityApplyGravity(Entity e);

void GameEnts_Init();

#endif
