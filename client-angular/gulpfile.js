var browserify = require('browserify');
var globby = require('globby');
var through = require('through2');
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

gulp.task('transpile', function() {
  gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(watch('src/**/*.js'))
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['transpile'], function() {
  watch('build/**/*.js', function () {
    var output = through();

    output
      .pipe(source('app-angular.js'))
      .pipe(gulp.dest('../server/public/js'));

    globby(['build/**/*.js']).then(function (entries) {
      browserify({ entries: entries })
        .bundle()
        .pipe(output);
    });
  });
});
