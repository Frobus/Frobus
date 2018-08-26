const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

import {ENV, MODE, BUILD, DEV, PROD, WATCH, preprocessorOptions} from "../env_vars";

function _path(...args) { return path.normalize(path.join(...args)); }

const ROOT = _path(__dirname, '..', '..');

const preprocessor = `preprocess-loader?` + preprocessorOptions;

module.exports = {
	target: "electron-main",
	entry: _path(ROOT, 'source', 'app', 'index.ts'),
	mode: PROD ? 'production' : 'development',
	watch: WATCH,
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "awesome-typescript-loader",
						options: {
							configFileName: _path(ROOT, 'initializers', 'tsconfig.json'),
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
		path: _path(ROOT, 'dist', 'app')
	},
	devtool: DEV ? "source-map" : 'none',
	plugins: [
		new CleanWebpackPlugin([ _path(ROOT, 'dist', 'app') ], {root: _path(ROOT, 'dist')})
	]
};