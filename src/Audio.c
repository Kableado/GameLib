// Copyright (C) 2011-2023 Valeriano Alfonso Rodriguez (Kableado)

#ifdef WIN32
#define _WIN32_WINNT 0x0501
#include <windows.h>
#endif
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <SDL.h>

#include "Audio.h"
#include "Util.h"

static void Audio_MixerCallback(void *ud, Uint8 *stream, int l);

////////////////////////////////////////////////
// AudioWave //
///////////////
// Reference to a sound.
typedef struct TAudioWave TAudioWave, *AudioWave;
struct TAudioWave {
	uint32_t sampleRate;
	int32_t channels;
	int32_t bpb;
	int32_t BPB;
	int32_t len;
	uint8_t *buffer;

	AudioWave next;
};
AudioWave g_Waves = NULL;

////////////////////////////////////////////////
// AudioChan //
///////////////
// Reference to a sound.
typedef struct TAudioChan TAudioChan, *AudioChan;
struct TAudioChan {
	AudioWave wave;
	int32_t pos;
	uint8_t rightVolume;
	uint8_t leftVolume;

	int32_t loop;

	AudioChan next;
};
AudioChan g_Channels     = NULL;
AudioChan g_FreeChannels = NULL;

static SDL_AudioDeviceID g_AudioDeviceID = 0;

/////////////////////////////
// Audio_Init
//
// Initializes the game audio.
int Audio_Init() {
	SDL_AudioSpec as;
	SDL_AudioSpec as2;

	// Initialize audio subsystem
	if (SDL_InitSubSystem(SDL_INIT_AUDIO) < 0) {
		Print("ERROR: Audio_Init: Failure initializing SDL Audio. %s\n", SDL_GetError());
		return (0);
	}

	// Open the audio device using the desired parameters
	as.freq        = 44100;
	as.format      = AUDIO_S16SYS;
	as.channels    = 2;
	as.samples     = 2048;
	as.callback    = Audio_MixerCallback;
	g_AudioDeviceID = SDL_OpenAudioDevice(NULL, 0, &as, &as2, 0);
	if (g_AudioDeviceID == 0) {
		Print("ERROR: Audio_Init: Failure opening audio. %s\n", SDL_GetError());
		return (0);
	}

	// Asert results
	if (as2.format != AUDIO_S16SYS || as2.freq != 44100 || as2.channels != 2) {
		Print("ERROR: Audio_Init: Failure opening audio. (44.1Khz/16b/2c).\n");
		SDL_CloseAudio();
		return (0);
	}

	// Unpause and ready to go
	SDL_PauseAudioDevice(g_AudioDeviceID, 0);

	return (1);
}

/////////////////////////////
// Audio_MixerCallback
//
// Mixes the audio channels.
static void Audio_MixerCallback(void *ud, uint8_t *stream, int l) {
	int16_t *ptr_out, *ptr_wave;
	AudioChan previousChannel;
	AudioChan chan;
	AudioWave wave;
	int len = l / 4; // Asume 16bpb and 2 output chan
	int channelRemaining;
	int len_mix;
	int i;

	// Clean
	memset(stream, 0, l);

	// Mix all the channels
	previousChannel = NULL;
	chan     = g_Channels;
	while (chan) {
		if (!chan->wave) {
			// Remove finished channels
			AudioChan aux_chan = chan->next;
			chan->next         = g_FreeChannels;
			g_FreeChannels     = chan;
			chan               = aux_chan;
			if (previousChannel) {
				previousChannel->next = chan;
			} else {
				g_Channels = chan;
			}
			continue;
		}

		// Prepare the pointers
		ptr_out  = (signed short *)stream;
		ptr_wave = ((signed short *)chan->wave->buffer) + chan->pos;
		wave     = chan->wave;

		// Determine mixing length
		channelRemaining = wave->len - chan->pos;
		if (channelRemaining > len) {
			len_mix = len;
		} else {
			if (chan->loop) {
				len_mix = len;
			} else {
				len_mix = channelRemaining;
			}
			chan->wave = NULL;
		}

		// Mix the buffer
		for (i = 0; i < len_mix; i++) {
			int temp;

			// Left Channel
			temp = ptr_out[0];
			temp += (ptr_wave[0] * chan->leftVolume) >> 8;
			if (temp > (1 << 14)) {
				ptr_out[0] = 1 << 14;
			} else if (temp < -(1 << 14)) {
				ptr_out[0] = -(1 << 14);
			} else {
				ptr_out[0] = (int16_t)temp;
			}

			// Right Channel
			temp = ptr_out[1];
			temp += (ptr_wave[0] * chan->rightVolume) >> 8;
			if (temp > (1 << 14)) {
				ptr_out[1] = 1 << 14;
			} else if (temp < -(1 << 14)) {
				ptr_out[1] = -(1 << 14);
			} else {
				ptr_out[1] = (int16_t)temp;
			}

			// Next sample
			ptr_out += 2;
			if (ptr_wave >= (((signed short *)wave->buffer) + (wave->len - 1))) {
				ptr_wave = ((signed short *)wave->buffer);
			} else {
				ptr_wave++;
			}
		}
		chan->pos += len_mix;

		if (chan->wave == NULL && chan->loop == 1) {
			chan->wave = wave;
			while (chan->pos > wave->len) {
				chan->pos -= wave->len;
			}
		}

		// Next channel
		previousChannel = chan;
		chan     = chan->next;
	}
}

