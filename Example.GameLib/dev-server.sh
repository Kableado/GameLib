#! /bin/sh

(sleep 1 && xdg-open http://localhost:8081) &

php -S 0.0.0.0:8081 -t DIST/web