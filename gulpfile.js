var gulp = require('gulp'),
    less = require('gulp-less'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleanCSSPlugin = new LessPluginCleanCSS({advanced: true}),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefixPlugin = new LessPluginAutoPrefix({browsers: ["last 2 versions"]}),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    imageop = require('gulp-image-optimization'),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    jasmine = require('gulp-jasmine'),
    concat = require('gulp-concat');

/*
*    Autoprefix - list
*    https://github.com/ai/browserslist
*/


gulp.task('less', function() {
    gulp.src('./less/**/*.less')
        .pipe(less({
            plugins: [autoprefixPlugin, cleanCSSPlugin]
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./package/css/'))
        .pipe(gulp.dest('./css/'))
        .pipe(reload({stream:true}));
});

gulp.task('js', function() {
    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('./package/js/'))
        .pipe(reload({stream:true}));

    gulp.src('./js/vendor/*.js')
        .pipe(gulp.dest('./package/js/vendor'));
});

gulp.task('img', function(cb) {
    gulp.src(['./img/**/*.png','./img/**/*.jpg','./img/**/*.gif','./img/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 6,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./package/img/')).on('end', cb).on('error', cb);
});


gulp.task('files', function() {
    gulp.src(['./*.*'])
        .pipe(gulp.dest('./package/'));

    gulp.src(['./css/*.css'])
        .pipe(gulp.dest('./package/css/'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "./",
        notify: false,
        browser: "Chrome"
    });
});

gulp.task('tests', function () {

/*
    gulp.src(['./js/vendor/jquery-1.11.2.min.js','./js/main.js','./tests/spec/tests.js'])
        .pipe(concat('tests.js'))
        .pipe(gulp.dest('./tests/spec/'));
*/

    gulp.src('./tests/spec/tests.js')
        .pipe(jasmine())
});

gulp.task('watch', function() {
    gulp.watch(['./less/**/*.less'], ['less']);
    gulp.watch(['./angular/**/*.css']).on("change", browserSync.reload);
    gulp.watch(['./js/*.js','./angular/**/*.js'], ['js']).on("change", browserSync.reload);
    gulp.watch(['./img/*.png','./img/*.jpg','./img/*.gif','./img/*.jpeg'], ['img']);
    gulp.watch(['*.html','./angular/**/*.html']).on("change", browserSync.reload);
});

gulp.task('default', ['less','js','img','serve','tests','files','watch']);
