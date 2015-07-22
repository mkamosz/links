var gulp = require('gulp'),
    less = require('gulp-less'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleanCSSPlugin = new LessPluginCleanCSS({advanced: true}),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefixPlugin = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    jasmine = require('gulp-jasmine'),
    concat = require('gulp-concat');

/*
*    Autoprefix - list
*    https://github.com/ai/browserslist
*/


gulp.task('less', function() {
    gulp.src('./app/assets/less/**/*.less')
        .pipe(less({
            plugins: [autoprefixPlugin, cleanCSSPlugin]
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./app/assets/css/'))
        .pipe(reload({stream:true}));
});

gulp.task('js', function() {
    gulp.src('./app/assets/js/**/*.js')
        .pipe(reload({stream:true}));
        //.pipe(uglify())
        //.pipe(rename({
           // extname: '.min.js'
        //}))
});

// Static Server + watching scss/html files
gulp.task('serve', function() {
    //browserSync.init(["./app/assets/css/**/*.css"],{
    //    server: "./app",
    //    notify: false,
    //    browser: "Chrome"
    //});
});

gulp.task('watch', function() {
    gulp.watch(['./app/assets/less/**/*.less'], ['less']);
    gulp.watch(['./app/assets/js/**/*.js'], ['js']);
    gulp.watch(['./app/common/**/*.html','./app/assets/**/*.html','./app/core/**/*.html']).on("change", browserSync.reload);
});

gulp.task('default', ['less','js','serve','watch']);