/////////////////////////////
// Audio_Frame
//
// Notify a frame update to the audio subsystem.
void Audio_Frame() {}

/////////////////////////////
// Audio_LoadSound
//
// Loads a sound, giving a reference.
AudioSnd Audio_LoadSound(char *filename) {
	FILE *f;
	char id[5] = {0, 0, 0, 0, 0}, *sndBuffer = NULL;
	short formatTag, channels, bitsPerSample;
	int formatLen, sampleRate, dataSize;

	f = fopen(filename, "rb");
	if (!f) {
		Print("ERROR: Audio_LoadSound: Failure opening file. \"%s\".\n", filename);
		return (NULL);
	}

	// Read id "RIFF"
	fread(id, 4, sizeof(char), f);
	if (strcmp(id, "RIFF") != 0) {
		Print("ERROR: Audio_LoadSound: File is not RIFF. \"%s\".\n", filename);
		fclose(f);
		return (NULL);
	}

	// File size (-"RIFF")
	fseek(f, 4, SEEK_CUR); // size

	// Read id "WAVE"
	fread(id, 4, sizeof(char), f);
	if (strcmp(id, "WAVE") != 0) {
		Print("ERROR:Audio_LoadSound: File is not WAVE. \"%s\".\n", filename);
		fclose(f);
		return (NULL);
	}

	// Read the format
	fread(id, 1, sizeof(char) * 4, f); // Read "fmt "
	fread(&formatLen, 1, sizeof(int), f);
	if (formatLen < 14) {
		Print("ERROR: Audio_LoadSound: File too short. \"%s\".\n", filename);
		fclose(f);
		return (NULL);
	}
	fread(&formatTag, 1, sizeof(short), f); // 1=PCM
	if (formatTag != 1) {
		Print("ERROR: Audio_LoadSound: Not PCM format. \"%s\".\n", filename);
		fclose(f);
		return (NULL);
	}
	fread(&channels, 1, sizeof(short), f);
	fread(&sampleRate, 1, sizeof(int), f);
	fseek(f, 2, SEEK_CUR); // avgBytesSec
	fseek(f, 2, SEEK_CUR); // blockAlign
	fread(&bitsPerSample, 1, sizeof(short), f);
	fseek(f, formatLen - 14, SEEK_CUR); // Align read

	// Assert sound format
	if (sampleRate != 44100 || channels != 1 || bitsPerSample != 2) {
		Print(
			"ERROR: Audio_LoadSound: Format not supported: "
			"sampleRate:%d; channels:%d; BPB:%d. \"%s\"\n",
			sampleRate,
			channels,
			bitsPerSample,
			filename);
		fclose(f);
		return (NULL);
	}

	// Skip no "data" blocks
	do {
		size_t lenRead = fread(id, 1, sizeof(char) * 4, f);
		if (lenRead < 4) {
			break;
		}
		if (strcmp(id, "data") != 0) {
			fread(&dataSize, 1, sizeof(int), f);
			fseek(f, dataSize, SEEK_CUR);
		} else {
			break;
		}
	} while (1);
	if (strcmp(id, "data") != 0) {
		Print("ERROR: Audio_LoadSound: DATA block not found. \"%s\".\n", filename);
		fclose(f);
		return (NULL);
	}

	// Read the "data" block
	fread(&dataSize, 1, sizeof(int), f);
	sndBuffer = malloc(sizeof(char) * dataSize);
	fread(sndBuffer, dataSize, sizeof(char), f);

	fclose(f);

	// Build the wave object
	AudioWave wave   = malloc(sizeof(TAudioWave));
	wave->sampleRate = sampleRate;
	wave->channels   = channels;
	wave->buffer     = (Uint8 *)sndBuffer;
	wave->BPB        = bitsPerSample;
	wave->bpb        = wave->BPB * 8;
	wave->len        = dataSize / (wave->BPB * wave->channels);

	// Take a reference
	wave->next = g_Waves;
	g_Waves    = wave;

	return (wave);
}

/////////////////////////////
// Audio_PlaySound
//
// Loads a sound, giving a reference.
AudioChn Audio_PlaySound(AudioSnd snd, float leftVolume, float rightVolume, int loop) {
	AudioChan chan;
	AudioWave wave;
	if (!snd) {
		return (NULL);
	}

	// Cast AudioSnd to AudioWave
	wave = snd;

	// Get a free channel
	if (g_FreeChannels) {
		chan           = g_FreeChannels;
		g_FreeChannels = chan->next;
		chan->next     = NULL;
	} else {
		chan       = malloc(sizeof(TAudioChan));
		chan->next = NULL;
	}

	// Initialize the channel
	chan->wave     = wave;
	chan->pos      = 0;
	chan->rightVolume = (uint8_t)(rightVolume * 255.0f);
	chan->leftVolume  = (uint8_t)(leftVolume * 255.0f);
	chan->loop     = loop;

	// Include in sounds list
	chan->next = g_Channels;
	g_Channels = chan;

	return chan;
}

/////////////////////////////
// Audio_StopChan
//
// Stops an audio chanel
void Audio_StopChan(AudioChn c) {
	AudioChan chan;
	chan = c;
	if (c == NULL) {
		return;
	}
	chan->loop = 0;
	chan->wave = NULL;
}
