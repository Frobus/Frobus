var watch = require('gulp-watch');
var build = require('./core-build.js');
var nodemon = require('nodemon');
var moment = require('moment');
const path = require('path');

function log(){
	var args = Array.prototype.slice.call(arguments);
	args.unshift('[' + moment().format('HH:mm:ss') +']')
	console.log.apply(console, args);
}
function _path(_path) {
	return path.normalize( path.join(__dirname, _path) );
}

log('Watching: ', _path('./bin/**/*.[tj]s'));
watch(_path('./bin/**/*.[tj]s'), function(file){
	log('Changed: ', file.path);
	log('Rebuilding...');
	build(function(){
		log('Rebuilded');
	});
})

console.log('[' + moment().format('HH:mm:ss') +']', 'Building...');
build(function(){
	log('Builded');
	log('Script starting...', _path('dist/index.js'));
	nodemon({
		script: _path('./dist/index.js'),
		stdout: true,
		watch: _path("./**/*.*")
	}).on('start', function () {
		log('Script started:', _path('dist/index.js'));
	}).on('crash', function () {
		log('Script crashed', _path('dist/index.js'));
	}).on('restart', function () {
		log('Script restarted', _path('dist/index.js'));
	});
}, true);