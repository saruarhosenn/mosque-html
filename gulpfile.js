const { src, dest, watch, series, parallel } = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// HTML Task - সরাসরি components থেকে সংগ্রহ করবে
function html() {
    return src('./pages/**/*.html') // pages ফোল্ডারের সকল HTML ফাইল সংগ্রহ করবে
        .pipe(
            fileInclude({
                prefix: '@@',
                basepath: '@root', // components folder will be used as basepath
            })
        )
        .pipe(dest('./')) // সরাসরি root এ পিপলাইন করবে
        .pipe(browserSync.stream());
}

// Sass to CSS Task - CSS ফাইল সরাসরি assets/css তে রাখা হবে
function styles() {
    return src('./assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./assets/css'))
        .pipe(browserSync.stream());
}

// Browser Refresh for specific files only
function browserRefresh(done) {
    browserSync.reload();
    done();
}

// Watch Task - নির্দিষ্ট ফোল্ডারগুলোর জন্য কাজ ও রিফ্রেশ
function watchFiles() {
    browserSync.init({
        server: {
            baseDir: './', // সরাসরি project root সার্ভ করবে
        },
    });

    // HTML এবং Sass প্রসেসিং
    watch('./pages/**/*.html', html);
    watch('./components/**/*.html', html);
    watch('./assets/sass/**/*.scss', styles);

    // JS এবং Images ফোল্ডারের জন্য শুধুমাত্র রিফ্রেশ
    watch('./assets/js/**/*.js', browserRefresh);
    watch('./assets/vendors/**/*', browserRefresh);
    watch('./assets/images/**/*', browserRefresh);
}

// Default Task
exports.default = series(parallel(html, styles), watchFiles);
