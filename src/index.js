const uglifyPlugin = require('uglifyjs-webpack-plugin') // 压缩js代码的插件
module.export = {
    //entry
    entry:'./src/index.js', // 单入口
    /* entry:{
        main: './src/index.js' // 单入口的另一种写法，指定一个入口给main
    } */
    /* entry:{ //配置多文件打包，使用多个文件作为入口，webpack会解析两个文件的依赖打包
        main :['./src/index.js','./src/a.js']
    }
    */
    /* entry:{ // 配置多个入口
        a:'./src/a.js',
        b:'./src/b.js'
    }
     */
    // loader
    rules:[ // loader: 处理多种文件格式的机制,可以理解成一个转换器,将某种文件格式的内容转换成webpack可以支持打包的模块
        {
            test:/\.jsx?/, //匹配文件路径的格式，一般是匹配文件的后缀名
            include:[
                path.resolve(__dirname,'src') //指定哪些文件需要经过loader处理
            ],
            use: 'babel-loader' ,//指定使用的loader,使用不同的loader来解析不同类型的文件，eg: css需要style-loader
        },
    ],
    // plugin: 满足构建中的特殊需求，处理其他的一些构建任务
    plugin:[
        new ullifyPlugin()
    ],
    //output: webpack构建完最终输出的静态文件
    output:{
        path: path.resolve(__dirname,'dist'), //输出路径
        filename:'bundle.js' //输出名

        /* 多个入口生成不同的文件
        path: __dirname+'/dist'
        filename:[name].js  [name]指的是entry里配置的key值
         */

        /* 或者再路径中使用hash,每次构建都会产生一个新的hash,避免新版本发布时浏览器使用缓存
        path:__dirname+/dist/[hash],
        name: [name].js
        */
    }
}
