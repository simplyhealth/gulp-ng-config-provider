# Gulp Angular Config Provider
Generates and adds a new ngConfig module with a ConfigProvider service to your AngularJS 1 Gulp build.

The plugin takes an array of configuration parameters to extract from an `.env` file (or `process.env`) and generates a new module with those parameters. This lets you have environment specific configuration within an AngularJS 1 application, without having to commit in your sensitive configuration properties.

# Usage (Gulp)
    var gulp = require('gulp');
    var config = require('gulp-ng-config');
    var concat = require('gulp-concat');

    gulp.task('js', function (cb) {
      return gulp.src(['app/**/*.module.js', 'app/**/*.js'])
        .pipe(config(['MyVar', 'MyProp']))
        .pipe('app.js');
    });


# Usage (AngularJS)
    var app = angular.module('app', ['ngConfig']);

    app.config(['configProvider', function(configProvider) {
      console.log(configProvider.getConfig); // Outputs configuration object
    }]);
