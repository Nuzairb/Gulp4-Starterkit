module.exports = function () {
  plugins.gulp.task("style", function (cb) {
    plugins.gulp.src("src/static/scss/main.scss")
      .pipe(plugins.plumber())
      .pipe(plugins.sass())
      .pipe(plugins.postcss([
        plugins.autoprefixer(['last 15 versions'])
      ]))
      .pipe(plugins.gulp.dest("build/css"))
      .pipe(plugins.rename(function (path) {
        path.basename += ".min";
        path.extname = ".css"
      }))
      .pipe(plugins.minify())
      .pipe(plugins.gulp.dest("build/css"))
      .pipe(plugins.server.reload({
        stream: true
      }));
    cb();
  });
}
