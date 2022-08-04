cmake_minimum_required(VERSION 3.10)

project(Example.GameLib)


add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/../ ${CMAKE_CURRENT_BINARY_DIR}/GameLib)

if (EMSCRIPTEN)
    SET(CMAKE_C_FLAGS  "${CMAKE_C_FLAGS} -s USE_SDL=2 -O2 -Wno-implicit-function-declaration -DEMSCRIPTEN")
    SET(CMAKE_EXE_LINKER_FLAGS  "${CMAKE_EXE_LINKER_FLAGS} -s USE_SDL=2 --preload-file ${CMAKE_CURRENT_SOURCE_DIR}/data@/data -s TOTAL_MEMORY=134217728 -lidbfs.js")
    SET(CMAKE_EXECUTABLE_SUFFIX ".html")
endif()


# -------------------------------------------------------------
# ----- Example.GameLib


set(GAME_HEADERS_PATH ${CMAKE_CURRENT_SOURCE_DIR}/src)

set(GAME_HEADERS
    src/GameEnts.h
    src/GameMap.h)

set(GAME_SOURCE
    src/GameEnts.c
    src/GameMap.c
    src/main.c)

add_executable(game WIN32 
    ${GAME_HEADERS} ${GAME_SOURCE})
target_include_directories(game PRIVATE
    ${GAMELIB_HEADERS_PATH}
    ${GAME_HEADERS_PATH})
target_link_libraries(game ${GAMELIB_LIBRARIES})
