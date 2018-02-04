/**
 * Created by z.c. on 16/8/14.
 */
require('./support/version.support').version('./src', 'maptalks-gmvi');
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, './index.js')],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'maptalks-gmvi.js'
    },
    devServer: {
        inline: true,
        port: 8181
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'

            }
        ]
    },
    plugins: [
	     new webpack.NoErrorsPlugin(),

		//  new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         drop_console: true,
        //         warnings: false
        //     }
        // }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
