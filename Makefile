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
	include Makefile.mingw
else
ifeq ($(TARGET_ARCH),linux)
	include Makefile.linux
else
ifeq ($(TARGET_ARCH),macosx)
	include Makefile.macosx
endif # macosx
endif # linux
endif # mingw
