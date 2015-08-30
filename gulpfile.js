var gulp = require('gulp'),
    scss = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    prefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    jsuglify = require('gulp-uglify'),
    cssuglify = require('gulp-uglifycss'),
    htmluglify = require('gulp-minify-html');

gulp.task('default', ['imagemin', 'scss', 'prefixer', 'watch']);

// Gulp watcher.
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('js/*.js',function(){
        livereload();
    });
    gulp.watch('html/*.html',['html']);
    gulp.watch('scss_styles/*.scss', ['scss']);
    gulp.watch('css/styles/*.css', ['prefixer']);
});


// HTML Tasl live reload.
gulp.task('html',function(){
    return gulp.src('html/*.html').pipe(livereload());
});

// SCSS Task compiler.
gulp.task('scss', function () {
    return scss('scss_styles/', {
        sourcemap: true,
        cacheLocation: 'scss_styles/sass_cache',
        force: true
    })
        .pipe(sourcemaps.write('/', {
            includeContent: false,
            sourceRoot: 'scss_styles/'
        }))
        .pipe(gulp.dest('css/styles'));
});

// Autoprefixer task.
gulp.task('prefixer', function () {
    return gulp.src('css/styles/*.css')
        .pipe(prefixer({
            cascade: true,
            remove: true
        }))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

// ImageMin task.
gulp.task('imagemin', function () {
    return gulp.src('content/img/*')
        .pipe(imagemin({
            progressive: true,
            multypass: true,
            svgoPlugins: [
                {removeViewBox: false},
                {removeUselessStrokeAndFill: false},
                {removeEmptyAttrs: false}
            ],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('content/img/'));
});

// Minify all.
gulp.task('minify', ['jsuglify', 'cssuglify', 'htmluglify']);

// JSUglify task.
gulp.task('jsuglify', function () {
    return gulp.src('js/*.js')
        .pipe(jsuglify({
            output: { quote_keys: true },
            compress: {hoist_vars: true}
        }))
        .pipe(gulp.dest('minify'));
});

// CSSUglify task.
gulp.task('cssuglify', function () {
    gulp.src('css/all.css')
        .pipe(cssuglify({
            maxLineLen: 32000,
            expandVars: false,
            uglyComments: true
        }))
        .pipe(gulp.dest('minify'));
});

// HTMLUglify task.
 gulp.task('htmluglify', function () {
     var opts = {
         conditionals: true,
         spare:true,
         empty: true,
         cdata: true
     };
     return gulp.src('html/*.html')
         .pipe(htmluglify(opts))
         .pipe(gulp.dest('minify'));
 });
