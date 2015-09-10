'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  compress = require('gulp-compressor'),
  notify = require('gulp-notify'),
  gulpif = require('gulp-if'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  size = require('gulp-size');


////// Settings

//// Default files and folders
var settings = {};
settings.assetsPath = './assets/'
settings.distPath = './dist/'
settings.paths = {
  scss : settings.assetsPath+'scss/',
  css : settings.distPath+'css/',
  js : settings.assetsPath+'js/',
  jsDist : settings.distPath+'js/'
};
settings.fileName = {
  scss : 'styles.scss',
  css : 'styles.css',
  js : 'global.js'
}

//// Default configuration options for plugins
settings.options = {
  autoprefixer : 'last 3 versions',
  size : {
    showFiles : true
  },
  uglify : {
    compress: {
      drop_console: true
    }
  }
}

settings.isBuild = false;

////// Tasks

//// Compile CSS
gulp.task('css', function() {
  // Grab global SCSS file
  gulp.src(settings.paths.scss+settings.fileName.scss)
  // Compile SCSS to CSS
  .pipe(sass())
  // [BUILD] Auto-prefix
  .pipe(gulpif(settings.isBuild, prefix(settings.options.autoprefixer)))
  // [BUILD] Minifiy
  .pipe(gulpif(settings.isBuild, compress()))
  // Create final CSS file
  .pipe(size(settings.options.size))
  .pipe(gulp.dest(settings.paths.css))
  // Notify end task
  .pipe(notify(settings.fileName.css+' compiled'));
});

//// Compile JS
gulp.task('js', function() {
  // Grab all JS files
  gulp.src(settings.paths.js+'/**/*.js')
    // Merge them in one global file
    .pipe(concat(settings.fileName.js))
    // [BUILD] Remove comments & console.log
    .pipe(gulpif(settings.isBuild, uglify(settings.options.uglify) ))
    // Create the final JS file
    .pipe(size(settings.options.size))
    .pipe(gulp.dest(settings.paths.jsDist))
    // Notify end task
    .pipe(notify(settings.fileName.js+' compiled'));
});

//// Optimize & Compress images
// https://www.npmjs.com/package/gulp-imagemin/

gulp.task( 'watch', function() {
  gulp.watch( settings.paths.scss+'**/*.scss', ['css'] );
  gulp.watch( settings.paths.js+'/**/*.js', ['js'] );
});

gulp.task('build', function() {
  settings.isBuild = true;
  gulp.start('css');
  gulp.start('js');
});

// The default task
gulp.task( 'default', ['watch']);