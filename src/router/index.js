import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login'
// 在 Vue cli 创建的项目中 @ 表示src  它是 src 目录的路径别名
// 好处: 它不受当前文件路径影响
import Login from '@/views/login'
import Home from '@/views/home'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
