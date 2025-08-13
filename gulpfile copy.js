const {src, dest, watch, parallel, series} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const ttfWoff = require('gulp-ttf2woff2');
const includeFile = require('gulp-include');

function images() {
    return src(['app/images/src/**/*.*', 'app/images/src/**/*.svg'])
    .pipe(newer('app/local/templates/mains/assets/images'))
    .pipe(avif({quality: 50}))

    .pipe(src('app/images/src/**/*.*'))
    .pipe(newer('app/local/templates/mains/assets/images'))
    .pipe(webp())
    
    .pipe(src('app/images/src/**/*.*'))
    .pipe(newer('app/local/templates/mains/assets/images'))
    .pipe(imagemin())

    .pipe(dest('app/local/templates/mains/assets/images'));
}

function pages() {
    return src('app/pages/**/*.html')
    .pipe(includeFile({
        includePaths: 'app/components',
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

function fonts() {
    return src('app/fonts/src/*.*')
    .pipe(fonter({
        formats: ['woff', 'ttf']
    }))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttfWoff())
    .pipe(dest('app/fonts'))
}

function sprite() {
    return src('app/images/dist/*.svg')
    .pipe(svgSprite({
        mode:{
            stack: {
                sprite: '../sprite.svg',
                example: true
            }
        }
    }))
    .pipe(dest('app/images/dist/'))
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: [
                "> 1%",
                "ie >= 8",
                "edge >= 15",
                "ie_mob >= 10",
                "ff >= 45",
                "chrome >= 45",
                "safari >= 7",
                "opera >= 23",
                "ios >= 7",
                "android >= 4",
                "bb >= 10"],
            grid: true
        }))
        .pipe(dest('app/local/templates/main/assets/css'))
        .pipe(browserSync.stream())
}

function media() {
    return src('app/scss/media.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('media.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: [
                "> 1%",
                "ie >= 8",
                "edge >= 15",
                "ie_mob >= 10",
                "ff >= 45",
                "chrome >= 45",
                "safari >= 7",
                "opera >= 23",
                "ios >= 7",
                "android >= 4",
                "bb >= 10"],
            grid: true
        }))
        .pipe(dest('app/local/templates/main/assets/css'))
        .pipe(browserSync.stream())
}

function cleanDist() {
    return del('dist')
}

function sripts () {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/swiper/swiper-bundle.min.js',
        'node_modules/gsap/dist/gsap.min.js',
        'node_modules/imask/dist/imask.js',
        'app/js/main.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(dest('app/local/templates/main/assets/js'))
    .pipe(browserSync.stream())
}

function build() {
    return src([
        'app/local/templates/mains/assets/css',
        'app/local/templates/mains/assets/fonts',
        '!app/images/dist/*.svg',
        '!app/images/dist/sprite.svg',
        '!app/images/dist/logo.svg',
        'app/local/templates/mains/assets/images/**/*.*',
        'app/local/templates/mains/assets/js',
        'app/*.html',
    ],{base: 'app'} )
    .pipe(dest('dist'));
}

function watching() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/scss/**/*.scss'], media);
    watch(['app/images/src/'], images);
    watch(['app/components/**/*', 'app/pages/**/*'], pages);
    watch(['app/js/**/*.js', '!app/js/**/main.min.js'], sripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.pages = pages;
exports.styles = styles;
exports.media = media;
exports.watching = watching;
exports.sripts = sripts;
exports.cleanDist = cleanDist;
exports.images = images;
exports.sprite = sprite;
exports.fonts = fonts;

// gulp build
exports.build = series(cleanDist, build);
// gulp
exports.default = parallel(styles,media,images,pages, watching, sripts);