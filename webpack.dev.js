

const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');


const devConfig = {
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        hot: true,
        open: true
    }
};

module.exports = merge(commonConfig, devConfig);