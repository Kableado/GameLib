CC       := emcc
AR       := emar
LAUNCHER := emrun --port 8080
RM       := del /Q /S
MKDIR    := mkdir
ECHO     := echo
VERBOSE_BUILD := false

GAMELIB_DIR   := ..
GAMELIB_MAKEPARAMS := -f Makefile.emscripten.mk

LIBS       := 
STATICLIBS := $(GAMELIB_DIR)/build-emscripten/libgame.a
CFLAGS     := -s FULL_ES2=1 -s ASM_JS=1 -O1 -Wno-implicit-function-declaration -DEMSCRIPTEN -I$(GAMELIB_DIR)/src 
PLATFORM   := emscripten
EXEEXT     := .html
LDFLAGS    := --preload-file data -s TOTAL_MEMORY=134217728 -lidbfs.js

RES_GAME := game$(EXEEXT)
BUILDDIR := build-$(PLATFORM)

ifeq ($(target),release)
	CFLAGS   := $(CFLAGS) -O2
	BUILDDIR := build-emscripten-release
	GAMELIB_MAKEPARAMS := -f Makefile.emscripten.mk target=release
endif

include Makefile.common.mk


