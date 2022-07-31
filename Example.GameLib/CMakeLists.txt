cmake_minimum_required(VERSION 3.10)

project(Example.GameLib)


add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/../ ${CMAKE_CURRENT_BINARY_DIR}/GameLib)


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
