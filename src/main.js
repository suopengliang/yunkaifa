import Vue from 'vue'
import App from './App'
// 初始化云开发
wx.cloud.init({
  env: 'yunkaifa-8gwo0b0o32da7879'
})
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
