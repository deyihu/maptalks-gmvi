/**
 * Created by Blue on 2017/5/16.
 */
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const product = process.env.mode.trim() === 'prd';

exports.loaders = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015'],
            compact: false,
            ignore: [
                "checkTree"
            ]
        }
    },
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: product
                    }
                }
            ]
        })
    },

    {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
            limit: 20000
        }
    }
];