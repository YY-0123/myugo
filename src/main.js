import Vue from 'vue'
import App from './App'
import MyPlugin from '@/utils/request.js'
Vue.use(MyPlugin, {
  // 后台接口的基准路径
  baseURL: 'https://api-ugo-dev.itheima.net/api/public/v1/'
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
