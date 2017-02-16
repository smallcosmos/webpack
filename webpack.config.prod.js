var path = require("path");
module.exports = {
	entry: {
		bundle: "./main.js"
	},
	output: {
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
				test: /\.js$/,
				loader: 'es3ify-loader',
				enforce: 'post'
			}
		]
	}
}