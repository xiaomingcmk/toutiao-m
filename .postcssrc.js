// PostCSS 配置对象
module.exports = {
    // 配置要使用的 PostCSS 插件
    plugins: {
        // 配置使用 autoprefixer 插件
        // 作用：生成浏览器的 CSS 样式规则前缀
        // 'autoprefixer': {
        //     // 配置要兼容的环境信息
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        // 配置使用 postcss-pxtorem 插件
        'postcss-pxtorem': {
            // rootValue: 37.5,
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            propList: ['*']
        }
    }
}