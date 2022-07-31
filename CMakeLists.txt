cmake_minimum_required(VERSION 3.10)

project(GameLib)

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_SOURCE_DIR}/cmake/")

find_package(SDL2 REQUIRED)
include_directories(${SDL2_INCLUDE_DIRS})

set(OpenGL_GL_PREFERENCE LEGACY)
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
