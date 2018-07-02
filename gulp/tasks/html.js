module.exports = function () {
  plugins.gulp.task("html", function() {
    return plugins.gulp.src("src/html/*.html")
    .pipe(plugins.gulp.dest("build"))
    .pipe(plugins.server.reload({
      stream: true
    }));
  });
};
