import {source, dist, client} from "./_utils";

import module from "./module";
import _plugins from "./plugins";
import optimization from "./optimization";

const plugins = [].concat(_plugins);

const config = {
	target: "electron-renderer",
	mode: 'development',
	entry: {
		'content': source("client/scripts/content.tsx"),
		'browser': source("client/scripts/browser.tsx"),
	},
	output: {
		filename: "[name].js",
		path: dist('client/scripts'),
		publicPath: "/",

		chunkFilename: '[name].js',
	},

	context: source(),

	devtool: "source-map",

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".png", ".jpg", ".gif", ".svg"],
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
}

export default config;