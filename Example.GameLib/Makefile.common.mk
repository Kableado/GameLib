
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

#####################
# Game Declarations #
#####################
GAME_HEADS := $(GAMELIB_HEADS) Game$(SLASH)GameEnts.h Game$(SLASH)GameMap.h
GAME_OBJS := \
	$(BUILDDIR)$(SLASH)Game.o$(SLASH)GameEnts.o \
	$(BUILDDIR)$(SLASH)Game.o$(SLASH)GameMap.o \
	$(BUILDDIR)$(SLASH)Game.o$(SLASH)main.o
RES_GAME_OUT := $(BUILDDIR)$(SLASH)$(RES_GAME)


#################
# General Rules #
#################

.FORCE:
	(cd $(GAMELIB_DIR) && make lib $(GAMELIB_MAKEPARAMS))

all: .FORCE $(BUILDDIR) $(RES_GAME_OUT)

$(BUILDDIR):
	$(MKDIR) $(BUILDDIR)
	$(MKDIR) $(BUILDDIR)$(SLASH)Game.o

full-clean: clean
	(cd $(GAMELIB_DIR) && make clean $(GAMELIB_MAKEPARAMS))

clean:
	$(RM) $(GAME_OBJS) $(RES_GAME_OUT)

run: $(BUILDDIR) $(RES_GAME_OUT)
	$(LAUNCHER) ./$(RES_GAME_OUT) debug

rebuild: clean all


##############
# Game Rules #
##############

$(BUILDDIR)$(SLASH)Game.o$(SLASH)GameEnts.o: src$(SLASH)GameEnts.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)$(SLASH)Game.o$(SLASH)GameMap.o: src$(SLASH)GameMap.c $(HEADS)
	$(DO_CC)
$(BUILDDIR)$(SLASH)Game.o$(SLASH)main.o: src$(SLASH)main.c $(HEADS)
	$(DO_CC)



################
# Result Rules #
################

$(RES_GAME_OUT): $(GAME_OBJS)
	@$(ECHO) "LINK: $@"
	@$(CC) $(GAME_OBJS) $(STATICLIBS) -o $(RES_GAME_OUT) $(LIBS) $(CFLAGS) $(LDFLAGS)




