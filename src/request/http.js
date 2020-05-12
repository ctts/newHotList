import axios from 'axios' // 引入axios
import router from '../router/index'

// 创建axios并设置超时时间
var instance = axios.create({
  timeout: 1000 * 10
})
// 默认url
instance.defaults.baseURL = process.env.VUE_APP_PATH
// instance.defaults.baseURL = 'http://localhost:3000'

// 默认请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    name: 'Login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
      // 403 token过期
      // 清除token并跳转登录页
    case 403:
      localStorage.removeItem('token')
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
      // 404请求不存在
    case 404:
      // this.$toast.bottom('请求的资源不存在')
      break
    default:
      // 断网情况
      if (other === 'Network Error') {
        // this.$toast.bottom('网络连接中断')
      }
      console.log(other)
  }
}

// 默认请求拦截器
instance.interceptors.request.use(
  config => {
    // 添加token
    const token = localStorage.token
    token && (config.headers.Authorization = token)
    // console.log(token);
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 默认响应拦截器
instance.interceptors.response.use(
  res => {
    // 只有状态为200时请求成功，否则抛错
    return (res.status >= 200 && res.status <= 400) ? Promise.resolve(res) : Promise.reject(res)
  },
  error => {
    // 和后台协商自定义错误码
    const response = error
    errorHandle(error.request.status, response.message)
    return Promise.reject(response)
  }
)

export default instance
