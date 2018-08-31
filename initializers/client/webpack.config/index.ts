import {source, dist, client, root} from "./_utils";
import resolve 						from "../../webpack.config/resolve";

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

	resolve: resolve,

	node: {},

	module: module,
	plugins: plugins,
	optimization: optimization,

	devServer: {
		contentBase: dist('client'),
		watchContentBase: true,
		hot: true,
		port: 50080,
	},
}

export default config;