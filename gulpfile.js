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
var rollupResolve = require('rollup-plugin-node-resolve');

var isProd = (argv.prod || false);

function getRollupConfig({ isLegacy = false } = {}) {
    return {
        plugins: [rollupResolve()]
    }
}

function getRollupGenerateConfig({ isLegacy = false } = {}) {
    return {
        format: 'iife'
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
            'Edge >= 15'
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

gulp.task('build', function() {
    return gulp.src('./src/main.js')
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(rollup(getRollupConfig(), getRollupGenerateConfig()))
        .pipe(babel(getBabelConfig()))
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('default', gulp.series('clean', 'build'))
