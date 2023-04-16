import type { AxiosRequestConfig, AxiosResponse } from 'axios'
//拦截器的接口类型
export interface TKRequsetInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requrestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}
// 封装axios的配置类型（继承自AxiosRequestConfig）
export interface TKRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: TKRequsetInterceptors<T>
  showLoading?: boolean
}
