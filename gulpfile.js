const gulp = require('gulp')
const sass = require('gulp-sass')
 
const paths = {
	src: {
		sass: 'src/sass/**/*.scss'
	},
	dist: {
		css: 'src/assets/css'
	}
}

gulp.task('sass', () => {
  return gulp.src(paths.src.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist.css));
})
 
gulp.task('sass:watch', () => {
  gulp.watch(paths.src.sass, ['sass']);
})