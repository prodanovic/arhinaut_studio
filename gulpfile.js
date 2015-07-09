var gulp = require('gulp');

gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('scripts',function() {
    gulp.watch('src/**/*.js', ['test', 'compile']);
    gulp.src('script/*.js')
        .pipe(gulp.dest('dist'));
});