import {MODE} from "./_config";
import {source, dist, root, client} from "./_utils";

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const clearDocs = (MODE == 'build');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let plugins = [
	(
		clearDocs
		? new CleanWebpackPlugin([ dist('client') ], {root: dist()})
		: false
	),
	new CopyWebpackPlugin([
		{
			from: client('fonts'),
			to: '../fonts',
		},
		{
			from: client('libs'),
			to: '../libs',
		}
	], {}),
	new CheckerPlugin(),
	// Generates an `index.html` file with the <script> injected.
	new HtmlWebpackPlugin({
		// inject: false,
		template: client( 'index.pug'),
		excludeChunks: [ 'content' ],
		filename: "../index.html",
	}),
	new HtmlWebpackPlugin({
		// inject: false,
		template: client( 'index.pug'),
		excludeChunks: [ 'browser' ],
		filename: "../content.html"
	}),
	// This is necessary to emit hot updates (currently CSS only):
	// new webpack.HotModuleReplacementPlugin(),
	// Watcher doesn't work well if you mistype casing in a path so we use
	// a plugin that prints an error when you attempt to do this.
	// See https://github.com/facebookincubator/create-react-app/issues/240
	new CaseSensitivePathsPlugin(),
	// Moment.js is an extremely popular library that bundles large locale files
	// by default due to how Webpack interprets its code. This is a practical
	// solution that requires the user to opt into importing specific locales.
	// https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
	// You can remove this if you don't use Moment.js:
	new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	new webpack.HotModuleReplacementPlugin(),
];



export default plugins.filter(Boolean);