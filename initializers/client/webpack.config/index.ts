import {source, dist, client, root} from "./_utils";

import module from "./module";
import _plugins from "./plugins";
import optimization from "./optimization";
import {PROD} from "./_config";

const plugins = [].concat(_plugins);

const config = {
	target: "electron-renderer",
	mode: PROD ? 'production' : 'development',
	entry: {
		'views/app': source("client/views/app.tsx"),
		'views/content': source("client/views/content.tsx"),
	},
	output: {
		filename: "[name].js",
		path: dist('client', 'scripts'),
		publicPath: 'scripts/',

		chunkFilename: '[name].js',
	},

	context: source(),

	devtool: PROD ? 'none' : "source-map",

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".png", ".jpg", ".gif", ".svg"],
		alias: {
			'@root'			: root(),
			'@source'		: source(),
			'@client'		: client(),
			'@components'	: client('components'),
			'@models'		: client('models'),
			'@scenes'		: client('scenes'),
			'@styles'		: client('styles'),
			'@system'		: client('system'),
			'@utils'		: client('utils'),
			'@views'		: client('views'),
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