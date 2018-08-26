'use strict';

const packager = require('electron-packager');
const path = require('path');

const ROOT = _path(__dirname, '..');

function _path(...args) { return path.normalize(path.join(...args)); }

const options = {
	dir: ROOT,
	appCopyright: "Copyright © 2018 Vovencia",
	out: "release",
	overwrite: true,
	icon: _path(ROOT, "source", "icons", "icon.ico"),
	executableName: "frobus",
	ignore: [
		"webpack.config",
		"tsconfig",
		"package-lock.json",
		".gitignore",
		"source",
		"electron-packager.js",
		"release",
		"env_vars.ts",
		"initializers",
		"frobus.exe.lnk"
	],
	win32metadata: {
		OriginalFilename: "frobus",
		icon: _path(ROOT, "source", "icons", "icon.ico")
	}
};


packager(options).then(appPaths => {console.log('appPaths:', appPaths)}).catch(error => console.error(error))