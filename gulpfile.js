/* eslint-disable @typescript-eslint/no-var-requires */
const del = require('del');
const babel = require('gulp-babel');
const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('gulp-better-rollup');
const rename = require('gulp-rename');
const rollupResolve = require('rollup-plugin-node-resolve');
const typescriptRollup = require('rollup-plugin-typescript2');
const typescript = require('typescript');

function getRollupConfig() {
    return {
        plugins: [
            typescriptRollup({
                typescript,
                tsconfig: './tsconfig.json',
                useTsconfigDeclarationDir: true
            }),
            rollupResolve()
        ]
    };
}

function getBabelBrowsersConfig(isLegacy = false) {
    const browsersList = [];

    if (isLegacy === true) {
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
    const options = {
        babelrc: false,
        presets: [
            ['@babel/env', {
                modules: false,
                targets: getBabelBrowsersConfig(isLegacy)
            }],
            '@babel/typescript'
        ]
    };

    return options;
}

gulp.task('clean', () => {
    return del(['./dist'], {
        force: true
    });
});

gulp.task('dist:es2015', () => {
    return gulp.src('./src/formalise.ts')
        .pipe(rollup(getRollupConfig(), {
            format: 'es'
        }))
        .pipe(babel(getBabelConfig()))
        .pipe(rename('formalise.es2015.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('dist:umd', () => {
    return gulp.src('./src/formalise.ts')
        .pipe(sourcemaps.init())
        .pipe(rollup(getRollupConfig(), {
            format: 'umd'
        }))
        .pipe(babel(getBabelConfig()))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('formalise.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('./dist'));
});

gulp.task('dist:polyfill', () => {
    return gulp.src('./src/polyfill*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('dist:es2015', 'dist:umd', 'dist:polyfill')
));
