import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { TKRequsetInterceptors, TKRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
const DEFAULT_LOADING = true

class TKRequest {
  instance: AxiosInstance //自定义实例
  interceptors?: TKRequsetInterceptors //自定义拦截器
  loading?: ILoadingInstance //加载页面
  showLoading: boolean //控制加载页面的展示
  constructor(config: TKRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    this.interceptors = config.interceptors //取出原生axios拦截器的配置

    //自定义自己的配置
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requrestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 添加所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例的拦截器：请求成功的拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载~~~',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (err) => {
        console.log('所有实例的拦截器：请求失败的拦截')

        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例的拦截器：响应成功的拦截')
        // console.log(res)
        // 移除loading
        setTimeout(() => {
          this.loading?.close()
        }, 100)
        const data = res.data
        console.log(data)
        if (data.returnCode === '-1001') {
          console.log('请求失败~错误信息')
        } else return data
      },
      (err) => {
        console.log('所有实例的拦截器：相应失败的拦截')
        // 移除loading
        this.loading?.close()
        // 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  }

  request<T>(config: TKRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //可以单个实例单独修改拦截器
      if (config.interceptors?.requestInterceptor)
        config = config.interceptors.requestInterceptor(config)

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          // console.log(res)
          resolve(res)
        })
        .catch((err) => {
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: TKRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: TKRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: TKRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: TKRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default TKRequest
