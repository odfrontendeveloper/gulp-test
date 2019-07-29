const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const webpack = require('webpack-stream');
const pug = require('gulp-pug');

const CSS_SRC = './src/sass/*.scss';
const CSS_DEST = './build/css';
const JS_SRC = './src/js/*.js';
const JS_DEST = './build/js';
const LEVEL = 2;

gulp.task('transpilationСSS', function(){
  return gulp.src(CSS_SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(CSS_DEST))
});

gulp.task('transpilationСSSwithMinifacation', function(){
  return gulp.src(CSS_SRC)
   .pipe(sass().on('error', sass.logError))
   .pipe(autoprefixer({
     overrideBrowserslist: ['last 2 versions'],
     cascade: false
   }))
   .pipe(cleanCSS({
     level: LEVEL
   }))
   .pipe(gulp.dest(CSS_DEST))
});

gulp.task('mainJs', function(){
  return gulp.src('./src/js/main.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(webpack({
    output: {
      filename: 'main.js',
    }
  }))
  .pipe(gulp.dest('./build/js'));
});

gulp.task('aboutJs', function(){
  return gulp.src('./src/js/about.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(webpack({
      output: {
        filename: 'about.js',
      }
    }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('transpilationJS', gulp.series(
  'mainJs',
  'aboutJs'
));

gulp.task('htmlcode', function buildHTML() {
  return gulp.src('./src/pug/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./'))
});

gulp.task('hotReload', function(){
  browserSync.init({
    server: "./"
  });
  gulp.watch("./build").on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
  gulp.watch('./src/sass/**/*.scss').on('change', function(){
  gulp.src(CSS_SRC)
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest(CSS_DEST))
  });
  gulp.watch(CSS_SRC).on('change', browserSync.reload);
});

gulp.task('compress', function() {
  gulp.src('./src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./build/img'));
  gulp.watch('./build/img').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series(
  'htmlcode',
  'transpilationСSS',
  'transpilationJS',
  gulp.parallel('compress', 'hotReload')
));

gulp.task('prod', gulp.series(
  'transpilationСSSwithMinifacation',
  'transpilationJS',
  'compress'
));
