CC       := emcc
AR       := emar
LAUNCHER := emrun --port 8080
RM       := del /Q /S
MKDIR    := mkdir
ECHO     := echo
VERBOSE_BUILD := false

LIBS    := 
CFLAGS  := -s FULL_ES2=1 -s ASM_JS=1 -O1 -Wno-implicit-function-declaration -DEMSCRIPTEN
LDFLAGS := --preload-file data -s TOTAL_MEMORY=134217728 -lidbfs.js

RES_GAMELIB := libgame.a
BUILDDIR    := build-emscripten

ifeq ($(target),release)
	CFLAGS   := $(CFLAGS) -O2
	BUILDDIR := build-emscripten-release
endif

include Makefile.common.mk


