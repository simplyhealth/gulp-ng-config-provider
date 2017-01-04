require('dotenv').config({silent: true});

var fs = require('fs');
var through = require('through2');
var gutil = require('gulp-util');
var _ = require('lodash');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-ng-config';

module.exports = function(options) {

  var configuration = {},
      templateFile,
      templateOutput,
      stream;

  // Store the configuration parameters
  for (var i = 0; i < options.length; i++) {
    configuration[options[i]] = process.env[options[i]];
  }

  // Create the template file
  templateFile = fs.readFileSync(__dirname + '/template.html', 'utf8');
  templateOutput = _.template(templateFile)({configuration : JSON.stringify(configuration)});

  // Get the object stream
  stream = through.obj();

  // Push our new config file in
  stream.push(new gutil.File({
    path : 'ngConfig.js',
    contents : new Buffer(templateOutput, 'utf-8')
  }));

  return stream;
}
