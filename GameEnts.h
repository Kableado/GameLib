// Copyright (C) 2012 Valeriano Alfonso Rodriguez (Kableado)

#ifndef _GAMEENTS_H_
#define _GAMEENTS_H_



enum {
	Ent_Player,
	Ent_Platform,
	Ent_Block,

	Ent_Wizard,
	Ent_MagikBall,
	Ent_Earth,
	Ent_EarthBack,
	Ent_StoneBrick,
	Ent_StoneBrickBack,
	Ent_SpikedBush,
	Ent_LavaPit,
	Ent_Fireball,
	Ent_Flower,
	Ent_Spike,
	Ent_CarnivorePlant,
	Ent_Bunny,
	Ent_Spider,
	Ent_Guard,
	Ent_EliteGuard,
	Ent_Axe,
	Ent_GoatMan,
	Ent_Princess
} EntityType;

extern Entity *ent_Player;
extern Entity *ent_Platform;
extern Entity *ent_Block;

extern Entity *ent_Wizard;
extern Entity *ent_MagikBall;
extern Entity *ent_Earth;
extern Entity *ent_EarthBack;
extern Entity *ent_StoneBrick;
extern Entity *ent_StoneBrickBack;
extern Entity *ent_SpikedBush;
extern Entity *ent_LavaPit;
extern Entity *ent_Fireball;
extern Entity *ent_Spike[2];
extern Entity *ent_Flower[2];
extern Entity *ent_CarnivorePlant[2];
extern Entity *ent_Bunny;
extern Entity *ent_Spider;
extern Entity *ent_Axe;
extern Entity *ent_Guard;
extern Entity *ent_EliteGuard;
extern Entity *ent_GoatMan;
extern Entity *ent_Princess;


int EntityApplyGravity(Entity *e);

void EntEarth_Init(Entity *ent,int up,int down,int left,int right);

void EntStoneBrick_Init(Entity *ent,int up,int down,int left,int right);


void GameEnts_Init();



#endif

