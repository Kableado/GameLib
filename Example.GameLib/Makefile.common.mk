
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

#####################
# Game Declarations #
#####################
GAME_HEADS := Game/GameEnts.h Game/GameMap.h
GAME_OBJS := \
	$(BUILDDIR)/GameEnts.o \
	$(BUILDDIR)/GameMap.o \
	$(BUILDDIR)/main.o
RES_GAME_OUT := $(BUILDDIR)/$(RES_GAME)


#################
# General Rules #
#################

.FORCE:
	(cd $(GAMELIB_DIR) && make lib $(GAMELIB_MAKEPARAMS))

all: .FORCE $(BUILDDIR) $(RES_GAME_OUT)

$(BUILDDIR):
	$(MKDIR) $(BUILDDIR)

full-clean: clean
	(cd $(GAMELIB_DIR) && make clean $(GAMELIB_MAKEPARAMS))

clean:
	$(RM) $(BUILDDIR)

run: .FORCE $(BUILDDIR) $(RES_GAME_OUT)
	$(LAUNCHER) ./$(RES_GAME_OUT) debug

rebuild: clean all


##############
# Game Rules #
##############

$(BUILDDIR)/GameEnts.o: src/GameEnts.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)/GameMap.o: src/GameMap.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)/main.o: src/main.c $(HEADS)
	$(DO_CC)



################
# Result Rules #
################

$(RES_GAME_OUT): $(GAME_OBJS)
	@$(ECHO) "LINK: $@"
	@$(CC) $(GAME_OBJS) $(STATICLIBS) -o $(RES_GAME_OUT) $(LIBS) $(CFLAGS) $(LDFLAGS)




