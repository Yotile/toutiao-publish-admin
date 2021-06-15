// 内容管理接口模块
import request from '@/utils/request'

// 获取文章列表
export const getArticle = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Headers 参数使用 Headers 设置
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    params
  })
}

// 获取文章频道
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const deleteArticle = articleID => {
  return request({
    method: 'DELETE',
    // 接口文档写的路径参数需要在 url 中传递
    // 凡是看见接口路径中有的 :xxx 格式的字段,则需要传递路径参数
    url: `/mp/v1_0/articles/${articleID}`
    // url: '/mp/v1_0/articles/:target'
  })
}
