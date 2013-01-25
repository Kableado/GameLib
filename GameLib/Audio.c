// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#ifdef WIN32
	#define _WIN32_WINNT 0x0501
	#include <windows.h>
#endif
#include <SDL/SDL.h>

#include "Audio.h"

static void Audio_MixerCallback(void *ud,Uint8 *stream,int l);


////////////////////////////////////////////////
// AudioWave //
///////////////
// Reference to a sound.
typedef struct Tag_AudioWave {
	SDL_AudioSpec spec;
	Uint32 len;
	Uint8 *buffer;

	struct Tag_AudioWave *next;
} AudioWave;
AudioWave *_waves=NULL;


////////////////////////////////////////////////
// AudioChan //
///////////////
// Reference to a sound.
typedef struct Tag_AudioChan {
	AudioWave *wave;
	Uint32 pos;
	unsigned char rightvol;
	unsigned char leftvol;

	struct Tag_AudioChan *next;
} AudioChan;
AudioChan *_channels=NULL;
AudioChan *_free_channels=NULL;

/////////////////////////////
// Audio_Init
//
// Initializes the game audio.
int Audio_Init(){
	SDL_AudioSpec as;
	SDL_AudioSpec as2;

	// Initialize audio subsistem
#ifdef WIN32
	// Force DSound Driver on win32
	putenv("SDL_AUDIODRIVER=dsound");
#endif
	if(SDL_InitSubSystem(SDL_INIT_AUDIO) < 0){
		printf("Audio_Init: Failure initializing SDL Audio.\n");
		printf("Audio_Init: SDL Error: %s\n",SDL_GetError());
		return(0);
	}

	// Open the audio device using the desired parameters
	as.freq = 44100;
	as.format = AUDIO_S16SYS;
	as.channels = 2;
	as.samples = 1024;
	as.callback = Audio_MixerCallback;
	if(SDL_OpenAudio(&as, &as2) < 0){
		printf("Audio_Init: Failure opening audio.\n");
		printf("Audio_Init: SDL Error: %s\n",SDL_GetError());
		return(0);
	}

	// Asert results
	if(	as2.format   != AUDIO_S16SYS ||
		as2.freq     != 44100 ||
		as2.channels != 2 )
	{
		printf("Audio_Init: Failure opening audio. (44.1Khz/16b/2c).\n");
		SDL_CloseAudio();
		return(0);
	}

	// Unpause and ready to go
	SDL_PauseAudio(0);

	return(1);
}


/////////////////////////////
// Audio_MixerCallback
//
// Mixes the audio channels.
static void Audio_MixerCallback(void *ud,Uint8 *stream,int l){
	signed short *ptr_out,*ptr_wave;
	AudioChan *prevchan;
	AudioChan *chan;
	AudioWave *wave;
	int len=l/4; // Asume 16bpb and 2 output chan
	int chan_remain;
	int len_mix;
	int i;

	// Clean
	memset(stream,0,len);

	// Mix all the channels
	prevchan=NULL;
	chan=_channels;
	while(chan){
		if(!chan->wave){
			// Remove finished channels
			AudioChan *aux_chan=chan->next;
			chan->next=_free_channels;
			_free_channels=chan;
			chan=aux_chan;
			if(prevchan){
				prevchan->next=chan;
			}else{
				_channels=chan;
			}
			continue;
		}

		// Prepare the pointers
		ptr_out=(signed short *)stream;
		ptr_wave=((signed short *)chan->wave->buffer)+chan->pos;
		wave=chan->wave;

		// Determine mixing lenght
		chan_remain=wave->len-chan->pos;
		if(chan_remain>len){
			len_mix=len;
		}else{
			len_mix=chan_remain;
			chan->wave=NULL;
		}

		// Mix the buffer
		for(i=0;i<len_mix;i++){
			int temp;

			// Left Channel
			temp=ptr_out[0];
			temp+=(ptr_wave[0]*chan->leftvol)>>8;
			if(temp>(1<<14)){
				ptr_out[0]=1<<14;
			}else if(temp<-(1<<14)){
				ptr_out[0]=-(1<<14);
			}else{
				ptr_out[0]=temp;
			}

			// Right Channel
			temp=ptr_out[1];
			temp+=(ptr_wave[0]*chan->rightvol)>>8;
			if(temp>(1<<14)){
				ptr_out[1]=1<<14;
			}else if(temp<-(1<<14)){
				ptr_out[1]=-(1<<14);
			}else{
				ptr_out[1]=temp;
			}

			// Next sample
			ptr_out+=2;
			ptr_wave++;
		}
		chan->pos+=len_mix;

		// Next channel
		prevchan=chan;
		chan=chan->next;
	}
}


/////////////////////////////
// Audio_Frame
//
// Notify a frame update to the audio subsystem.
void Audio_Frame(){

}


/////////////////////////////
// Audio_LoadSound
//
// Loads a sound, giving a reference.
AudioSnd Audio_LoadSound(char *filename){
	AudioWave *wave;

	// Allocate and load the sound
	wave=malloc(sizeof(AudioWave));
	if( SDL_LoadWAV(filename,
		&wave->spec, &wave->buffer, &wave->len) == NULL )
	{
		printf("Audio_LoadSound: Failure Loading sound: %s\n",filename);
		printf("Audio_LoadSound: SDL Error: %s\n",SDL_GetError());
		free(wave);
		return(NULL);
	}

	// Asert results
	if(	wave->spec.format   != AUDIO_S16 ||
		wave->spec.freq     != 44100 ||
		wave->spec.channels != 1 )
	{
		printf("Audio_LoadSound: Failure opening sound. (44.1Khz/16b/1c).\n");
		SDL_FreeWAV(wave->buffer);
		free(wave);
		return(0);
	}

	// Correct the lenght
	wave->len/=2;

	// Take a reference
	wave->next=_waves;
	_waves=wave;

	return((AudioSnd)wave);
}


/////////////////////////////
// Audio_PlaySound
//
// Loads a sound, giving a reference.
void Audio_PlaySound(AudioSnd snd,
	float leftvol, float rightvol)
{
	AudioChan *chan;
	AudioWave *wave;
	if(!snd)
		return;

	// Cast AudioSnd to AudioWave
	wave=snd;

	// Get a free channel
	if(_free_channels){
		chan=_free_channels;
		_free_channels=chan->next;
		chan->next=NULL;
	}else{
		chan=malloc(sizeof(AudioChan));
		chan->next=NULL;
	}

	// Initialize the channel
	chan->wave=wave;
	chan->pos=0;
	chan->rightvol=(rightvol*255);
	chan->leftvol=(leftvol*255);
	chan->next=_channels;
	_channels=chan;
}

