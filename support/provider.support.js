/**
 * Created by Blue on 2017/5/16.
 */
const webpack = require('webpack');
exports.providers = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false, drop_console: true}
    }),
    new webpack.NoEmitOnErrorsPlugin()
];