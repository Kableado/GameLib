#!/bin/sh

DATE=$(date +%Y%m%d)
DIRNAME="Lonely_Ruins"
ZIPNAME="$DIRNAME.$DATE.zip"

make -f Makefile.linux
make -f Makefile.mingw

mkdir $DIRNAME
cd $DIRNAME
cp -v ../readme.txt ./
cp -v ../build-mingw/game.exe ./game-windows.exe
cp -v ../build-linux/game ./game-linux.bin
cp -v ../SDL.dll ./
cp -v ../libSDL-1.2.so.0 ./
mkdir data
cp -v ../data/*.bmp data/
cp -v ../data/*.wav data/
cp -v ../data/level_*.txt data/
cd ..

rm $ZIPNAME
zip -r $ZIPNAME $DIRNAME

rm -rf $DIRNAME

