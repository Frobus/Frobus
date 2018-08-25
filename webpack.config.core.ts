const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const MODE = process.env.RUN_MODE || 'dev';

let preprocessorOptions:any = {
	MODE: MODE,
	DEV: MODE == 'dev',
	BUILD: MODE == 'build',
}

preprocessorOptions = Object.keys(preprocessorOptions).reduce((result, key) => {
	result.push( key + "=" + preprocessorOptions[key] );
	return result;
}, []).join('&');

const preprocessor = `preprocess-loader?` + preprocessorOptions;

module.exports = {
	target: "electron-main",
	entry: path.resolve(__dirname, 'source', 'core', 'index.ts'),
	mode: MODE == 'dev' ? 'development' : 'production',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "awesome-typescript-loader",
						options: {
							configFileName: path.resolve(__dirname, 'tsconfig.core.json'),
						}
					},
					preprocessor
				],
				exclude: /(node_modules|bower_components)/,
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js', '.json' ]
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist', 'core')
	},
	devtool: MODE == 'dev' ? "source-map" : 'none',
	plugins: [
		new CleanWebpackPlugin([ path.resolve(__dirname, 'dist', 'core') ], {root: path.resolve(__dirname, 'dist')})
	]
};