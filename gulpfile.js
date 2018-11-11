'use strict';

global.plugins = {
    gulp: require('gulp'),
    plumber: require('gulp-plumber'),
    sass: require('gulp-plumber'),
    postcss: require('gulp-postcss'),
    autoprefixer: require('autoprefixer'),
    rename: require('gulp-rename'),
    minify: require('gulp-csso'),
    concat: require('gulp-concat'),
    uglify: require("gulp-uglifyjs"),
    imagemin: require("gulp-imagemin"),
    webp: require("gulp-webp"),
    del: require("del"),
    server: require('browser-sync').create(),

    path: {
        tasks: require('./gulp/config/tasks.js')
    }
};

let modulesArray = plugins.path.tasks;

modulesArray.forEach(function(taskPath) {
    require(taskPath)();
});

plugins.gulp.task("default", plugins.gulp.series(
    plugins.gulp.parallel('style', 'scripts', 'images:dev'),
    plugins.gulp.parallel('watch', 'serve')
));

plugins.gulp.task("build", plugins.gulp.series(
    plugins.gulp.parallel('delete'),
    plugins.gulp.parallel('style', 'scripts'),
    plugins.gulp.parallel('images:build', 'webp'),
    plugins.gulp.parallel('watch', 'serve')
));