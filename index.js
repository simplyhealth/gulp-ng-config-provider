/*
 * Copyright 2017 SIMPLYHEALTH GROUP LIMITED
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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
