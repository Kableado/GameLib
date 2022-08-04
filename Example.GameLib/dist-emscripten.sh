#!/bin/sh

if test -f /c/emsdk/emsdk_env.sh; then
    source /c/emsdk/emsdk_env.sh
fi

if test -d cmake-build-emscripten; then
    rm -rf cmake-build-emscripten
fi
mkdir cmake-build-emscripten

cd cmake-build-emscripten
emcmake cmake ..
make
cd ..

mkdir -p DIST/web
cp -Rv web/* DIST/web/
cp -Rv cmake-build-emscripten/game.* DIST/web/
