<template>
    <el-container class="layout-container">
        <el-aside class="aside" width="200px">
            <app-aside class="aside-menu"/>
            </el-aside>
        <el-container>
            <el-header class="header">
                <div>
                    <i class="el-icon-s-unfold"></i>
                    <span>头条号后台管理系统</span>
                </div>
                <div class="avatar-wrap">
                    <img class="avatar" :src="user.photo" alt="">
                    <el-dropdown>
                <span>
                    {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>用户设置</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
                </div>
                </el-header>
            <el-main class="main">
                <!-- 子路由出口 -->
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
    // 当前登录用户信息
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化好，请求获取用户信息
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.aside {
    background-color: #d3dce6;
    .aside-menu {
        height: 100%;
    }
}

.header {
    // background-color: #b3c0d1;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
}

.main {
    background-color: #e9eef3;
}

.avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
    }
}
</style>
