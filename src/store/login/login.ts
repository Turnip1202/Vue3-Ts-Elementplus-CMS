import { Module } from 'vuex'
import LocalCache from '@/utils/cache'
import router from '@/router'
//类型
import { ILoginState } from './type'
import { IRootState } from '../types'
import { IAccount } from '@/service/login/type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusRoleId
} from '@/service/login/login'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: [],
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      //   console.log(userInfo)
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      //  console.log(userMenus)
      state.userMenus = userMenus
      // 注册动态路由
      //  console.log('注册动态路由')
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      // 将token保存到vuex里，并且进行本地存储,下同
      // console.log('执行accountLoginAction', payload)
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult.data)
      const { id, token } = loginResult.data //拿到id和token
      console.log(id)

      commit('changeToken', token)
       LocalCache.setCache('token', token)

      // 发送初始化的请求（完整的role/department）
      dispatch('getInitialDataAction', null, { root: true })

      // 2.再次请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      console.log('userInfoResult', userInfoResult)

      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo) //本地存储

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusRoleId(id)
      const userMenus = userMenusResult.data
      // console.log('用户菜单', userMenusResult)
      commit('changeUserMenus', userMenus) //存入vuex
      LocalCache.setCache('userMenus', userMenus) //进行本地存储

      router.push('/main')
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('执行phoneLoginAction', payload)
    },

    // 定义loadLocalLogin，用来存储vuex的暂存数据
    loadLocalLogin({ commit, dispatch }) {
      //获取token
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的请求（完整的role/department）
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) commit('changeUserInfo', userInfo)
      const userMenus = LocalCache.getCache('userMenus')
      // console.log(userMenus)
      if (userMenus) commit('changeUserMenus', userMenus)
    }
  },
  getters: {}
}

export default loginModule
