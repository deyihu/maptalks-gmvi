
const webpack = require('webpack');
exports.providers = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false, drop_console: true}
    }),
    new webpack.NoEmitOnErrorsPlugin()
];