CC       := emcc
AR       := emar
LAUNCHER := emrun --port 8080
RM       := del
MKDIR    := mkdir
ECHO     := echo
VERBOSE_BUILD := true
SLASH    := \\

LIBS    := 
CFLAGS  := -s FULL_ES2=1 -s ASM_JS=1 -O1 -Wno-implicit-function-declaration -DEMSCRIPTEN
LDFLAGS := --preload-file data -s TOTAL_MEMORY=134217728 -lidbfs.js

RES_GAMELIB := libgame.a
BUILDDIR    := build-emscripten

ifeq ($(target),release)
	CFLAGS   := $(CFLAGS) -O2
	BUILDDIR := build-emscripten-release
	LDFLAGS  := --preload-file data -s TOTAL_MEMORY=134217728 --emrun
endif

include Makefile.common.mk


