
########################
# Utility Declarations #
########################
ifeq ($(VERBOSE_BUILD),true)
	DO_CC=$(CC) $(CFLAGS) -o $@ -c $<
	DO_CXX=$(CXX) $(CFLAGS) -o $@ -c $<
else
	DO_CC=@$(ECHO) "CC: $@" ;\
		$(CC) $(CFLAGS) -o $@ -c $<
	DO_CXX=@$(ECHO) "CXX: $@" ;\
		$(CXX) $(CFLAGS) -o $@ -c $<
endif

########################
# GameLib Declarations #
########################
CFLAGS += -Isrc
GAMELIB_HEADS := \
	src$(SLASH)Time.h \
	src$(SLASH)Util.h \
	src$(SLASH)QuadArray2D.h \
	src$(SLASH)Draw.h \
	src$(SLASH)Input.h \
	src$(SLASH)Audio.h \
	src$(SLASH)Anim.h \
	src$(SLASH)Entity.h \
	src$(SLASH)GameLib.h
GAMELIBS_OBJS := \
	$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Time.o \
	$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Util.o \
	$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)QuadArray2D.o \
	$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Draw.o \
	$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Input.o \
	$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Audio.o \
	$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Anim.o \
	$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Entity.o \
	$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)GameLib.o
RES_GAMELIB_OUT := $(BUILDDIR)$(SLASH)$(RES_GAMELIB)

#################
# General Rules #
#################
all: $(BUILDDIR) $(RES_GAMELIB_OUT)

$(BUILDDIR):
	$(MKDIR) $(BUILDDIR)
	$(MKDIR) $(BUILDDIR)$(SLASH)GameLib.o

clean:
	$(RM) $(GAMELIBS_OBJS) $(RES_GAMELIB_OUT)

lib: $(BUILDDIR) $(RES_GAMELIB_OUT)

rebuild: clean all

#################
# GameLib Rules #
#################
$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Time.o: src$(SLASH)Time.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Util.o: src$(SLASH)Util.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)QuadArray2D.o: src$(SLASH)QuadArray2D.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Draw.o: src$(SLASH)Draw.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Input.o: src$(SLASH)Input.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Audio.o: src$(SLASH)Audio.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Entity.o: src$(SLASH)Entity.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)Anim.o: src$(SLASH)Anim.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)$(SLASH)GameLib.o$(SLASH)GameLib.o: src$(SLASH)GameLib.c $(HEADS)
	$(DO_CC)


################
# Result Rules #
################

$(RES_GAMELIB_OUT): $(GAMELIBS_OBJS)
	@$(ECHO) "STATICLIB: $@"
	@$(AR) rcs $(RES_GAMELIB_OUT) $(GAMELIBS_OBJS)



