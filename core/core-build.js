const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsConfig = require('./tsconfig.json').compilerOptions;
const cache = require('gulp-cached');
const fs = require('fs');
const path = require('path');

function _path(_path) {
	return path.normalize( path.join(__dirname, _path) );
}

var deleteFolderRecursive = function(path) {
	var files = [];
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};

function build(cb, clearDirectory) {
	if( clearDirectory ) deleteFolderRecursive(_path('./dist/'));
	gulp.src(_path('./bin/**/*.[tj]s'))
		.pipe(cache())
		.pipe(ts(tsConfig))
		.pipe(gulp.dest(_path('./dist/')))
		.on('end', function(){
			if(typeof cb == 'function') cb();
		})
}

if (require.main === module) {
	build(null, true);
} else {
	module.exports = build;
}