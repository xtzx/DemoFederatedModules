// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ModuleFederationPlugin({
            name: 'remoteName',
            library: {type: 'var', name: 'remoteLibraryName', auxiliaryComment: '远程代码注释 无用'},
            // 使用此远程组件加载的文件名称
            filename: 'remoteFileName.js',
            exposes: {
                //此处提供了一个Button组件
                './Button': './src/btn.js',
                // lodash: 'lodash',
                // antd: 'antd',
            },
            // shared: {
            //     lodash: {
            //         singleton: true,
            //         eager: true,
            //         // import: false,
            //     },
            //     antd: {
            //         singleton: true,
            //         eager: true,
            //         // import: false,
            //     },
            // },
            shared: ['lodash', 'antd'],
        }),
        //数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            // template: './public/index.html’,
            filename: 'index.html', //打包后的文件名
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            // hash: true //是否加上hash，默认是 false
        }),
    ],
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        compress: true,
        // open: true,
        port: 3002,
    },
    optimization: {
        splitChunks: false,
        // usedExports: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
