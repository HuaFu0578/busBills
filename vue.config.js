/*
 * @Description: vue配置文件
 * @Author: LiuHuaifu
 * @Date: 2019-08-07 19:33:27
 * @LastEditTime: 2019-08-29 16:19:44
 * @LastEditors: your name
 */
const isProduction = process.env.NODE_ENV === 'production';
const CompressionPlugin = require("compression-webpack-plugin");

const cdn = {
    css: [],
    js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
        'https://cdn.bootcss.com/vue-router/3.1.2/vue-router.min.js',
        'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
        'https://cdn.bootcss.com/element-ui/2.11.1/index.js',
        'https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts.min.js'
    ]
}

module.exports = {
    publicPath: isProduction ? '/busBills/' : '/',

    productionSourceMap: false,

    // productionGzip: true,

    // productionGzipExtensions: ['js', 'css', 'html'],

    outputDir: "busBills",

    chainWebpack: config => {
        // 生产环境配置
        if (isProduction) {
            // 生产环境注入cdn
            config.plugin('html')
                .tap(args => {
                    args[0].cdn = cdn;
                    return args;
                });
        }
    },

    configureWebpack: config => {
        if (isProduction) {
            // 用cdn方式引入
            config.externals = {
                    'vue': 'Vue',
                    'vuex': 'Vuex',
                    'vue-router': 'VueRouter',
                    'axios': 'axios',
                    'element-ui': 'ELEMENT',
                    'echarts': 'echarts'
                },
                config.plugins.push(new CompressionPlugin({
                    test: /\.js$|\.css$|.html$/,
                    algorithm: 'gzip',
                    threshold: 10240,
                    minRatio: 0.8,
                    deleteOriginalAssets: false,
                }));
        }
    },

}