import babelify   from 'babelify';
import browserify from 'browserify';
import buffer    from 'vinyl-buffer';
import del      from 'del';
import gulp      from 'gulp';
import gulpif    from 'gulp-if';
import source    from 'vinyl-source-stream';
import uglify    from 'gulp-uglify';
import util      from 'gulp-util';
import sass      from 'gulp-sass';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';

const reload = browserSync.reload;
const localInstall = process.env.DYNAMIT_WP_INSTALL;

const config = {
  filename: 'main',
  scripts: {
    input: ['./src/js/main.js'],
    out: 'assets/js/',
    watch: ['./src/**/*.js']
  },
  styles: {
    input: ['./src/styles/main.scss'],
    out: 'assets/styles/',
    watch: ['./src/**/*.scss']
  },
  images: {
    input: ['./src/img/*'],
    out: 'assets/img/',
    watch: ['./src/img/*.*']
  },
  isDev : util.env.dev // Config is dev if the dev flag is passed (gulp --dev)
};

/**
 * Deletes the /dist/ folder
 */
gulp.task('clean', () => {
  del(config.scripts.out);
});


/**
 * Builds all of our scripts
 */
gulp.task('scripts', () => {
  // console.log(CONFIG)

  const entries = config.scripts.input;

  entries.map( (entry) => {
    // Browserfy Object
    const bundler = browserify({
      entries: entry,
      debug: config.isDev
    });

    // Transform through Babel
    bundler.transform( 'babelify', {
      presets: ['es2015']
    });

    return bundler.bundle().on('error', (err) => {
      console.error(err);
      this.emit('end');
    })
    // Convert Stream to buffer
    .pipe(source(config.filename + '.js'))
    .pipe(buffer())
    // if not dev, uglify the code
    .pipe(gulpif(!config.isDev, uglify()))
    .pipe(gulp.dest(config.scripts.out))
    .pipe(reload({stream:true}));
  });
});




/**
 * Our Default task gets executed when calling gulp.
 */
gulp.task('default', ['clean'], () => {
  gulp.start('watch');
});

/**
 *  This sets up the server
 *  You'll need to update the `localInstall` constant
 *  at the start of this file to reflect your environment
 */
gulp.task('browser-sync', () => {
  //watch files
  const files = [
    './assets/styles/style.css',
    './*.php'
  ];

  //initialize browsersync
  browserSync.init(files, {
    //browsersync with a php server
    proxy: localInstall,
    notify: false
  });
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', () => {
  return gulp.src('src/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./assets/'))
    .pipe(reload({stream:true}));
});

// Simple copy over images
// TODO: use gulp imagemin
gulp.task('images', () => {
  return gulp.src(config.images.input)
    .pipe(gulp.dest(config.images.out));
})

/**
 * Watches for changes and calls the correct task
 */
gulp.task('watch', ['scripts', 'sass', 'browser-sync', 'images'], () => {
  gulp.watch(config.scripts.watch, ['scripts']);
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch(config.images.watch, ['images']);
});
