
IsMinGW := $(findstring MSYS,$(shell uname -s))
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
	include Makefile.win32
endif
ifeq ($(TARGET_ARCH),linux)
	include Makefile.linux
endif
ifeq ($(TARGET_ARCH),macosx)
	include Makefile.macosx
endif
