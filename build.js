'use strict';

const Browserify = require('browserify'),
    fs = require('fs');

const buildPath = './public/js/bundle.js',
    main = './src/main.js';

let writeStream = fs.createWriteStream(buildPath);

let browserify = Browserify();

browserify.add(main);

browserify
    .bundle()
    .pipe(writeStream);