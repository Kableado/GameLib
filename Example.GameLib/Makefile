
VERBOSE_BUILD := false
GAMELIB_DIR   := ..
GameLibConfig := $(GAMELIB_DIR)/gamelib-config

LIBS       := $(shell $(GameLibConfig) --libs)
STATICLIBS := $(shell $(GameLibConfig) --static-libs)
CFLAGS     := $(shell $(GameLibConfig) --cflags)
PLATFORM   := $(shell $(GameLibConfig) --platform)
EXEEXT     := $(shell $(GameLibConfig) --exe-extension)
LDFLAGS    :=

RES_GAME := game$(EXEEXT)
BUILDDIR := build-$(PLATFORM)

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
endif
ifeq ($(TARGET_ARCH),linux)
	CC       := gcc
	AR       := ar
	LAUNCHER :=
	RM       := rm -rf
	MKDIR    := mkdir
	ECHO     := echo
	SLASH    := /

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
	LIBS     := $(LIBS) macosx/SDLMain.m
endif

include Makefile.common.mk