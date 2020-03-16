// 封装一个通用的接口调用模板
// 采用官方规范的方式开发插件
export default {
    install: (Vue, options) => {
        Vue.prototype.$request = async ({ path, param, method = 'get', header }) => {
            // 实现发送请求
            uni.showLoading({
                title: '正在加载数据...',
                mask: true
            })
            // uni-app对部分小程序原生API进行了封装，可以支持Promise
            const [error, res] = await uni.request({
                url: options.baseURL + path,
                // 请求参数
                data: param,
                method: method,
                header: header
            })
            // 隐藏提示
            uni.hideLoading()
            // 返回异步接口的结果
            return res.data
        }
    }
}