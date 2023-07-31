const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // 解决 Uncaught SyntaxError: Cannot use 'import.meta' outside a module (at bundle.js:1022:29)
    // experiments: {
    //     outputModule: true,
    // },
    devtool: 'eval-source-map',
    // devtool: 'source-map',
    plugins: [
        new ModuleFederationPlugin({
            // 主应用程序的名称
            name: 'host111',
            remotes: {
                // 远程应用程序的地址和入口文件
                remote123: 'remoteLibraryName@http://localhost:3001/remote/remoteFileName.js',
                // lodash: 'lodash',
                // antd: 'antd',
            },
            shared: ['lodash', 'antd'],
            // shared: {
            //     lodash: {
            //         singleton: true,
            //         eager: true,
            //         // import: false
            //     },
            //     antd: {
            //         singleton: true,
            //         eager: true,
            //         // import: false
            //     },
            // },
        }),
        new CleanWebpackPlugin(),
        //数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            // template: './public/index.html’,
            filename: 'index.html', //打包后的文件名
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            // scriptLoading: 'module',
            // hash: true //是否加上hash，默认是 false
        }),
        // new HtmlWebpackTagsPlugin({
        //     tags: [
        //         {
        //             path: 'bundle.js',
        //             attributes: {
        //                 type: 'module',
        //             },
        //         },
        //     ],
        //     append: false,
        // }),
    ],
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        compress: true,
        // open: true,
        port: 3001,
        proxy: [
            {
                context: 'http://localhost:3001/remote/',
                // target: 'http://172.20.98.175:8087',
                target: 'http://localhost:3002/',
                // target: 'https://api.baijia.com/mock/9073',
                // target: 'http://test-uanalysis.baijia.com',
                changeOrigin: true,
                // 路径重写规则，可以将请求路径中的某些部分替换成指定的内容
                pathRewrite: {'^/remote': ''},
                onProxyReq(proxyReq, req, res) {
                    console.log(
                        `${req.originalUrl}接口转发到${proxyReq.protocol}//${proxyReq.connection._host}${proxyReq.path}`,
                    );
                },
            },
        ],
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
