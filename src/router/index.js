import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login'
// 在 Vue cli 创建的项目中 @ 表示src  它是 src 目录的路径别名
// 好处: 它不受当前文件路径影响
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'

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
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }
]
// 用户登录状态信息
const user = JSON.parse(window.localStorage.getItem('user'))

const router = new VueRouter({
  routes
})

// 路由导航守卫:也就是所有页面的导航都会经过这里
// to: 要去的路由信息
// from: 来自哪里的路由信息
// next: 放行方法(符合通过条件可调用放行)
router.beforeEach((to, from, next) => {
  // 验证登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录,允许通过
      next()
    } else {
      // 没有登录信息,跳转到登陆页面
      next('/login')
    }
  } else {
  // 如果是登录页面 就允许通过
    next()
  }
})
export default router
