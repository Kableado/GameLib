#!/bin/sh

#make -f Makefile.emscripten target=release clean
#make -f Makefile.emscripten target=release

make -f Makefile.emscripten clean
make -f Makefile.emscripten 

mkdir -p DIST/web
cp -Rv web/* DIST/web/
#cp -v build-emscripten-release/game.* DIST/web/
cp -v build-emscripten/game.* DIST/web/
