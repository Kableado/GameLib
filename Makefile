
IsMinGW := $(findstring MSYS,$(shell uname -s))$(findstring MINGW,$(shell uname -s))
ifneq (,$(IsMinGW))
	TARGET_ARCH := mingw
else
	TARGET_ARCH := linux
endif

ifeq ($(TARGET_ARCH),mingw)
	include Makefile.win32
else
ifeq ($(TARGET_ARCH),linux)
	include Makefile.linux
endif # linux
endif # mingw
