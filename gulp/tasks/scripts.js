module.exports = function () {
  plugins.gulp.task("scripts", function() {
    return plugins.gulp.src([
      "src/static/js/libs/**/*.js",
      "src/static/js/*.js"
    ])
    .pipe(plugins.concat("main.min.js"))
    .pipe(plugins.uglify())
    .pipe(plugins.gulp.dest("build/js"))
    .pipe(plugins.server.reload({
      stream: true
    }));
  });
};
