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

	this.prompt([{
		type: 'confirm',
		name: 'defaultOptions',
		message: 'Would you the default one?',
		default: true
	}], function (props) {
		this.defaultOptions	= props.defaultOptions
		this.withRequirejs	= true
		this.withDetectorjs	= true
		this.withWindowResize	= true

		if( this.defaultOptions === true ){
			cb();
			return;
		}

		this.prompt([{
			type	: 'confirm',
			name	: 'withRequirejs',
			message	: 'Would you like to add require.js?',
			default	: true
		}, {
			type	: 'confirm',
			name	: 'withDetectorjs',
			message	: 'Would you like to support webgl detection?',
			default	: true
		}, {
			type	: 'confirm',
			name	: 'withWindowResize',
			message	: 'Would you like to support window resize?',
			default	: true			
		}, ], function (props) {
			this.withRequirejs	= props.withRequirejs;
			this.withWindowResize	= props.withWindowResize;
			this.withDetectorjs	= props.withDetectorjs;
			cb();
		}.bind(this));
	}.bind(this));
};

ThreejsGenerator.prototype.app = function app() {

	this.copy('Makefile', 'Makefile');
	this.copy('index.html', 'index.html');   
	this.copy('vendor/three.js/build/three.js', 'vendor/three.js/build/three.js');

	if( this.withWindowResize ){
		this.copy( 'vendor/threex.windowresize.js', 'vendor/threex.windowresize.js');
	}
	if( this.withDetectorjs ){
		this.copy('vendor/three.js/examples/js/Detector.js', 'vendor/three.js/examples/js/Detector.js');
	}
	if( this.withRequirejs ){
		this.copy('vendor/require.js/require.js', 'vendor/require.js/require.js');
	}
};

ThreejsGenerator.prototype.projectfiles = function projectfiles() {
  // this.copy('editorconfig', '.editorconfig');
  // this.copy('jshintrc', '.jshintrc');
};
