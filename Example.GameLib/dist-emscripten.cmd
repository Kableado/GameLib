call c:\emsdk\emsdk_env.bat

make -f Makefile.emscripten.mk target=release full-clean
make -f Makefile.emscripten.mk target=release

mkdir DIST\web
xcopy web\* DIST\web\ /s /e /y
xcopy build-emscripten-release\game.* DIST\web\ /s /e /y


pause