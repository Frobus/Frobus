import {root, source, dist, client} from "./_utils";
import {snapSvgPath} from "./_config";

import module from "./module";
import _plugins from "./plugins";
import optimization from "./optimization";

const plugins = [].concat(_plugins);

const config = {
	target: "electron-renderer",
	mode: 'development',
	entry: {
		'scripts/content': source("client/scripts/content.tsx"),
		'scripts/browser': source("client/scripts/browser.tsx"),
	},
	output: {
		filename: "[name].js",
		path: dist('client'),
		publicPath: "/",

		chunkFilename: '[name].js',
	},

	context: source(),

	devtool: "source-map",

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json", "png", "jpg", "gif", "svg"],
		alias: {
			'@components': client('scripts', 'components'),
			'@system': client('scripts', 'system'),
			'@utils': client('scripts', 'utils'),
			'@models': client('scripts', 'models'),
		}
	},

	node: {
		// dgram: 'empty',
		// fs: 'empty',
		// net: 'empty',
		// tls: 'empty',
		// child_process: 'empty',
		// __dirname : true,
	},

	module: module,
	plugins: plugins,
	optimization: optimization,

	devServer: {
		contentBase: dist('client'),
		watchContentBase: true,
		hot: true,
	},

	// externals: [
	// 	(function () {
	// 		var IGNORES = [
	// 			'electron'
	// 		];
	// 		return function (context, request, callback) {
	// 			if (IGNORES.indexOf(request) >= 0) {
	// 				return callback(null, "require('" + request + "')");
	// 			}
	// 			return callback();
	// 		};
	// 	})()
	// ]
}

export default config;