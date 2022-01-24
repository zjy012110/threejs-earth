/*
 * @Description: 路由
 * @Autor: Espada
 * @Date: 2022-01-21 11:47:15
 * @LastEditors: Espada
 * @LastEditTime: 2022-01-24 17:06:57
 * @FilePath: \earth3.0\src\router\index.js
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Earth',
    component: () => import(/* webpackChunkName: "about" */ '../views/Earth.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
