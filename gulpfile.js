var gulp = require('gulp'),
	rigger = require('gulp-rigger'),
	rimraf = require('rimraf'),
	browserSync   = require('browser-sync'),
	sass = require("gulp-sass"),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify');

var htmlSources = ['app/*.html'],
	cssSources = ['app/css/**/*.css'],
	jsSources = ['app/js/**/*.js'],
	jsonSources = ['app/js/*.json'],
	allSources = htmlSources.concat(cssSources).concat(jsSources).concat(jsonSources);

var path = {
	dist: {
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/images/',
		fonts: 'dist/fonts/'
	},
	src: {
		html: 'app/*.html',
		js: 'app/js/**/*.*',
		jsWithoutCnM: ['app/js/**/*.*', '!app/js/components/*.*', '!app/js/modules/*.*'],
		css: 'app/css/**/*.*',
		sass: 'app/scss/**/*.scss',
		img: 'app/images/**/*.*',
		fonts: 'app/fonts/**/*.*'
	},
	watch: {
		html: 'app/**/*.html',
		js: 'app/js/**/*.js',
		css: 'app/css/**/*.*',
		sass: 'app/scss/**/*.scss',
		img: 'app/images/**/*.*',
		fonts: 'app/fonts/**/*.*'
	},
	clean: './dist'
};

// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('html:build', function() {
	return gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.dist.html))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('move:f', function() {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.dist.fonts));
});

gulp.task('move:js', function() {
	return gulp.src(path.src.jsWithoutCnM)
		.pipe(gulp.dest(path.dist.js));
});

gulp.task('sass', function() {
	return gulp.src(path.src.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())
});

gulp.task('move:css', function() {
	return gulp.src(path.src.css)
		.pipe(gulp.dest(path.dist.css));
});

gulp.task('move:img', function() {
	return gulp.src(path.src.img)
		.pipe(gulp.dest(path.dist.img));
});

gulp.task('clean', function(cb) {
	rimraf(path.clean, cb);
});

gulp.task('babel:components', function() {
	return gulp.src('app/js/components/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/components'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('babel:modules', function() {
	return gulp.src('app/js/modules/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/modules'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('move:other', gulp.parallel('move:f', 'move:css', 'move:img', 'move:js', 'babel:components', 'babel:modules'));

gulp.task('build', gulp.parallel('html:build','move:other'));

gulp.task('watch', function() {
	gulp.watch(path.watch.html, gulp.parallel('html:build'));
	gulp.watch(path.watch.sass, gulp.parallel('sass'));
	gulp.watch(path.watch.css, gulp.parallel('move:css'));
	gulp.watch(path.watch.js, gulp.parallel('move:js', 'babel:components', 'babel:modules'));
	gulp.watch(path.watch.img, gulp.parallel('move:img'));
	gulp.watch(path.watch.fonts, gulp.parallel('move:f'));
});
// Default task to be run with `gulp`
gulp.task('default', gulp.parallel('sass', 'build', 'browser-sync', 'watch'));