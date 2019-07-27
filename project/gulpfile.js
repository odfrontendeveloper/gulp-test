//подключаем модули галпа
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

const CSS_SRC_HOME = [
  './src/sass/reset.scss',
  './src/sass/header.scss',
  './src/sass/maincontent.scss',
  './src/sass/howcanwehelp.scss',
  './src/sass/howcanwehelp.scss',
  './src/sass/slider.scss',
  './src/sass/footer.scss'
];

const CSS_SRC_ABOUT = [
  './src/sass/reset.scss',
  './src/sass/header.scss',
  './src/sass/header-about.scss',
  './src/sass/maincontent.scss',
  './src/sass/maincontent-about.scss',
  './src/sass/howcanwehelp.scss',
  './src/sass/howcanwehelp-about.scss',
  './src/sass/slider.scss',
  './src/sass/slider-about.scss',
  './src/sass/footer.scss'
];

const JS_SRC = './src/js/*';
const CSS_DEST = './build/css';
const JS_DEST = './build/js'

const LEVEL = 2;

gulp.task('transpilationСSS', function(){
  return gulp.src(CSS_SRC_ABOUT)
    .pipe(concat('about.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(CSS_DEST))
});

gulp.task('transpilationСSSwithMinifacation', function(){
  return gulp.src(CSS_SRC_ABOUT)
   .pipe(concat('about.css'))
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

gulp.task('transpilationJS', function(){
  return gulp.src(JS_SRC)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest(JS_DEST))
});

gulp.task('transpilationJSwithMinifacation', function(){
  return gulp.src(JS_SRC)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(minify())
    .pipe(gulp.dest(JS_DEST))
});

gulp.task('hotReload', function(){
  browserSync.init({
    server: "./"
  });
  gulp.watch("./build").on('change', browserSync.reload);
  gulp.watch("./about.html").on('change', browserSync.reload);

  CSS_SRC_ABOUT.forEach(function(hrefdir){
    gulp.watch(hrefdir).on('change', function(){
        gulp.src(CSS_SRC_ABOUT)
        .pipe(concat('about.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
          overrideBrowserslist: ['last 2 versions'],
          cascade: false
        }))
        .pipe(gulp.dest(CSS_DEST));
    });
    gulp.watch(CSS_SRC_ABOUT).on('change', browserSync.reload);
  });

  CSS_SRC_HOME.forEach(function(hrefdir){
    gulp.watch(hrefdir).on('change', function(){
        gulp.src(CSS_SRC_HOME)
        .pipe(concat('about.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
          overrideBrowserslist: ['last 2 versions'],
          cascade: false
        }))
        .pipe(gulp.dest(CSS_DEST));
    });
    gulp.watch(CSS_SRC_HOME).on('change', browserSync.reload);
  });

});

gulp.task('compress', function() {
  gulp.src('./src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./build/img'));
  gulp.watch('./build/img').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series(
  'transpilationСSS',
  'transpilationJS',
  gulp.parallel('compress', 'hotReload')
));

gulp.task('prod', gulp.series(
  'transpilationСSSwithMinifacation',
  'transpilationJSwithMinifacation',
  'compress'
));
