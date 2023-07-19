import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import { IRootState, IStoreType } from './types'
import system from './main/system/system'
import { getPageListData } from '@/service/main/system/system'

import dashboard from './main/analysis/dashboard'
//给根状态传递一个泛型
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'turnip',
      age: 19,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list: any) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list: any) {
      state.entireRole = list
    },
    changeEntireMenu(state, list: any) {
      state.entireMenu = list
    }
  },
  // 修改state唯一的方式就是通过mutations
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  getters: {},
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}
// 自定义自己的useStore，增强Vuex对ts的支持
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
