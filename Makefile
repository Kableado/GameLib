
VERBOSE_BUILD := false

HOST_ARCH   := 
HOST_OS     := $(shell uname -o )
HOST_KERNEL := $(shell uname -s )
ifeq ($(HOST_OS),Msys)
	HOST_ARCH := mingw
endif
ifeq ($(HOST_KERNEL),Linux)
	HOST_ARCH := linux
endif
ifeq ($(HOST_KERNEL),Darwin)
	HOST_ARCH := macosx
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
	BUILDDIR    := build-$(shell gcc -dumpmachine )
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
	BUILDDIR    := build-$(shell gcc -dumpmachine )
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
	BUILDDIR    := build-$(shell gcc -dumpmachine )
endif
ifeq ($(arch),emscripten)
	CC       := emcc
	AR       := emar
	LAUNCHER := emrun --port 8080

	LIBS    := 
	CFLAGS  := -s USE_SDL=2 -O2 -Wno-implicit-function-declaration -DEMSCRIPTEN
	LDFLAGS := --preload-file data -s TOTAL_MEMORY=134217728 -lidbfs.js

	RES_GAMELIB := libgame.a
	BUILDDIR    := build-emscripten
endif

include Makefile.common.mk