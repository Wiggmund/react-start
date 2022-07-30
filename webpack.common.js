const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');


const MODE = process.env.NODE_ENV;

const generateName = (ext) => {
    console.log(MODE)
    return MODE === 'development' ? `[name].${ext}` : `[name].[contenthash].${ext}`;
};

const plugins = [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: generateName('html')
    }),
    new MiniCssExtractPlugin({
        filename: generateName('css')
    })
];

const commonConfig = {
    mode: MODE,
    context: path.resolve(__dirname),
    
    entry: {
        index: './src/index.js'
    },

    output: {
        filename: generateName('js'),
        assetModuleFilename: `assets/[name]${MODE === 'development' ? '[ext]' : '.[contenthash][ext]'}`,
        path: path.resolve(__dirname, 'build'),
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins
}


module.exports = commonConfig;