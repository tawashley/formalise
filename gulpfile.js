var fs = require('fs');
var path = require('path');

var del = require('del');
var argv = require('yargs').argv;
var babel = require('gulp-babel');

var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify-es').default;
var sourcemaps = require('gulp-sourcemaps');
var rollup = require('gulp-better-rollup');
var rename = require('gulp-rename');
var rollupResolve = require('rollup-plugin-node-resolve');

var isProd = (argv.prod || false);

function getRollupConfig() {
    return {
        plugins: [rollupResolve()]
    }
}

function getBabelBrowsersConfig(isLegacy = false) {
    var browsersList = []

    if(isLegacy === true) {
        browsersList.push(
            '> 1%',
            'last 2 versions',
            'Firefox ESR'
        );
    } else {
        browsersList.push(
            'Chrome >= 60',
            'Safari >= 10.1',
            'iOS >= 10.3',
            'Firefox >= 54',
            'Edge >= 15',
            'IE 10'
        );
    }

    return {
        browsers: browsersList
    };
}

function getBabelConfig({ isLegacy = false } = {}) {
    var options = {
        babelrc: false,
        presets:  [
            ["@babel/env", {
                modules: false,
                targets: getBabelBrowsersConfig(isLegacy)
            }]
        ]
    };

    return options;
}

gulp.task('clean', function () {
    return del(['./dist'], {
        force: true
    });
});

gulp.task('bundle:formalise', function() {
    return gulp.src('./src/formalise.js')
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(rollup(getRollupConfig(), {
            format: 'umd'
        }))
        .pipe(babel(getBabelConfig()))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest('./dist'))
});

gulp.task('bundle:formalise-es2015', function() {
    return gulp.src('./src/formalise.js')
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(rollup(getRollupConfig(), {
            format: 'es'
        }))
        .pipe(babel(getBabelConfig()))
        .pipe(rename('formalise.es2015.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('minfy:formalise', function() {
    return gulp.src('./dist/formalise.js')
        .pipe(rename('formalise.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
});

gulp.task('minify:polyfill', function() {
    return gulp.src('./src/polyfill*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
});

gulp.task('dist:umd', gulp.series('bundle:formalise', 'minfy:formalise'));
gulp.task('dist:es2015', gulp.series('bundle:formalise-es2015'));
gulp.task('dist:polyfill', gulp.series('minify:polyfill'));

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('dist:es2015', 'dist:umd', 'dist:polyfill')
));
