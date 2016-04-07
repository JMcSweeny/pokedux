var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  	entry: [
		'./src/index'
  	],
  	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist/'
  	},
  	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
	  		compressor: {
				warnings: false
	  		}
		}),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
      })
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
                loader: 'style!css!postcss-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader?name=img/img-[hash:6].[ext]"
            }
        ]
  	},
    postcss: function() {
        return [autoprefixer]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};