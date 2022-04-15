const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const connect = require('gulp-connect');

gulp.task('watch', function (cb) {
	return gulp.src('src/*.js', { sourcemaps: true })
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('dist/', { sourcemaps: '.' }))
		.pipe(connect.reload());
	cb();
})

function defaultTask(cb) {
	connect.server({
		port: 4200,
		root: '',
		livereload: true
	});
	return gulp.watch('src/*.js', gulp.series('watch'));
}

exports.default = defaultTask;