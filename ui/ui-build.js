const webpack = require('webpack');
const config = require('./webpack.config.js');

webpack(config, function(err, stats) {
	if (err) {
		console.error(err);
		return;
	}

	console.log(stats.toString({
		chunks: false, // Makes the build much quieter
		colors: true // Shows colors in the console
	}));
});