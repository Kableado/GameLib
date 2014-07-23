#!/bin/sh

make -f Makefile.emscripten target=release clean
make -f Makefile.emscripten target=release

mkdir -p DIST/web
cp -Rv web/* DIST/web/
cp -v build-emscripten-release/game.* DIST/web/
