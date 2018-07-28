const path = require('path');

module.exports = {
	entry: './src/main.ts',
	output: {
		filename: 'nn.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts']
	},
	mode: 'production'
}
