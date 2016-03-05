'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	usemin = require('gulp-usemin'),
	minifyHtml = require('gulp-htmlmin'),
  minifyCss = require('gulp-cssnano'),
  minifyJs = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  bowerDevs = require('main-bower-files'),
  filter = require('gulp-filter'),
  webserver = require('gulp-webserver')
;

var paths = {
  index : 'app/index.html',
  app : 'app',
  dist : 'dist',
  scripts : 'app/**/*.js',  
  html_path : 'app/**/*.html',  
  assets : 'app/assets',
  assets_css : 'app/assets/css/*.css',
  bower_components : 'bower_components'
};

/***** Task Bower *****/

/**
* Realiza el bundle de las dependencias JS instaladas con Bower
**/
gulp.task('build-bower-js', function(){
  return gulp
      .src(bowerDevs(['**/*.js']))
      .pipe(gulp.dest(paths.assets + '/js'));
});

/**
* Realiza el bundle de las dependencias CSS instaladas con Bower
**/
gulp.task('build-bower-css', function(){
  return gulp
      .src(bowerDevs(['**/*.css']))      
      .pipe(gulp.dest(paths.assets + '/css'));
});

/**
* Realiza la copia de los fonts instalados con Bower
**/
gulp.task('build-bower-fonts', function(){
  return gulp.src(bowerDevs(['**/*.{eot,ttf,woff,woff2,eof,svg,otf}']))
      .pipe(gulp.dest(paths.assets + '/fonts'));
});

/***** Task Angular Scripts App *****/

/**
* Minifica y Concatena los Scripts App Angular
**/
gulp.task('build-scripts', function(){
  return gulp.src(paths.scripts)
      .pipe(minifyJs())
      .pipe(concat('build-angular.min.js'))
      .pipe(gulp.dest('dist/js'));
});

/***** Task Build Custom Assets App *****/

/**
* Build Assets
**/

/*** HTML ***/
gulp.task('build-html', function(){
  return gulp.src(paths.html_path)
         .pipe(minifyHtml())
         .pipe(gulp.dest('dist'));
});

/***** Task Ajustar Referencias min HTML *****/
/**
* 04 Mar 2016
* Actualiza la Referencia hacia los archivos de la carpeta dist
* para su uso en Producción
**/
gulp.task('usemin', function(){
    return gulp
          .src(paths.index)
          .pipe(usemin())
          .pipe(gulp.dest('dist/'));
});

/**
* Watch Custom Files
**/
gulp.task('watch', function(){  
  gulp.watch([paths.html_path],['build-html']);
  gulp.watch([paths.index],['usemin']);
});

//Server con gulp-webserver
gulp.task('webserver', function(){
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: true,
      port : 8888
    }));
});

gulp.task('build-bower', ['build-bower-js', 'build-bower-css', 'build-bower-fonts']);
gulp.task('build', ['build-scripts', 'build-html', 'usemin']);
gulp.task('default', ['webserver', 'watch']);