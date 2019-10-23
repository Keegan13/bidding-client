// Important modules this config uses
const path = require('path');
//const webpack = require('webpack');

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/',
        filename: '[name].js'
    },
    entry: [
        path.join(process.cwd(), 'app/app.js')
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                // Preprocess our own .scss files
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                // Preprocess 3rd party .css files located in node_modules
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
                use: 'file-loader'
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(mp4|webm)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }
            }
        ]
    },
    resolve: {
        modules: ['app', 'node_modules'],
        extensions: ['.js', '.jsx', '.scss', '.react.js'],
        mainFields: ['browser', 'jsnext:main', 'main']
    },
};