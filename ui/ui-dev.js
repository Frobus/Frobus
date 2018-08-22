const serve = require('webpack-serve');
const config = require('./webpack.config.js');

const static = require('koa-static')

const historyApiFallback = require('koa-history-api-fallback');

serve({
	config,
	add: (app, middleware, options) => {
		app.use(static(__dirname + '/static'));
		app.use(historyApiFallback());
	},
});