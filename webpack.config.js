const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const IS_DEV = process.env.NODE_ENV === 'development';
const extpath = path.join(__dirname, './src/browser/extension/');
const extractLess = new ExtractTextPlugin({
    filename: '[name].min.css',
    disable: IS_DEV
});

const config = {
    entry: {
        devtools: `${extpath}devtools/index.js`,
        devpanel: `${extpath}devpanel/index.js`,
        background: `${extpath}background/index.js`,
        inject: `${extpath}inject/index.js`
    },
    output: {
        path: path.resolve(__dirname, './build/extension'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[local]__[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'devtools',
            filename: 'devtools.html',
            template: `${extpath}devtools.html`,
            inject: 'body',
            chunks: ['devtools']
        }),
        new HtmlWebpackPlugin({
            title: 'devpanel',
            filename: 'devpanel.html',
            template: `${extpath}devpanel.html`,
            inject: 'body',
            chunks: ['devpanel']
        }),
        new CopyWebpackPlugin([{
                from: './src/assets/img',
                to: 'img'
            },
            {
                from: `${extpath}manifest.json`,
                to: ''
            }
        ]),
        extractLess
    ],

};

if (IS_DEV) {
    config.entry = {
        example: './example/init.js'
    };
    config.output.path = path.resolve(__dirname, './example');
    config.plugins = [
        new HtmlWebpackPlugin({
            title: 'example',
            filename: 'index.html',
            template: './example/canvas.html',
            inject: 'body',
            chunks: ['example']
        }),
        extractLess
    ];
    config.devServer = {
        host: '0.0.0.0',
        port: 9000,
        contentBase: path.resolve(__dirname, './example')
    }
}

module.exports = config;
