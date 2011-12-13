#ifndef _ENTITY_H_
#define _ENTITY_H_


////////////////////////////////////////////////
// Entity //
////////////
// Reference to an entity.
typedef void *Entity;


/////////////////////////////
// Entity_Create
//
// Creates an entity.
Entity Entity_Create(
	int x,int y,
	void (*process)(Entity ent,void *data),
	void *data);


/////////////////////////////
// Entity_Create
//
// Creates an entity.

/////////////////////////////
// Entity_CreateClass
//
// Initializes the game.
void Entity_CreateClass(char *name,
	void *(*createdata)(),
	void (*process)(Entity ent,void *data));



#endif
