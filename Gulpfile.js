var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    stripDebug  = require('gulp-strip-debug'),
    minifyCSS   = require('gulp-minify-css'),
    stylus      = require('gulp-stylus'),
    nib         = require('nib'),
    concat      = require('gulp-concat');


gulp.task('js', function () {
  gulp.src([
      './assets/js/vendor/jquery-1.11.2.min.js',
      './assets/js/vendor/jquery.validate.min.js',
      './assets/js/vendor/jquery.inview.min.js',
      './assets/js/vendor/jquery.colorbox-min.js',
      './assets/js/vendor/jPages.min.js',
      './assets/js/vendor/jquery.cycle2.min.js',
      './assets/js/vendor/handlebars-v1.3.0.js',
      './assets/js/vendor/jquery.timeago.js',
      './assets/js/vendor/jquery.hoverIntent.minified.js',
      './assets/js/vendor/stickyfloat.min.js',

      './assets/js/main.js'

    ])
    //.pipe(browserify())
    .pipe(uglify({ compress: true }))
    .pipe(stripDebug())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./js'));

});

// Get and render all .styl files recursively
gulp.task('stylus', function () {
  gulp.src('./assets/stylus/main.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('css', function () {
  gulp.src(['./assets/css/colorbox.css','./assets/css/main.css'])
    .pipe(minifyCSS({ keepSpecialComments: '*', keepBreaks: '*'}))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./css'));
});




gulp.task('watch', function () {
    gulp.watch(['./assets/js/**/*.js'],['js']);
    gulp.watch(['./assets/stylus/**/*.styl'],['stylus']);
    gulp.watch(['./assets/css/**/*.css'],['css']);

});

gulp.task('default', [ 'js','stylus','css', 'watch' ]);
