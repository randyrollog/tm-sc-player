'use strict';

// TODO clean up unused gulp plugins
var browserify = require('browserify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');
var gulp = require('gulp');


// -------------------------
// SCSS
// -------------------------
gulp.task('sass', () => {
  return gulp.src('app/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app'))
    .pipe(reload({ stream:true }));
});

 
gulp.task('sass:watch', () => {
  gulp.watch('app/scss/**/*.scss', ['sass'], reload);
});



// -------------------------
// JS
// -------------------------
gulp.task('js', () => {
  // set up the browserify instance on a task basis
  return browserify('app/scripts/app.js')
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(fs.createWriteStream('app/main.js'));
});


gulp.task('js:watch', () => {
  gulp.watch('app/scripts/**/*.js', ['js'], reload);
});


gulp.task('watch', ['sass:watch', 'js:watch'], () => {
  gulp.watch('**/*.html', {cwd: 'app'}, reload);
});

// watch files for changes and reload
gulp.task('serve', ['js', 'watch'], () => {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('default', ['serve'], () => {

});