import tkRequest from '@/service'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../types'
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

// 用来请求账户数据
export function accountLoginRequest(account: IAccount) {
  // 返回Promise（tkRequest.post会返回Promise）
  return tkRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

//用来请求用户信息
export function requestUserInfoById(id: number) {
  return tkRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusRoleId(id: number) {
  return tkRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
