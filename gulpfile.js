var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    cleanCss        = require('gulp-clean-css'),
    autoprefixer    = require('gulp-autoprefixer'),
    rename          = require('gulp-rename'),
    inject          = require('gulp-inject'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    plumber         = require('gulp-plumber'),
    babel           = require('gulp-babel'),
    browserify      = require('gulp-browserify'),
    clean           = require('gulp-clean'),
    sourcemaps      = require('gulp-sourcemaps'),
    htmlmin         = require('gulp-html-minifier'),
    browserSync     = require('browser-sync'),
    ts              = require('gulp-typescript'),
    tslint          = require('gulp-tslint'),
    imagemin        = require('gulp-imagemin');

var src             = './src/',
    dist            = './dist/';


/**
 * MINIFY SASS
 */
gulp.task('sass', (done) => {
    gulp.src(`${src}assets/sass/*.sass`)  
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer()) 
        .pipe(rename({ basename: 'style'}))
        .pipe(cleanCss()) 
        .pipe(rename({ suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${dist}assets/css`))
        .pipe(browserSync.stream());
    done();
});

/** 
 * TSLINT
 *
 */
gulp.task('tslint', (done) => {
    gulp.src(`${src}assets/ts/*.ts`)
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
    done();
});
/**
 * Compile TS
 */
gulp.task('ts',  (done) => {
    gulp.src(`${src}assets/ts/**/*.ts`) 
        .pipe(plumber())
        .pipe(ts(
            'tsconfig.json'
        ))
        .pipe(gulp.dest(`${src}assets/js`) );
    done();
});

/**
 * MINIFY JS
 */
gulp.task('js', (done) => {
    gulp.src(`${src}assets/js/*.js`)  
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(concat('global.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(uglify())        
        .pipe(rename({ suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${dist}assets/js`))
        .pipe(browserSync.stream());
    done();
});

/**
 * MINIFY HTML
 */
gulp.task('html', (done) => {
    gulp.src(`${dist}*.html`, {force: true})
        .pipe(clean());
    gulp.src(`${src}*.html`)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
    done();
});
/**
 * IMAGE MIN
 */

gulp.task('jpgs', function() {
    return gulp.src(`${src}img/*`)
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest(`${dist}img`));
});



/**
 * WATCH
 */
gulp.task('default', () => {
    browserSync.init({
        server: './dist'
    });

    gulp.watch(`${src}*.html`, gulp.series('html'));
    gulp.watch(`${src}assets/sass/**/*.sass`, gulp.series('sass'));
    gulp.watch(`${src}assets/ts/**/*.ts`, gulp.series('ts'));
    gulp.watch(`${src}assets/js/**/*.js`, gulp.series('js'));    
});
