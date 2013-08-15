'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ThreejsGenerator = module.exports = function ThreejsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // this.on('end', function () {
  //   this.installDependencies({ skipInstall: options['skip-install'] });
  // });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ThreejsGenerator, yeoman.generators.Base);

ThreejsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'withRequirejs',
    message: 'Would you like to add require.js?',
    default: false
  }];

  this.prompt(prompts, function (props) {
    this.withRequirejs = props.withRequirejs;

    cb();
  }.bind(this));
};

ThreejsGenerator.prototype.app = function app() {

  this.copy('Makefile', 'Makefile');

  this.mkdir('vendor');

  this.mkdir('vendor/three.js');
  this.mkdir('vendor/three.js/build');
  this.copy('vendor/three.js/build/three.js', 'vendor/three.js/build/three.js');

  if( this.withRequirejs ){
    this.mkdir('vendor/require.js');
    this.copy('vendor/require.js/require.js', 'vendor/require.js/require.js');
    this.copy('index-requirejs.html', 'index.html');
  }else{
    this.copy('index-raw.html', 'index.html');   
  }
};

ThreejsGenerator.prototype.projectfiles = function projectfiles() {
  // this.copy('editorconfig', '.editorconfig');
  // this.copy('jshintrc', '.jshintrc');
};
