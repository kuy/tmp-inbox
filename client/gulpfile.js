var gulp = require('gulp');
var util = require('gulp-util');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

gulp.task('transpile', function() {
  gulp.src('src/*.js')
    .pipe(plumber())
    .pipe(watch('src/*.js'))
    .pipe(babel())
    .pipe(gulp.dest('build'))
});

gulp.task('default', ['transpile'], function() {
  gulp.src('build/*.js')
    .pipe(plumber())
    .pipe(watch('build/*.js'))
    .pipe(browserify({insertGlobals: true}))
    .pipe(gulp.dest('../server/public/js'))
});
