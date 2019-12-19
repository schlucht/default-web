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

var tsProject = ts.createProject('./tsconfig.json');


/**
 * MINIFY SASS
 */
function css(done){
    gulp.src(`${src}sass/*.sass`)  
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer()) 
        .pipe(rename({ basename: 'style'}))
        .pipe(cleanCss()) 
        .pipe(rename({ suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${dist}css`))
        .pipe(browserSync.stream());
    done();
};

/** 
 * TSLINT
 *
 */
function tslint(done){
    gulp.src(`${src}ts/**/*.ts`)
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
    done();
}



/**
 * MINIFY JS
 */
function js(done){
    gulp.src(`${src}js/**/*.js`)  
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
        .pipe(gulp.dest(`${dist}js`))
        .pipe(browserSync.stream());
    done();
}
/**
 * Compile TS
 */
function typscript(done){
    gulp.src(`${src}/ts/**/*.ts`) 
        .pipe(plumber())
        .pipe(tsProject())
        .pipe(gulp.dest(`${src}js`) );
    done();
};



/**
 * MINIFY HTML
 */
function html(cb){
    gulp.src(`${dist}*.html`, {force: true})
        .pipe(clean());
    gulp.src(`${src}**/*.html`)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
    cb();
}
/**
 * IMAGE MIN
 */

function jpgs(cb) {
    gulp.src(`${src}assets/img/*`)
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest(`${dist}assets/img`));
    cb();
}

/**
 * WATCH
 */
gulp.task('default', () => {
    browserSync.init({
        server: './dist'
    });    
    gulp.watch(`${src}**/*.html`, gulp.series(html));
    gulp.watch(`${src}sass/**/*.sass`, gulp.series(sass));
    gulp.watch(`${src}ts/**/*.ts`, gulp.series(ts));
    gulp.watch(`${src}js/**/*.js`, gulp.series(js));    
});
gulp.task('tslint', gulp.series(tslint));
gulp.task('builds', gulp.series(css
                            , jpgs  
                            , typscript                          
                            , js
                            , html));
