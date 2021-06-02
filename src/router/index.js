import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login'
// 在 Vue cli 创建的项目中 @ 表示src  它是 src 目录的路径别名
// 好处: 它不受当前文件路径影响
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'

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
    // 有一个默认子路由，这个命名没有意义
    // 正确的做法：如果有默认子路由，就不要给父路由取名字
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path为空，会作为默认的子路由渲染
        name: 'home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
