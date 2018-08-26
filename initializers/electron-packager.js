'use strict';

const packager = require('electron-packager');

const options = {
	dir: __dirname,
	// appId: "com.electron.frobus",
	// productName: "Frobus",

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
		"release"
	]
};


packager(options).then(appPaths => {console.log('appPaths:', appPaths)}).catch(error => console.error(error))