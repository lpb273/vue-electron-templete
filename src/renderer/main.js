import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store/index'

import "@/assets/style/element-variables.scss"
import "@/assets/style/reset.scss"

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

import Win from 'electron-vue-windows'
Win.init(router, {
  // freeWindowNum: 1, // 初始空闲窗口数量（选填：默认为1）
  // port: 9080 // 端口号（选填：默认9080）
})
Vue.prototype.$Win = Win

// bus通讯
import Bus from "@/utils/bus";
Vue.prototype.$Bus = Bus;

import VueElectron from 'vue-electron';
Vue.use(VueElectron);

import axios from 'axios'
Vue.http = Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
