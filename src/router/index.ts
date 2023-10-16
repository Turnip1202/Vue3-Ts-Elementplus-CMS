import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
//路由的类型
import type { RouteRecordRaw } from 'vue-router'

//对本地存储的封装
import LocalCache from '@/utils/cache'

//获取第一个菜单，登录之后可以直接跳转
import { firstMenus } from '@/utils/map-menus'

/* 业务逻辑：
1.先获取token，来判断是否登录，
2.若已登录，则直接跳转到main
3.若没登录，则跳转到登录页面
*/

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // children:[] 通过userMenus来决定 -> children
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-fount/not-fount.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导航守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = LocalCache.getCache('token')
    if (!token) return '/login'
  }

  if (to.path === '/main') return firstMenus.url
})

export default router
