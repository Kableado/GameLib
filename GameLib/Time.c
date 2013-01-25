// Copyright (C) 2011 Valeriano Alfonso Rodriguez (Kableado)

#include <stdio.h>
#include <math.h>
#include <unistd.h>
#include <time.h>
#include <sys/time.h>

#include "Time.h"


/////////////////////////////
// Time_GetTime
//
// Gets the current time in usecs.
/////////////////////////////
// Time_Pause
//
// Pauses the execution for t usecs.
#if WIN32
#include <windows.h>
// WIN32
long long Time_GetTime(){
	LARGE_INTEGER freq;
	LARGE_INTEGER tim;
	long long int microt;

	QueryPerformanceFrequency(&freq);
	QueryPerformanceCounter(&tim);
	microt=(tim.QuadPart*1000000)/freq.QuadPart;
	return(microt);
}
void Time_Pause(int pausa){
	long long tend,t,diff;

	tend=Time_GetTime()+pausa;
	do{
		diff=tend-t;
		if(diff>1000){
			Sleep(diff/1000);
		}else{
			Sleep(0);
		}
		t=Time_GetTime();
	}while(tend>=t);
}
#else
#ifdef MACOSX
#include <mach/mach_time.h>
// MacOSX
long long Time_GetTime(){
	static mach_timebase_info_data_t info = {0,0};
	uint64_t t;
	if(info.denom==0){
		mach_timebase_info(&info);
	}
	t=mach_absolute_time()*(info.numer / info.denom);
	return(t/1000);
}
void Time_Pause(int pausa){
	struct timeval tv;
	tv.tv_sec=(long long)pausa/1000000;
	tv.tv_usec=(long long)pausa%1000000;
	select(0, NULL, NULL, NULL, &tv);
}
#else
// UNIX
long long Time_GetTime(){
	struct timeval t;
	long long usecs;
	gettimeofday(&t,NULL);
	usecs=(t.tv_sec*1000000ll)+(t.tv_usec);
	return(usecs);
}
void Time_Pause(int pausa){
	struct timeval tv;
	tv.tv_sec=(long long)pausa/1000000;
	tv.tv_usec=(long long)pausa%1000000;
	select(0, NULL, NULL, NULL, &tv);
}
#endif // if MACOSX
#endif // if WIN32


