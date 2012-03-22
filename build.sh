#/bin/bash
java -jar ../../tools/yuicompressor/build/yuicompressor-2.4.7.jar --type js -v src/slider.js -o min/slider.js
java -jar ../../tools/yuicompressor/build/yuicompressor-2.4.7.jar --type css -v src/slider.css -o min/slider.css
