const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');


const prodConfig = {
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        }
    }
};

module.exports = merge(commonConfig, prodConfig);