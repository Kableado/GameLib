
########################
# Utility Declarations #
########################
ifeq ($(VERBOSE_BUILD),true)
	DO_CC=$(CC) $(CFLAGS) -o $@ -c $<
	DO_CXX=$(CXX) $(CFLAGS) -o $@ -c $<
else
	DO_CC=@$(ECHO) "CC: $@" &&\
		$(CC) $(CFLAGS) -o $@ -c $<
	DO_CXX=@$(ECHO) "CXX: $@" &&\
		$(CXX) $(CFLAGS) -o $@ -c $<
endif

########################
# GameLib Declarations #
########################
CFLAGS += -Isrc
GAMELIB_HEADS := \
	src/Time.h \
	src/Util.h \
	src/QuadArray2D.h \
	src/Draw.h \
	src/Input.h \
	src/Audio.h \
	src/Anim.h \
	src/Entity.h \
	src/GameLib.h
GAMELIBS_OBJS := \
	$(BUILDDIR)/Time.o \
	$(BUILDDIR)/Util.o \
	$(BUILDDIR)/QuadArray2D.o \
	$(BUILDDIR)/Draw.o \
	$(BUILDDIR)/Input.o \
	$(BUILDDIR)/Audio.o \
	$(BUILDDIR)/Anim.o \
	$(BUILDDIR)/Entity.o \
	$(BUILDDIR)/GameLib.o
RES_GAMELIB_OUT := $(BUILDDIR)/$(RES_GAMELIB)

#################
# General Rules #
#################
all: $(BUILDDIR) $(RES_GAMELIB_OUT)

$(BUILDDIR):
	$(MKDIR) $(BUILDDIR)

clean:
	$(RM) $(BUILDDIR)

lib: $(BUILDDIR) $(RES_GAMELIB_OUT)

rebuild: clean all

#################
# GameLib Rules #
#################
$(BUILDDIR)/Time.o: src/Time.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)/Util.o: src/Util.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)/QuadArray2D.o: src/QuadArray2D.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)/Draw.o: src/Draw.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)/Input.o: src/Input.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)/Audio.o: src/Audio.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)/Entity.o: src/Entity.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)/Anim.o: src/Anim.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)/GameLib.o: src/GameLib.c $(HEADS)
	$(DO_CC)


################
# Result Rules #
################

$(RES_GAMELIB_OUT): $(GAMELIBS_OBJS)
	@$(ECHO) "STATICLIB: $@"
	@$(AR) rcs $(RES_GAMELIB_OUT) $(GAMELIBS_OBJS)



