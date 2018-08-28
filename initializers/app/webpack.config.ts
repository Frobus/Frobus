const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

import {ENV, MODE, BUILD, DEV, PROD, WATCH, preprocessorOptions} from "../env_vars";
import {source, dist, client, root} from "../webpack.config/_utils";
import resolve 						from "../webpack.config/resolve";

const preprocessor = `preprocess-loader?` + preprocessorOptions;

module.exports = {
	target: "electron-main",
	entry: source('app', 'index.ts'),
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
							configFileName: root('initializers', 'tsconfig.json'),
						}
					},
					preprocessor
				],
				exclude: /(node_modules|bower_components)/,
			}
		]
	},
	resolve: resolve,
	output: {
		filename: 'index.js',
		path: dist('app')
	},
	devtool: DEV ? "source-map" : 'none',
	plugins: [
		new CleanWebpackPlugin([ dist('app') ], {root: dist()})
	]
};