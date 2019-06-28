/**
 * This is the gulp.js main task-watcher file
 *
 * @package Helipad
 * @author Benjamin Roffe
 */

const { src, dest, watch, parallel } = require( 'gulp' )
const imagemin = require( 'gulp-imagemin' )
const cache = require( 'gulp-cache' )
const sourcemaps = require( 'gulp-sourcemaps' )
const browserSync = require( 'browser-sync' ).create()

// JS Compilation Dependencies.
const rename = require( 'gulp-rename' )
const webpackStream = require( 'webpack-stream' )

// PostCSS & Sass Dependencies.
const sass = require( 'gulp-sass' )
const postcss = require( 'gulp-postcss' )
const autoprefixer = require( 'autoprefixer' )
const cssnano = require( 'cssnano' )

/**
 * Settings
 */
let domain = 'helipad.test' // Used for BrowserSync.

/**
 * Watchers
 * listen out for js, scss, php, html and image
 * changes and perform respective tasks
 */

function watchForChanges () {
  watch( 'src/scss/**/*.scss', compileSass )  // Watch for Sass changes.
  watch( '**/*.ts', compileScripts ) // Watch for JS changes.
  watch( '**/*.php', browserSync.reload ) // Watch for PHP changes.
  watch( '**/*.html', browserSync.reload ) // Watch for HTML changes.
  watch( 'src/media/**/*', minifyImages )
}

/**
 * Reload the browser tab on save
 */
function reloadBrowser () {
  browserSync.init( {
                      baseDir: './',
                      proxy: 'http://' + domain,
                      host: domain,
                      open: 'external',
                    } )
}

/**
 * Gulp SASS compile task
 * @returns {*}
 */
function compileSass () {

  // PostCss Plugins to run after Sass compile.
  let postCssPlugins = [
    autoprefixer(),
    cssnano(),
  ]

  return src( 'src/scss/main.scss' ).
    pipe( sourcemaps.init() )

    // We want to log any sass errors
    .pipe( sass().on( 'error', sass.logError ) )

    // PostCSS Pipeline
    .pipe( postcss( postCssPlugins ) )

    // Generate source maps and write our new compiled
    // css file to the dist/css directory
    .pipe( sourcemaps.write() ).
    pipe( dest( 'dist/css' ) ).
    pipe( browserSync.reload( {
                                stream: true,
                              } ) )
}

/**
 * Gulp Javascript compile task
 * @param cb
 * @returns {*}
 */
function compileScripts () {
  return src( 'src/js/index.ts' ).
    pipe( sourcemaps.init() ).
    pipe( webpackStream(
      {
        mode: 'development',
        entry: './src/js/index.ts',
        output: {
          filename: 'scripts.js',
        },
        resolve: {
          // Add `.ts` and `.tsx` as a resolvable extension.
          extensions: [ '.ts', '.tsx', '.js' ],
        },
        module: {
          rules: [
            {
              test: /\.(ts)$/,
              exclude: /(node_modules)/,
              loader: 'ts-loader',
            },
          ],
        },
      },
    ) ).
    on( 'error', handleError ).
    pipe( rename( 'scripts.js' ) ).
    pipe( dest( 'dist/js/' ) ).
    pipe( browserSync.reload( {
                                stream: true,
                              } ) )

}

/**
 * Gulp image minification task
 * @returns {*}
 */
function minifyImages () {
  return src( 'src/media/**/*.+(png|jpg|gif|svg)' ).
    pipe( cache( imagemin( {
                             interlaced: true,
                           } ) ) ).
    pipe( dest( 'dist/media' ) )
}

/**
 * Output errors to the console
 * @param err
 */
function handleError ( err ) {
  console.log( err.toString() )
  this.emit( 'end' )
}

/**
 * Run compilation and minification functions
 * @returns {*}
 */
function build () {
  return parallel(
    compileScripts,
    compileSass,
    minifyImages,
  )
}

// Module exports...

exports.sass = compileSass
exports.scripts = compileScripts
exports.images = minifyImages

exports.watch = parallel( reloadBrowser, watchForChanges )

exports.build = build
exports.default = build