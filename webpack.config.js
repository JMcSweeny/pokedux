var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
  	entry: [
	    './src/index'
  	],
  	output: {
  		path: path.join(__dirname, 'dist'),
    	filename: 'bundle.js',
    	publicPath: '/dist/'
  	},
  	plugins: [
    	new webpack.NoErrorsPlugin()
  	],
  	module: {
    	loaders: [
            {
                test: /\.jsx?/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader?name=img/img-[hash:6].[ext]"
            }
        ]
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  }
};