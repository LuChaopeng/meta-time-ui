import axios from 'axios'

/**
 * 根据环境变量修改baseURL，并携带cookie（axios请求默认不带cookie）
 */
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'dev' ? '/' : 'http://111.229.176.245:3000/',
  withCredentials: true,
  timeout: 5000
})

export default service
