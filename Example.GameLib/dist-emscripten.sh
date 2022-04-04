source /c/emsdk/emsdk_env.sh

make arch=emscripten full-clean
make arch=emscripten

mkdir -p DIST/web
cp -Rv web/* DIST/web/
cp -Rv build-emscripten/game.* DIST/web/
