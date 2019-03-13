const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

fs.open('./src/config/env.js', 'w', function (err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) { });
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        })
    ],
    // 本地调试网络请求跨域代理配置
    devServer: {
        proxy: {
            '/ampAuthService/*': {
                target: 'http://172.17.13.80/amp-auth-service/rest',
                changeOrigin: true,
                secure: false, // 接受 运行在 https 上的服务
                pathRewrite: { '^/ampAuthService': '' }
            },
            '/sz/*': {
                target: 'http://172.17.10.218:8117/rest',
                changeOrigin: true,
                secure: false, // 接受 运行在 https 上的服务
                pathRewrite: { '^/sz': '' }
            },
            '/goods-quote/rest*': {
                target: 'http://172.17.13.80:80/goods-quote/rest',
                changeOrigin: true,
                secure: false, // 接受 运行在 https 上的服务
                pathRewrite: { '^/goods-quote/rest': '' }
            },
            '/amp-openapi-service/rest*': {
                target: 'http://172.17.13.80:80/amp-openapi-service/rest',
                changeOrigin: true,
                secure: false, // 接受 运行在 https 上的服务
                pathRewrite: { '^/amp-openapi-service/rest': '' }
            },
            '/licenceInfo/*': {
                target: 'http://172.17.13.80/amp-openapi-service/rest?',
                changeOrigin: true,
                secure: false, // 接受 运行在 https 上的服务
                pathRewrite: { '^/licenceInfo': '' }
            }
        }
    }
});
