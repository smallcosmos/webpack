var path = require("path");
var webpack = require("webpack");

// var htmlwebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: {
		bundle: "./main.js"
	},
	output: {
		publicPath: "build/",
		path: path.resolve(__dirname, "build"),
		filename: "[name].js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: ['babel-loader', 'eslint-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(jpg|jpeg|ico|png|gif)$/,
				loader: 'url-loader?limit=8192&name=image/[hash:8].[name].[ext]'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader' //it's no longer allowed to omit the '-loader' suffix when using loaders
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.js$/,
				loader: 'es3ify-loader',
				enforce: 'post'
			},
			{
				//use npm view jquery versions to view all versions of jquery, choose 1.12.4 for ie8 compability
				//use npm install jquery@1.12.4 --save-dev to download jquery
				//use npm install imports-loader to download imports-loader
				test: /\.js$/,
				loader: 'imports-loader?$=jquery'
			}
		]
	},
	plugins: [
		// another way to use plugin, like imports-loader
		new webpack.ProvidePlugin({
			// "$": "jquery",
			// "jQuery": "jquery",
			// "window.jQuery": "jquery",
			ReactDOM: 'react-dom',
			React: 'react'
		}),
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
		new webpack.DefinePlugin({
			//windows
			//set DEBUG=true
			//linux or OSX
			//export DEBUG=true
			__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || false))
		})
	],
	externals: {
		//allows you to specify dependencies for your library that are not resolved by webpack, but become dependencies of the output
		//You can use the externals option to import an existing API into applications. 
		//'_jQuery': false  => require('_jQuery') is not externals. so, make sure module _jQuery is included in the bundle.
		//'_jQuery': true => require('_jQuery') is externals, and bundled like this: module.exports = _jQuery. so, make sure _jQuery is available in the global context.
		//'_jQuery': '_$' = > require('_JQuery') is externals, and bundled like this: module.exports = _$
		_jQuery: '_$'
	}
}