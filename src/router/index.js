/*
 * @Description: 页面路由
 * @Autor: Espada
 * @Date: 2022-01-14 15:45:33
 * @LastEditors: Espada
 * @LastEditTime: 2022-01-14 15:52:14
 * @FilePath: \earth\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Earth',
    component: () => import(/* webpackChunkName: "about" */ '../views/Earth.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
