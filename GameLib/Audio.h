// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#ifndef _AUDIO_H_
#define _AUDIO_H_


/////////////////////////////
// Audio_Init
//
// Initializes the game audio.
int Audio_Init();


/////////////////////////////
// Audio_Frame
//
// Notify a frame update to the audio subsystem.
void Audio_Frame();


////////////////////////////////////////////////
// AudioSnd //
//////////////
// Reference to a sound.
typedef void *AudioSnd;


////////////////////////////////////////////////
// AudioChn //
//////////////
// Reference to a playing sound.
typedef void *AudioChn;


/////////////////////////////
// Audio_LoadSound
//
// Loads a sound, giving a reference.
AudioSnd Audio_LoadSound(char *filename);


/////////////////////////////
// Audio_PlaySound
//
// Loads a sound, giving a reference.
AudioChn Audio_PlaySound(AudioSnd snd,
	float leftvol, float rightvol,int loop);


/////////////////////////////
// Audio_StopChan
//
// Stops an audio chanel
void Audio_StopChan(AudioChn chan);
	

#endif
