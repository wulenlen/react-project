const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve('./dist'),
        filename: 'js/bundle[hash:5].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        }),

        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    devServer: {
        proxy: {
          '/api': {
            target: 'http://192.168.2.8:10020/mock/11',
            // pathRewrite: { '^/api': '' },
            changeOrigin: true,
          },
        },
    },
}