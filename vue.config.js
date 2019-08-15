/*
 * @Description: vue配置文件
 * @Author: LiuHuaifu
 * @Date: 2019-08-07 19:33:27
 * @LastEditTime: 2019-08-15 11:00:41
 * @LastEditors: Please set LastEditors
 */
const px2rem = require("postcss-px2rem");
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/busBills/' : '/',

    productionSourceMap: false,

    outputDir: "busBills",

    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    // px2rem({
                    //     rootValue: 153.6,
                    //     mediaQuery: true, //（布尔值）允许在媒体查询中转换px。
                    //     minPixelValue: 0 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    // })
                ]
            }
        }
    }

}