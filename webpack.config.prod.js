var path = require("path");
var webpack = require("webpack");
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
				loader: 'babel-loader',
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
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			//windows
			//set DEBUG=true
			//linux or OSX
			//export DEBUG=true
			__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || false))
		})
	]
}