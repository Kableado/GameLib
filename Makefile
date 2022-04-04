
VERBOSE_BUILD := false

IsMinGW := $(findstring MINGW,$(shell uname -s)) $(findstring MSYS,$(shell uname -s))
IsDarwin := $(findstring Darwin,$(shell uname -s))
ifneq (,$(IsMinGW))
	HOST_ARCH := mingw
else
ifneq (,$(IsDarwin))
	HOST_ARCH := macosx
else
	HOST_ARCH := linux
endif
endif

ifeq ($(arch),emscripten)
	HOST_ARCH := emscripten
endif


ifeq ($(HOST_ARCH),mingw)
	CC       := gcc
	AR       := ar
	LAUNCHER :=
	RM       := rm -rf
	MKDIR    := mkdir
	ECHO     := echo

	LIBS    := -L/mingw/lib -lopengl32 -lm $(shell sdl2-config --libs)
	CFLAGS  := -g -mwindows -D_GNU_SOURCE=1 -DWIN32 $(shell sdl2-config --cflags)
	LDFLAGS := -g -mwindows -D_GNU_SOURCE=1

	RES_GAMELIB := libgame.a
	BUILDDIR    := build-$(shell gcc -v 2>&1 | grep "Target:" | cut --delimiter=' ' --fields=2)
endif
ifeq ($(HOST_ARCH),linux)
	CC       := gcc
	AR       := ar
	LAUNCHER :=
	RM       := rm -rf
	MKDIR    := mkdir
	ECHO     := echo

	LIBS    := -lpthread -L/usr/X11R6/lib -L/usr/lib -lm -lGL -lX11 $(shell sdl2-config --libs)
	CFLAGS  := -Wall -g -I/usr/include/ -I/usr/X11R6/include/ $(shell sdl2-config --cflags)
	LDFLAGS :=

	RES_GAMELIB := libgame.a
	RES_GAME    := game
	BUILDDIR    := build-$(shell gcc -v 2>&1 | grep "Target:" | cut --delimiter=' ' --fields=2)
endif
ifeq ($(HOST_ARCH),macosx)
	CC       := gcc
	AR       := ar
	LAUNCHER :=
	RM       := rm -rf
	MKDIR    := mkdir
	ECHO     := echo

	LIBS    := -framework Cocoa -lm -framework OpenGL -framework SDL macosx/SDLMain.m
	CFLAGS  := -Wall -g -DMACOSX -ObjC -Dmain=SDL_main -I/usr/include/ -I/usr/include/SDL/ -I/usr/X11R6/include/
	LDFLAGS :=

	RES_GAMELIB := libgame.a
	BUILDDIR    := build-$(shell gcc -v 2>&1 | grep "Target:" | cut -d ' ' -f 2)
endif
ifeq ($(HOST_ARCH),emscripten)
	CC       := emcc
	AR       := emar
	LAUNCHER := emrun --port 8080
	RM       := rm -rf
	MKDIR    := mkdir
	ECHO     := echo

	LIBS    := 
	CFLAGS  := -s FULL_ES2=1 -s ASM_JS=1 -s USE_SDL=2 -O2 -Wno-implicit-function-declaration -DEMSCRIPTEN
	LDFLAGS := --preload-file data -s TOTAL_MEMORY=134217728 -lidbfs.js

	RES_GAMELIB := libgame.a
	BUILDDIR    := build-emscripten
endif

include Makefile.common.mk