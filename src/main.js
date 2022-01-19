/*
 * @Description:
 * @Autor: Espada
 * @Date: 2022-01-14 15:45:33
 * @LastEditors: Espada
 * @LastEditTime: 2022-01-17 11:57:27
 * @FilePath: \earth\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/scss/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
