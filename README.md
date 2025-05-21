# GameLib

GameLib is a 2D game development library written in C, designed to simplify the creation of games by providing core functionalities like entity management, drawing, audio, and input handling.

## How to Build and Use

### Prerequisites

Before building GameLib, ensure you have the following installed:
*   A C compiler (e.g., GCC, Clang)
*   CMake (version 3.10 or higher)
*   SDL2 library (development headers and libraries)
*   OpenGL library (development headers and libraries)

*(Note: For Emscripten builds, SDL2 and OpenGL are handled differently as specified in `CMakeLists.txt`)*

### Building the Library

1.  **Clone the repository:**
    ```shell
    git clone https://github.com/Kableado/GameLib.git
    cd GameLib
    ```

2.  **Configure and build with CMake:**
    Run CMake in the root directory of the project to generate build files, then build the library.
    ```shell
    cmake ./
    cmake --build ./
    ```
    This will produce the static library `libGameLib.a` in the current directory.

### Linking GameLib with Your Project

There are two main ways to link GameLib:

1.  **Using CMake (Recommended):**
    The `Example.GameLib/` directory in this repository demonstrates how to link GameLib with a CMake-based project. You can use its `CMakeLists.txt` as a reference. Typically, this involves using `add_subdirectory()` to include GameLib in your project or `find_package()` if GameLib is installed system-wide.

2.  **Manual Linking:**
    *   Copy the generated `libGameLib.a` file to your project's library directory.
    *   Copy all header files from the `src/` directory of GameLib into your project's include path (or a standard system include path like `/usr/local/include/gamelib/` if you prefer).
    *   When compiling your game, ensure you link against `libGameLib.a` and its dependencies (SDL2, OpenGL, and `m` for math). For example, with GCC:
        ```shell
        gcc your_game_code.c -L/path/to/gamelib_library -lGameLib -lSDL2 -lGL -lm -o your_game
        ```
        (Adjust paths and library names as per your system setup.)

## Project Structure

Here's an overview of the key directories and files in the GameLib repository:

*   `src/`: Contains all the source code (`.c` files) and public header files (`.h` files) for the GameLib library.
*   `Example.GameLib/`: An example game project that demonstrates how to integrate and use the GameLib library. It includes its own `CMakeLists.txt` and sample game code.
*   `cmake/`: Contains CMake helper scripts used during the build process (e.g., `FindSDL2.cmake`).
*   `LICENSE.txt`: Contains the full text of the MIT License under which GameLib is distributed.
*   `README.md`: This file, providing information about the library.
*   `CMakeLists.txt`: The main CMake build script for compiling the GameLib library.

## License

GameLib is distributed under the **MIT License**. See the `LICENSE.txt` file for the full license text.

Copyright (c) 2012-2023 Valeriano Alfonso Rodriguez
