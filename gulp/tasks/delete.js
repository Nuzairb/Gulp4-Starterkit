module.exports = function () {
  plugins.gulp.task("delete", function() {
    return plugins.del("build");
  });
};
