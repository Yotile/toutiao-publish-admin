<template>
    <el-container class="layout-container">
        <el-aside class="aside" width="auto">
            <!-- 侧边栏子组件 -->
            <app-aside class="aside-menu" :is-collapsed='isCollapsed'/>
        </el-aside>
        <el-container>
            <el-header class="header">
                <div>
                    <!-- CSS样式处理
                    {
                        CSS类名：布尔值
                    }
                    如果为true就作用上 -->
                    <i
                    :class="{'el-icon-s-fold': isCollapsed, 'el-icon-s-unfold': !isCollapsed}"
                    @click="isCollapsed = ! isCollapsed"
                    ></i>
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
                    <!-- 组件默认是不识别原生事件的,除非内部做了处理
                    不然就使用.native修饰符-->
                    <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
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
      user: {},
      isCollapsed: false // 控制左侧菜单栏的展开状态
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
        // console.log(res)
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('是否退出登录?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除用户的登录状态
        window.localStorage.removeItem('user')
        // 路由跳转到登录页
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
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
