module.exports = function () {
  plugins.gulp.task("serve", function() {
    plugins.server.init({
      server: "build/",
      notify: false,
      open: true,
      cors: true,
      ui: false
    });
  });
}

