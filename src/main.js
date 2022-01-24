/*
 * @Description: main
 * @Autor: Espada
 * @Date: 2022-01-21 11:47:15
 * @LastEditors: Espada
 * @LastEditTime: 2022-01-24 17:09:15
 * @FilePath: \earth3.0\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/scss/index.scss'

createApp(App).use(store).use(router).mount('#app')
