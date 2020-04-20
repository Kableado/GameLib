call c:\emsdk\emsdk_env.bat

make -f Makefile.emscripten.mk target=release full-clean
make -f Makefile.emscripten.mk target=release

mkdir DIST\web
copy web\* DIST\web\
copy build-emscripten-release\game.* DIST\web\


pause