import {root, source, client, dist} from "./_utils";
import {snapSvgPath} from "./_config";

const pugIncludeGlob = require('pug-include-glob');

// const MiniCssExtractPlugin = require("mini-css-extract-plugin");


export default {
	rules: [
		{
			test: /\.tsx?$/,
			exclude: /(node_modules|bower_components)/,
			use: [
				{
					loader: "awesome-typescript-loader",
					options: {
						configFileName: root('tsconfig.json'),
						// useBabel: true,
						// babelOptions: {
						// 	plugins: ["dynamic-import-webpack"]
						// },
						// babelCore: "@babel/core"
					}
				}
			],
		},
		{
			test: /\.styl$/,

				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'stylus-loader',
						options: {
							import: client('styles', 'helpers', '*.styl')
						},
					},
				]

		},
		{
			test: /\.css$/,

				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],

		},
		{
			test: /\.pug$/,
			use : [{
				loader: 'pug-loader',
				options: {
					plugins: [ pugIncludeGlob({ /* options */ }) ]
				}
			}]
		},
		{
			test: /((\/assets\/|\\assets\\)(\/data\/|\\data\\)|(\.(png|jpg|gif|svg)$))/,
			use: [
				{
					loader: 'file-loader',
					options: {
						useRelativePath: true,
						outputPath: function(path){
							path = path.replace('/source/', '');
							return path;
						},
						name: '[path][name].[ext]?[hash]',
					}
				}
			]
		},
		{
			test: snapSvgPath,
			use: 'imports-loader?this=>window,fix=>module.exports=0',
		},
	]
}