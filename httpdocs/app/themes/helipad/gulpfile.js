const {src, dest, series, watch, parallel} = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// JS Optimisation Dependencies
const rename = require('gulp-rename');
const webpackStream = require('webpack-stream');

// PostCSS & Sass Dependencies
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


/**
 * Settings
 */
let domain = 'helipad.test'; // Used for BrowserSync


/**
 * Watchers
 * listen out for js, scss, php, html and image
 * changes and perform respective tasks
 */

function watchForChanges(cb) {
  watch('src/scss/**/*.scss', compileSass);  // Watch for Sass changes
  watch('src/js/**/*.js', compileScripts); // Watch for JS changes
  watch('**/*.php', reloadBrowser); // Watch for PHP changes
  watch('**/*.html', reloadBrowser); // Watch for HTML changes
  watch('src/media/**/*', minifyImages);
}


/**
 * Reload the browser tab on save
 */
function reloadBrowser(cb) {
  browserSync.init({
    baseDir: './',
    proxy: 'http://' + domain,
    host: domain,
    open: 'external'
  })
}


/**
 * Gulp SASS compile task
 * @param cb
 * @returns {*}
 */
function compileSass(cb) {

  // PostCss Plugins to run after Sass compile
  let postCssPlugins = [
    autoprefixer(),
    cssnano()
  ];

  return src('src/scss/main.scss')
    .pipe(sourcemaps.init())

    // We want to log any sass errors
    .pipe(sass().on('error', sass.logError))

    // PostCSS Pipeline
    .pipe(postcss(postCssPlugins))

    // Generate source maps and write our new compiled
    // css file to the dist/css directory
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
}

/**
 * Gulp Javascript compile task
 * @param cb
 * @returns {*}
 */
function compileScripts(cb) {
  return src('src/js/index.js')
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
                presets: ['@babel/env', '@babel/typescript']
              }
            }
          ]
        }
      }
    ))

    .on('error', handleError)

    .pipe(sourcemaps.write())

    .pipe(rename('scripts.js'))
    .pipe(dest('dist/js/'))

    .pipe(browserSync.reload({
      stream: true
    }));

}

/**
 * Gulp image minification task
 * @param cb
 * @returns {*}
 */
function minifyImages(cb) {
  return src('src/media/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(dest('dist/media'))
}

/**
 * Output errors to the console
 * @param err
 */
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}


// Module exports...

exports.sass = compileSass;
exports.script = compileScripts;
exports.images = minifyImages;

exports.watch = series(reloadBrowser, watchForChanges);
exports.default = parallel(compileSass, compileScripts, minifyImages);