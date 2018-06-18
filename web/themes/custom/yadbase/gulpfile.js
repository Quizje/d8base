var gulp        = require('gulp'),
  browserSync = require('browser-sync'),
  sass        = require('gulp-sass'),
  prefix      = require('gulp-autoprefixer'),
  concat      = require('gulp-concat'),
  babel       = require('gulp-babel'),
  cp          = require('child_process'),
  sourcemaps  = require('gulp-sourcemaps');

/**
 * Launch the Server
 */
gulp.task('browser-sync', ['sass', 'scripts'], function() {
  browserSync.init({
    // Change as required, also remember to set in theme settings
    proxy: "yadbase.yad",
    port: 3000
  });
});

/**
 * @task Clean
 * Removes the dist folder before building
 */
/*gulp.task('clean', function() {
  return del.sync(['dist', '../eurogarant/dist', '../febelcar/dist']);
});*/

/**
 * @task sass
 * Compile files from scss
 */
gulp.task('sass', function () {
  return gulp.src(['./src/scss/style.scss',])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefix(['last 3 versions', '> 1%', 'ie 8'], { cascade: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
});
/**
 * @task images
 * Copy images
 */
gulp.task('images', function() {
  return gulp.src('./src/images/*.*')
    .pipe(gulp.dest('./dist/images'))
});
/**
 * @task scripts
 * Compile files from js
 */
gulp.task('scripts', function() {
  return gulp.src(['./src/js/*.js', './src/js/custom.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./dist/js'))
});

/**
 * @task templates
 * Copies template files to themes
 */
gulp.task('templates', function() {
  return gulp.src(['./templates/*.html.twig', './templates/**/*.html.twig'])
});

/**
 * @task clearcache
 * Clear all caches
 */
gulp.task('clearcache', function(done) {
  return cp.spawn('drush', ['cache-rebuild'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * @task reload
 * Refresh the page after clearing cache
 */
gulp.task('reload', ['clearcache'], function () {
  browserSync.reload();
});

/**
 * @task watch
 * Watch scss files for changes & recompile
 * Clear cache when Drupal related files are changed
 */
gulp.task('watch', function () {
  gulp.watch(['./src/scss/*.scss', './src/scss/**/*.scss'], ['sass']);
  gulp.watch('./src/images', ['images']);
  gulp.watch(['./src/js/*.js'], ['scripts']);
  gulp.watch(['./templates/*.html.twig', './templates/**/*.html.twig', '**/*.yml'], ['templates', 'reload']);
  browserSync.reload({stream:true});
});


/**
 * Default task, running just `gulp` will
 * compile Sass files, launch BrowserSync, watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
gulp.task('build', ['sass', 'images','scripts']);
