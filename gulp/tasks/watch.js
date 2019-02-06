var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

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


gulp.task('cssInject', gulp.series('styles', cssInject));

function cssInject() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
};