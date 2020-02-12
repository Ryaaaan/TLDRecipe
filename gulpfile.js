'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var concat = require('gulp-concat');

gulp.task('concat', function() {
  return gulp.src([
    'scripts/custom/main.js',
    'scripts/custom/notifications.js',
    'scripts/custom/big-list.js',
    'scripts/custom/cookies.js',
    'scripts/custom/video.js',
    'scripts/custom/recipe.js']
  )
    .pipe(concat('tldr.js'))
    .pipe(gulp.dest('scripts/'));
});

gulp.task('compress', function () {
  return pipeline(
    gulp.src('scripts/tldr.js'),
    uglify({
      compress: {
        // compress options
      },
      output: {
        // output options
      }
    }),
    gulp.dest('scripts/min')
  );
});


// Gulp Tasks
gulp.task('default', gulp.series(['concat', 'compress'], function(cb) {
  // place code for your default task here
  cb();
}));
