
VERBOSE_BUILD := false
GAMELIB_DIR   := ..
GameLibConfig := $(GAMELIB_DIR)/gamelib-config
GAMELIB_MAKEPARAMS := 

ARCH := 
ifeq ($(arch),emscripten)
	ARCH := emscripten
	GAMELIB_MAKEPARAMS := arch=emscripten
endif

LIBS       := $(shell $(GameLibConfig) $(ARCH) --libs)
STATICLIBS := $(shell $(GameLibConfig) $(ARCH) --static-libs)
CFLAGS     := $(shell $(GameLibConfig) $(ARCH) --cflags)
PLATFORM   := $(shell $(GameLibConfig) $(ARCH) --platform)
EXEEXT     := $(shell $(GameLibConfig) $(ARCH) --exe-extension)
LDFLAGS    := $(shell $(GameLibConfig) $(ARCH) --ldflags)

RES_GAME := game$(EXEEXT)
BUILDDIR := build-$(PLATFORM)

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
endif
ifeq ($(HOST_ARCH),linux)
	CC       := gcc
	AR       := ar
	LAUNCHER :=
	RM       := rm -rf
	MKDIR    := mkdir
	ECHO     := echo
endif
ifeq ($(HOST_ARCH),macosx)
	CC       := gcc
	AR       := ar
	LAUNCHER :=
	RM       := rm -rf
	MKDIR    := mkdir
	ECHO     := echo
endif

ifeq ($(ARCH),emscripten)
	CC       := emcc
	AR       := emar
	LAUNCHER := emrun --port 8080
endif


include Makefile.common.mk