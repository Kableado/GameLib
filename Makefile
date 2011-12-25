ifneq (,$(findstring MINGW,$(shell uname -s)))
	TARGET_ARCH=mingw
else
ARCH:=$(shell uname)
ifeq ($(ARCH), Darwin)
	TARGET_ARCH=macosx
else
	TARGET_ARCH=linux
endif # Darwin
endif # windir





ifeq ($(TARGET_ARCH),mingw)
	OPENGL_DRAW=opengl
	include Makefile.win32
else
ifeq ($(TARGET_ARCH),linux)
	OPENGL_DRAW=opengl
	include Makefile.linux
else
ifeq ($(TARGET_ARCH),macosx)
	OPENGL_DRAW=opengl
	include Makefile.macosx
endif # macosx
endif # linux
endif # mingw
