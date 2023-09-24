cmake_minimum_required(VERSION 3.10)

project(GameLib)

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_SOURCE_DIR}/cmake/" "${CMAKE_CURRENT_SOURCE_DIR}/cmake/")

if (EMSCRIPTEN)
    message(" * Ignore SDL2 package with Emscripten")
    SET(CMAKE_C_FLAGS  "${CMAKE_C_FLAGS} -s USE_SDL=2 -Wno-implicit-function-declaration -DEMSCRIPTEN")
    SET(CMAKE_EXE_LINKER_FLAGS  "${CMAKE_EXE_LINKER_FLAGS} -s USE_SDL=2 -s TOTAL_MEMORY=134217728 -lidbfs.js")
else()
    find_package(SDL2 REQUIRED)
    include_directories(${SDL2_INCLUDE_DIRS})
endif()

set(OpenGL_GL_PREFERENCE GLVND)
find_package(OpenGL REQUIRED)


# -------------------------------------------------------------
# ----- GameLib

set(GAMELIB_HEADERS_PATH ${CMAKE_CURRENT_SOURCE_DIR}/src)

set(GAMELIB_HEADERS 
    src/TimeUtils.h
    src/Util.h
    src/QuadArray2D.h
    src/Draw.h
    src/Input.h
    src/Audio.h
    src/Anim.h
    src/Entity.h
    src/GameLib.h)

set(GAMELIB_SOURCE
    src/TimeUtils.c
    src/Util.c
    src/QuadArray2D.c
    src/Draw.c
    src/Input.c
    src/Audio.c
    src/Anim.c
    src/Entity.c
    src/GameLib.c)

add_library(GameLib STATIC
    ${GAMELIB_HEADERS} ${GAMELIB_SOURCE})
target_include_directories(GameLib PRIVATE ${GAMELIB_HEADERS_PATH})
set(GAMELIB_LIBRARIES ${SDL2_LIBRARIES} ${OPENGL_LIBRARY} m GameLib)

get_directory_property(hasParent PARENT_DIRECTORY)
if(hasParent)
    set(GAMELIB_HEADERS_PATH ${GAMELIB_HEADERS_PATH} PARENT_SCOPE)
    set(GAMELIB_LIBRARIES ${GAMELIB_LIBRARIES} PARENT_SCOPE)
endif()
