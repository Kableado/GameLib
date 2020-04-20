CC       := emcc
AR       := emar
LAUNCHER := emrun --port 8080
RM       := del
MKDIR    := mkdir
ECHO     := echo
VERBOSE_BUILD := true
SLASH    := \\

GAMELIB_DIR   := ..
GAMELIB_MAKEPARAMS := -f Makefile.emscripten.mk target=release

LIBS       := 
STATICLIBS := $(GAMELIB_DIR)$(SLASH)build-emscripten$(SLASH)libgame.a
CFLAGS     := -s FULL_ES2=1 -s ASM_JS=1 -O1 -Wno-implicit-function-declaration -DEMSCRIPTEN -I$(GAMELIB_DIR)$(SLASH)src 
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


