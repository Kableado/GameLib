
VERBOSE_BUILD := false

IsMinGW := $(findstring MINGW,$(shell uname -s)) $(findstring MSYS,$(shell uname -s))
IsDarwin := $(findstring Darwin,$(shell uname -s))
ifneq (,$(IsMinGW))
	TARGET_ARCH := mingw
else
ifneq (,$(IsDarwin))
	TARGET_ARCH := macosx
else
	TARGET_ARCH := linux
endif
endif

ifeq ($(TARGET_ARCH),mingw)
	CC       := gcc
	AR       := ar
	LAUNCHER :=
	RM       := rm -rf
	MKDIR    := mkdir
	ECHO     := echo
	SLASH    := /

	LIBS    := -L/mingw/lib -lopengl32 -lSDL -lm
	CFLAGS  := -g -mwindows -D_GNU_SOURCE=1 -DWIN32
	LDFLAGS := -g -mwindows -D_GNU_SOURCE=1

	RES_GAMELIB := libgame.a
	BUILDDIR    := build-$(shell gcc -v 2>&1 | grep "Target:" | cut --delimiter=' ' --fields=2)
endif
ifeq ($(TARGET_ARCH),linux)
	CC       := gcc
	AR       := ar
	LAUNCHER :=
	RM       := rm -rf
	MKDIR    := mkdir
	ECHO     := echo
	SLASH    := /

	LIBS    := -lSDL -lpthread -L/usr/X11R6/lib -L/usr/lib -lm -lGL -lX11
	CFLAGS  := -Wall -g -I/usr/include/ -I/usr/include/SDL/ -I/usr/X11R6/include/
	LDFLAGS :=

	RES_GAMELIB := libgame.a
	RES_GAME    := game
	BUILDDIR    := build-$(shell gcc -v 2>&1 | grep "Target:" | cut --delimiter=' ' --fields=2)
endif
ifeq ($(TARGET_ARCH),macosx)
	CC       := gcc
	AR       := ar
	LAUNCHER :=
	RM       := rm -rf
	MKDIR    := mkdir
	ECHO     := echo
	VERBOSE_BUILD := false
	SLASH    := /

	LIBS    := -framework Cocoa -lm -framework OpenGL -framework SDL macosx/SDLMain.m
	CFLAGS  := -Wall -g -DMACOSX -ObjC -Dmain=SDL_main -I/usr/include/ -I/usr/include/SDL/ -I/usr/X11R6/include/
	LDFLAGS :=

	RES_GAMELIB := libgame.a
	BUILDDIR    := build-$(shell gcc -v 2>&1 | grep "Target:" | cut -d ' ' -f 2)
endif

include Makefile.common.mk