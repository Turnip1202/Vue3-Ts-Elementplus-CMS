import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/types'
let firstMenus: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  //得到../router/main下的.ts文件的 上下文
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // console.log(key)
    //拿到路径，并得到对应的模块
    const route = require('../router/main' + key.split('.')[1])
    // console.log(route)
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes（筛选路由）
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenus) firstMenus = menu
      } else {
        // 一级菜单，就去递归（函数的作用就是筛选二级菜单）
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  //for of 不会遍历空数组
  for (const menu of userMenus) {
    if (menu.type === 1) {
      //是一级菜单，就去遍历二级菜单
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) permissions.push(menu.permission)
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}
export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []
  const _recurseGetLeaf = (menuList: any) => {
    for (const menu of menuList) {
      if (menu.children) _recurseGetLeaf(menu.children)
      else leftKeys.push(menu.id)
    }
  }
  _recurseGetLeaf(menuList)
  return leftKeys
}
export { firstMenus }
