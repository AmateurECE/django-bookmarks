const path = require('path');
module.exports = {
    mode: "production",
    entry: './extension/popup.js',
    output: {
        path: path.resolve('./extension/build/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    externals: {
        'd3': 'd3'
    },
    resolve: {
        alias: {
            api: path.resolve(__dirname, './static/js')
        }
    }
};
