'use strict';

// Required Stuff
var gulp = require('gulp');
var sass = require('gulp-sass');

// Compile and Watch our SCSS/CSS
gulp.task('sass', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
gulp.task('sass:watch', function () {
  gulp.watch('./scss/*.scss', ['sass']);
});


// Gulp Tasks
gulp.task('default', ['sass', 'sass:watch'], function() {
  // place code for your default task here
});
