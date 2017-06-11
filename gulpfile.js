var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create(),
    exec = require('child_process').exec;

var source = './_js/**/*.js',
    destination = './assets';

gulp.task('js', function() {
    return gulp.src(source)
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('main.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(destination))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', function() {
    exec('jekyll build --watch', function(err, stdout, stderr) {
        console.log(stdout);
    });
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './_site'
        },
        port: 8081,
        notify: true
    });

    gulp.watch(source, ['js']);
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['build', 'serve']);
