const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');


const MODE = process.env.NODE_ENV;

const generateName = (ext) => {
    return MODE === 'development' ? `[name].${ext}` : `[name].[contenthash].${ext}`;
};

const plugins = [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: generateName('html')
    }),
    new MiniCssExtractPlugin({
        filename: generateName('css')
    }),
    new EslintWebpackPlugin({
        context: path.resolve(__dirname),
        extensions: ['tsx', 'ts'],
        exclude: [
            './build',
            './node_modules',
            './src/assets'
        ]
    })
];

const commonConfig = {
    mode: MODE,
    context: path.resolve(__dirname),

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    
    entry: {
        index: './src/index.tsx'
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
                test: /\.tsx?$/,
                use: ['babel-loader']
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