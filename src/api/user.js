// 《用户相关请求模块》
// 加载 request 模块
import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data 用来设置 POST 请求体
    data // data: data
  })
}
// 获取用户信息
export const getUserProfile = () => {
  // 取到本地存储中的用户信息 getItem
  // 再还原成 JSON格式，就可用点方法调用
  const user = JSON.parse(window.localStorage.getItem('user'))

  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头
    headers: {
      // 属性名和值一般看接口的要求
      // 如以下
      // 属性名： Authorization
      // 属性值：'Bearer空格token数据'  （这里为测试，暂时写死）
      // `Bearer ${user.token}`  反引号里面${}  ES6里面的字符串拼接
      Authorization: `Bearer ${user.token}`
    }
  })
}
// 修改用户信息
// export const updateUser = () => {

// }
