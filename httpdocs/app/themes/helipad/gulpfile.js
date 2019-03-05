const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const sourcemaps = require('gulp-sourcemaps');

// JS Optimisation Dependencies
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

// PostCSS & Sass Dependencies
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const browserSync = require('browser-sync').create();

/**
 * Settings
 */
let domain = 'stg.test'; // Used for BrowserSync


/**
 * Watchers
 * listen out for js, scss, php, html and image
 * changes and perform respective tasks
 */
gulp.task('watch', ['browserSync', 'sass', 'scripts'], function () {
  gulp.watch('src/scss/**/*.scss', ['sass']);  // Watch for Sass changes
  gulp.watch('src/js/**/*.js', ['scripts']); // Watch for JS changes
  gulp.watch('**/*.php', browserSync.reload); // Watch for PHP changes
  gulp.watch('**/*.html', browserSync.reload); // Watch for HTML changes
  gulp.watch('src/media/**/*', ['images']);
});


/**
 * Reload the browser tab on save
 */
gulp.task('browserSync', function () {
  browserSync.init({
    baseDir: './',
    proxy: 'http://' + domain,
    host: domain,
    open: 'external'
  })
});


/**
 * Gulp Sass compile task
 */
gulp.task('sass', function () {

  // PostCss Plugins to run after Sass compile
  let postCssPlugins = [
    autoprefixer(),
    cssnano()
  ];

  return gulp.src('src/scss/main.scss')
    .pipe(sourcemaps.init())

    // We want to log any sass errors
    .pipe(sass().on('error', sass.logError))

    // PostCSS Pipeline
    .pipe(postcss(postCssPlugins))

    // Generate source maps and write our new compiled
    // css file to the dist/css directory
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

/**
 * Gulp Javascript compile task
 */
gulp.task('scripts', function () {
  return gulp.src('src/js/index.js')
    .pipe(sourcemaps.init())

    .pipe(webpackStream(
      {
        entry: './src/js/index.js',
        output: {
          filename: 'scripts.js',
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader',
              query: {
                presets: ['@babel/env']
              }
            }
          ]
        }
      }
    ))

    .on('error', handleError)

    .pipe(sourcemaps.write())

    .pipe(rename('scripts.js'))
    .pipe(gulp.dest('dist/js/'))

    .pipe(browserSync.reload({
      stream: true
    }));

});

/**
 * Gulp image optimisation task
 */
gulp.task('images', function () {
  return gulp.src('src/media/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/media'))
});


function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}