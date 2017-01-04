# Gulp Angular Config Provider
Generates and adds a new ngConfig module with a ConfigProvider service.

The plugin takes an array of configuration parameters to extract from a `.env` file (or `process.env`) and generates a new module with those parameters. This lets you have environment specific configuration within an AngularJS 1 application, without having to commit in your sensitive configuration properties.

# Usage
    var gulp = require('gulp');
    var config = require('gulp-ng-config');

    gulp.task('js', function (cb) {
      return gulp.src(['app/**/*.module.js', 'app/**/*.js'])
        .pipe(config(['MyVar', 'MyProp']));
    });
