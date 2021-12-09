import { TokenHandler } from '@/mixins/TokenUtil';
import { ElMessage } from 'element-plus';
import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized } from 'vue-router';
import {settingRouters} from './setting'
const Login = () => import('@/views/login/Login.vue')
const BaseRightPanel = () => import('@/componentsui/baseRightPanel/BaseRightPanel.vue')
const BaseContainer = () => import('@/componentsui/baseContainer/BaseContainer.vue')
const Home = () => import('@/views/home/Home.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    name: 'rightPanel',
    meta: {
      name: '容器'
    },
    component: BaseRightPanel,
    children: [
      {
        path: '/container',
        name: 'container',
        meta: {
          name: '首页'
        },
        component: BaseContainer,
        children: [
          {
            path: '/home',
            name: 'home',
            meta: {
              name: '首页'
            },
            component: Home
          },
          ...settingRouters
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      name: '登录页'
    },
    component: Login
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export const exteranl = [
  '/login'
]

// 全局路由拦截器
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const curToken = TokenHandler.getToken();
  if (exteranl.includes(to.path)) {
    return true
  } else if (curToken){
    return true
  } else {
    ElMessage.error({
      message: '暂无权限，请重新登录！',
      duration: 1000
    })
    return {path:'/login',replace:true}
  }
})

export default router