const path = require('path')
const uglgfyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = reqiure('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin') //单独把css文件分离出来

module.exports = {
    entry:{
        main: './src/index.js'
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.jsx?/,
                include:{
                    path: path.resolve(__dirname,'src')
                },
                use:'babel-loader',
            },
            {
                test: /\.css/,
                include: [
                    path.resolve(__dirname,'src'),
                ],
                use:[
                    'css-loader', // 负责解析css代码，主要是处理css中的依赖，如@import,url()等外部文件的声明
                    'style-loader',//将css-loader解析结果转换成JS代码，运行时动态插入style标签让CSS代码生效
                ], // 经这两个loader处理之后，css代码会转变成JS代码和index.js一起打包，如要单独把css文件分离出来，需要用extrack-text-webpack-plugin插件
                /*
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader'], //['css-loader','less-loader'] 配置CSS预处理器loader,eg:less
                })
                */
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader', // 用于处理很多类型的文件，主要作用是输出文件，把构建后的文件路径返回
                        options:{}
                    }
                ]
            },
            {
                test:/.jsx?/,
                include:[
                    path.resolve(__dirname,'src') // src目录下的文件才需要经过babel-loader处理
                ],
                loader:'babel-loader'
            }
        ]
    },
    plugin:[
        new uglgfyPlugin(),
        new HtmlWebpackPlugin({
            filename:'indec.html',// 配置输出文件名和路径
            template: 'assets/index.html', //配置文件模板
        }),
        // new ExtractTextPlugin('index.css') //引入插件，配置文件名，这里同样可以使用hash
    ],
    // 代码模块解析的路径配置
    resolve:{
        module:['node_modules','src'],
        extensions:['.wasm','.mjs','.js','.json','.jsx'],
    }
}