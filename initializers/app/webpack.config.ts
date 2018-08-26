const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const MODE = process.env.RUN_MODE || 'dev';
const DEV = MODE == 'dev';

const ROOT = path.resolve(__dirname, '..', '..');

let preprocessorOptions:any = {
	MODE: MODE,
	DEV: DEV,
	BUILD: MODE == 'build',
}

preprocessorOptions = Object.keys(preprocessorOptions).reduce((result, key) => {
	result.push( key + "=" + preprocessorOptions[key] );
	return result;
}, []).join('&');

const preprocessor = `preprocess-loader?` + preprocessorOptions;

module.exports = {
	target: "electron-main",
	entry: path.resolve(ROOT, 'source', 'app', 'index.ts'),
	mode: DEV ? 'development' : 'production',
	watch: (DEV ? true : false),
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "awesome-typescript-loader",
						options: {
							configFileName: path.resolve(ROOT, 'tsconfig.app.json'),
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
		path: path.resolve(ROOT, 'dist', 'app')
	},
	devtool: DEV ? "source-map" : 'none',
	plugins: [
		new CleanWebpackPlugin([ path.resolve(ROOT, 'dist', 'app') ], {root: path.resolve(ROOT, 'dist')})
	]
};