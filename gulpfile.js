const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const livereload = require('gulp-livereload');

gulp.task('watch', function (cb) {
	return gulp.src('src/*.js', { sourcemaps: true })
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('dist/', { sourcemaps: '.' }))
		.pipe(livereload());
	cb();
})

function defaultTask(cb) {
	livereload.listen({
		port: 4201,
		basePath: 'demo'
	});
	return gulp.watch('src/*.js', gulp.series('watch'));
}

exports.default = defaultTask;