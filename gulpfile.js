var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    mixins = require('postcss-mixins'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    browserSync = require('browser-sync').create();

gulp.task('default', done => {
  console.log("Hooray -  you created a Gulp task.");
  done();
});

gulp.task('html', html); 
function html(done) {
  console.log("Imagine something useful being done to your HMTL here");
  if (done) done();
};

gulp.task('styles', styles);
function styles() {
  console.log("Styles task ran");
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
  
};

gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  gulp.watch('./app/index.html', function(done) {
    console.log("starting html");
    browserSync.reload();
    if (done) done();
  });
  gulp.watch('./app/assets/styles/**/*.pcss', function(done) {
    console.log("starting styles");
    cssInject();
    if (done) done();
  });
});

gulp.task('cssInject', cssInject);
function cssInject() {
  styles();
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
};