ifneq (,$(findstring MINGW,$(shell uname -s)))
	TARGET_ARCH=mingw
else
	TARGET_ARCH=linux
endif # windir


ifeq ($(TARGET_ARCH),mingw)
	include Makefile.win32
else
ifeq ($(TARGET_ARCH),linux)
	include Makefile.linux
endif # linux
endif # mingw
