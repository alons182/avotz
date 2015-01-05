var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    changed     = require('gulp-changed')
    imagemin    = require('gulp-imagemin'),
    stripDebug  = require('gulp-strip-debug'),
    minifyCSS   = require('gulp-minify-css'),
    minifyHTML  = require('gulp-minify-html'),
    browserify  = require('gulp-browserify'),
    rjs         = require('gulp-requirejs');


/*gulp.task('js', function () {
  gulp.src('./js/main.js')
    //.pipe(browserify())
    .pipe(uglify({ compress: true }))
    .pipe(stripDebug())
    .pipe(gulp.dest('./public/js'));

   gulp.src('./js/vendor/require.js')
    .pipe(uglify({ compress: true }))
    .pipe(gulp.dest('./public/js/vendor'));
    
});*/
gulp.task('requirejsBuild', function() {
    rjs({
        baseUrl: './js',
        out: 'main.min.js',
        name: 'main',
         paths: {
            jquery: 'vendor/jquery-1.11.0.min',
            validate:'vendor/jquery.validate.min',
            inview:'vendor/jquery.inview.min',
            colorbox : 'vendor/jquery.colorbox-min',
            jpages: 'vendor/jPages.min',
            cycle2: 'vendor/jquery.cycle2.min',
            handlebars:'vendor/handlebars-v1.3.0',
            timeago:'vendor/jquery.timeago',
            hoverintent:'vendor/jquery.hoverIntent.minified'
          
     
        },
        shim: {
        
        'validate':
        {
            deps: ['jquery'],
            exports: 'validate'
        },
        'inview':
        {
            deps: ['jquery'],
            exports: 'inview'
        },
        'colorbox': {
            deps: ['jquery'],
            exports: 'colorbox'
        },
        'jpages': {
            deps: ['jquery'],
            exports: 'jPages'
        },
        'cycle2': {
            deps: ['jquery'],
            exports: 'cycle2'
        },
        'handlebars': {
            deps: ['jquery'],
            exports: 'Handlebars'
        },
         'timeago': {
            deps: ['jquery'],
            exports: 'timeago'
        },
        'hoverintent': {
            deps: ['jquery'],
            exports: 'hoverintent'
        }
       
         

        
    },
    removeCombined: true,
    findNestedDependencies: true
        // ... more require.js options
    })
     .pipe(uglify({ compress: true }))    
    //.pipe(gulp.dest('./public/js')); // pipe it to the output DIR
    .pipe(stripDebug())
    .pipe(gulp.dest('./js')); // pipe it to the output DIR

    gulp.src('./js/vendor/require.js')
    .pipe(uglify({ compress: true }))
    .pipe(gulp.dest('./public/js/vendor'));
});

gulp.task('css', function () {
  gulp.src('./css/**/*.css')
    .pipe(minifyCSS({ keepSpecialComments: '*', keepBreaks: '*'}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('images', function () {
  var imgSrc = './img/**/*',
      imgDst = './public/img';

  gulp.src('./img/**/*')
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

gulp.task('html', function () {
  var htmlSrc = './*.html',
      htmlDst = './public';

  gulp.src(htmlSrc)
  .pipe(minifyHTML())
  .pipe(gulp.dest(htmlDst));
});

gulp.task('fonts', function () {
  gulp.src('./fonts/**')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('data', function () {
   gulp.src('./data/works.json')
    .pipe(gulp.dest('./public/data'));
});
gulp.task('watch', function () {
   gulp.watch('./js/main.js',['requirejsBuild'])
   
});

gulp.task('default', [ 'requirejsBuild', 'css', 'images', 'html', 'fonts', 'data','watch' ]);
