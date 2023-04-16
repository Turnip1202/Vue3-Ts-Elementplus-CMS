import TKRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'
const tkRequest = new TKRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) config.headers.Authorization = `Bearer ${token}`
      console.log('请求成功的拦截')
      return config
    },
    requrestInterceptorCatch(err) {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch(err) {
      console.log('响应失败的拦截')
      return err
    }
  }
})
// console.log(tkRequest.get)
export default tkRequest
