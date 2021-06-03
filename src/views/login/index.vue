<template>
  <div class="login-container">
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
    -->

    <div class="login-form-wrap">
      <div class="login-head">
        <h2 class="logo">头条号管理平台</h2>
      </div>
      <!--
        配置Form表单验证:
        1、必须给el-form组件绑定 model 表单数据对象 如  :model="user"
        2、给需要验证的表单项 el-form-item 设置 prop 属性 如  prop="mobile"
            注意：prop 属性需要指定表单对象中的数据名称
        3、通过 el-from 组件的 rules 属性配置验证规则

        手动表单表单验证
        1、给 el-form 设置 ref 再起个名字（随便，不重复即可）
        2、通过 ref 获取 el-form 组件，调用组件的 validate 进行验证
        -->
      <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onLogin" :loading="loginLoding"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 加载user接口模块
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 是否同意协议
      },
      // checked: false, // 是否同意协议的选中状态
      loginLoding: false, // 登录的 loding 状态
      formRules: { // 表单验证规则配置
      // 要验证的数据名称：规则列表【】
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        agree: [
          {
          // 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
          // 验证通过：callback()
          // 验证失败：callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据(根据接口要求绑定数据)
      // const user = this.user

      // 表单验证
      // this.$refs['login-form'].validate((valid, error) => {
      //   console.log(valid)
      //   console.log(error)
      // })
      // validate 方法是异步的
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }
        // 验证通过,提交登录
        this.login()
      })
    },

    login () {
      // 登录按钮的loding...
      this.loginLoding = true
      // 接口封装后
      login(this.user).then(res => {
        // 登录成功
        console.log(res)
        this.$message({
          message: '恭喜你，登录成功!',
          type: 'success'
        })

        // 关闭 loding...
        this.loginLoding = false

        // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
        // window.localStorage.setItem('user', res.data.data)
        // 但是本地存储只能存储字符串
        // 想要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
        window.localStorage.setItem('user', JSON.stringify(res.data.data))

        // 跳转到首页
        // this.$router.push('./')  //方法一，直接输入路径

        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        // 登录失败
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或者验证码错误!')

        // 关闭 loding...
        this.loginLoding = false
      })
      // 处理后端响应结果
      //   成功:xxx
      //   失败:xxx
    }
  }
}
</script>

<style scoped lang="less">
  .login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('./login_bg.jpg') no-repeat;
    background-size: cover;
    .login-form-wrap {
      min-width: 300px;
      padding: 20px 50px 10px;
      background-color: #fff;
      .login-head {
        display: flex;
        justify-content: center;
        .logo {
          width: 200px;
          height: 30px;
          // background: url('./logo_index.png') no-repeat;
          color:#409eff;
          font-size: 26px;
          text-align: center;
        }
      }
      .login-form {
        .login-btn {
          width: 100%;
        }
      }
    }
  }
</style>
