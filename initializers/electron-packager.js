'use strict';

const packager = require('electron-packager');
function _path(...args) { return path.normalize(path.join(...args)); }

const options = {
	dir: _path(__dirname, '..'),
	appCopyright: "Copyright © 2018 Vovencia",
	out: "release",
	overwrite: true,
	ignore: [
		"webpack.config",
		"tsconfig",
		"package-lock.json",
		".gitignore",
		"source",
		"electron-packager.js",
		"release",
		"env_vars.ts"
	]
};


packager(options).then(appPaths => {console.log('appPaths:', appPaths)}).catch(error => console.error(error))