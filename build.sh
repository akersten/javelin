#!/bin/sh

# This script builds the SCSS, Typescript, and other static files from source. It should be non-destructive and
# idempotent.

clear

echo "Javelin build started..."

echo "  Building stylesheets..."

if  [ ! -d bin/css ]
then
    mkdir -p bin/css
fi

mkdir -p bin/css
sass --update src/scss:bin/css

echo "  Building scripts..."

rm -rf bin/js
if  [ ! -d bin/js ]
then
    mkdir -p bin/js
fi

tsc

echo "  Copying dependencies..."

rsync -av src/deps/ bin/

echo "  Copying markup..."

rsync -av src/html/ bin/

#echo "  Bundling scripts..."
#browserify static/js/bin/base.js -o static/js/bin/base.bundled.js
#for f in $(find static/js/bin/react-apps/ -name '*.js'); do echo "    $f"; browserify $f -o ${f%.*}.bundled.js; done

echo "-----------------------------------------------------------------------------------"
echo "Build complete."
echo "-----------------------------------------------------------------------------------"

