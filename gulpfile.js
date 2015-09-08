'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  compress = require('gulp-compressor'),
  notify = require('gulp-notify'),
  gulpif = require('gulp-if'),
  browserSync = require('browser-sync').create();

var options = {};
  
  options.assetsPath = './assets/'
  options.paths = {
    scssPath : options.assetsPath+'scss/',
    cssPath : options.assetsPath+'css/',
    jsPath : options.assetsPath+'js/'
  };

  options.isBuild = false;

////
// Compile CSS
gulp.task('css', function() { 
  // Grab global SCSS file
  gulp.src( options.paths.scssPath+'/styles.scss' )
  // Compile SCSS to CSS
  .pipe(sass())
  // Auto-prefix only if we're building
  .pipe(gulpif(options.isBuild, prefix('last 3 versions')))
  // Minifiy only if we're building
  .pipe(gulpif(options.isBuild, compress()))
  // Create final CSS file
  .pipe(gulp.dest(options.paths.cssPath))
  // Notify end task
  .pipe(notify('CSS compiled'));
});


////
// Compile JS
gulp.task('js', function() {
});



////
// Browser Sync
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "yourlocal.dev"
//     });
// });







gulp.task( 'watch', function() {
  gulp.watch( options.paths.scssPath+'*.scss', ['css'] );
});

gulp.task('build', function() {
  options.isBuild = true;
  gulp.start('css');
});

// The default task (called when you run `gulp` from cli)
gulp.task( 'default', ['watch']);