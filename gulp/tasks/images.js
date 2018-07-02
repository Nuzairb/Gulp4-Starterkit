module.exports = function () {
  plugins.gulp.task("images:build", function() {
    return plugins.gulp.src("src/static/img/**/*.{png,jpg,svg}")
      .pipe(plugins.imagemin([
        plugins.imagemin.optipng({optimizationLevel: 3}),
        plugins.imagemin.jpegtran({progressive: true}),
        plugins.imagemin.svgo()
      ]))
      .pipe(plugins.gulp.dest("build/img"));
  });

  plugins.gulp.task("webp", function() {
    return plugins.gulp.src("src/static/img/**/*.{png,jpg}")
      .pipe(plugins.webp({quality: 90}))
      .pipe(plugins.gulp.dest("build/img"));
  });

  plugins.gulp.task("images:dev", function() {
    return plugins.gulp.src("src/static/img/**/*.{png,jpg,svg}")
      .pipe(plugins.gulp.dest("build/img"));
  });
};
