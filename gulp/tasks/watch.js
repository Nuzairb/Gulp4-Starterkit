module.exports = function () {
  plugins.gulp.task("watch", function () {
    plugins.gulp.watch("src/html/*.html", plugins.gulp.series('html'));
    plugins.gulp.watch("src/static/scss/main.scss", plugins.gulp.series('style'));
    plugins.gulp.watch("src/static/js/main.js", plugins.gulp.series('scripts'));
    plugins.gulp.watch("src/static/img/**/*", plugins.gulp.series('images:dev'));
  });
};
