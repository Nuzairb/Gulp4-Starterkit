var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var minify = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require("gulp-uglifyjs");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var del = require("del");
var server = require('browser-sync').create();

// path: {
//     tasks: require('./gulp/config/tasks.js')
// }

// let modulesArray = path.tasks;

// modulesArray.forEach(function(taskPath) {
//     require(taskPath)();
// });

gulp.task("delete", function() {
    return del("build");
});

gulp.task("html", function() {
    return gulp.src("src/html/*.html")
        .pipe(gulp.dest("build"))
        .pipe(server.reload({
            stream: true
        }));
});

gulp.task("images:build", function() {
    return gulp.src("src/static/img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({
                optimizationLevel: 3
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
    return gulp.src("src/static/img/**/*.{png,jpg}")
        .pipe(webp({
            quality: 90
        }))
        .pipe(gulp.dest("build/img"));
});

gulp.task("images:dev", function() {
    return gulp.src("src/static/img/**/*.{png,jpg,svg}")
        .pipe(gulp.dest("build/img"));
});

gulp.task("scripts", function() {
    return gulp.src([
            "src/static/js/libs/**/*.js",
            "src/static/js/*.js"
        ])
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
        .pipe(server.reload({
            stream: true
        }));
});

gulp.task("serve", function() {
    server.init({
        server: "build/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });
});

gulp.task("style", function(cb) {
    gulp.src("src/static/scss/main.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer(['last 15 versions'])
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".css"
        }))
        .pipe(minify())
        .pipe(gulp.dest("build/css"))
        .pipe(server.reload({
            stream: true
        }));
    cb();
});

gulp.task("watch", function() {
    gulp.watch("src/html/*.html", gulp.series('html'));
    gulp.watch("src/static/scss/main.scss", gulp.series('style'));
    gulp.watch("src/static/js/main.js", gulp.series('scripts'));
    gulp.watch("src/static/img/**/*", gulp.series('images:dev'));
});

gulp.task("default", gulp.series(
    gulp.parallel('style', 'scripts', 'images:dev'),
    gulp.parallel('watch', 'serve')
));

gulp.task("build", gulp.series(
    gulp.parallel('delete'),
    gulp.parallel('style', 'scripts'),
    gulp.parallel('images:build', 'webp'),
    gulp.parallel('watch', 'serve')
));