/**
 * Created by xubt on 4/30/16.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');


var lib = require('bower-files')({
    overrides: {
        'x-editable': {
            main: './dist/bootstrap3-editable/js/bootstrap-editable.js',
            dependencies: {
                "jquery": ">=1.6"
            }
        }
    }
});

var cleanCSS = require('gulp-clean-css');


// 语法检查
gulp.task('jshint', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(eslint({
            extends: 'eslint:recommended',
            ecmaFeatures: {
                'modules': true
            },
            rules: {
                'my-custom-rule': 1,
                'strict': 2
            },
            globals: {
                'jQuery': false,
                '$': true
            },
            envs: [
                'browser'
            ]
        }))
        .pipe(eslint.formatEach('compact', process.stderr));
});

// 合并压缩第三方类库
gulp.task('minify-bower-components', function () {
    gulp.src(lib.ext('js').files)
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest('app/static/js/'));
});

// 合并CSS
gulp.task('minify-css', function () {
    return gulp.src(['app/styles/**/*.css', 'app/styles/*.css'])
        .pipe(concat('thiki-kanban.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('app/static/css'));
});
// 合并文件之后压缩代码
gulp.task('browserify', function () {
    var bundler = browserify({
        entries: ['app/js/main.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher = watchify(bundler);

    return watcher
        .on('update', function () { // When any files update
            var updateStart = Date.now();
            console.log('Updating!');
            watcher.bundle() // Create new bundle that uses the cache for high performance
                .pipe(source('thiki-kanban.js'))
                // This is where you add uglifying etc.
                .pipe(gulp.dest('app/static/js'));
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
        })
        .bundle() // Create the initial bundle when starting the task
        .pipe(source('thiki-kanban.js'))
        .pipe(gulp.dest('app/static/js'));
});


// 监视文件的变化
gulp.task('watch', function () {
    gulp.watch(['app/js/*.js', 'app/js/**/*.js', 'app/style/*.css', 'gulpfile.js'], ['jshint', 'browserify', 'minify-css']);
});

// 注册缺省任务
gulp.task('default', ['minify-bower-components', 'jshint', 'browserify', 'minify-css', 'watch']);
