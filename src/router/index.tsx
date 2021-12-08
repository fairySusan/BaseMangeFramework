import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
const Login = () => import('@/views/login/Login.vue')
const Container = () => import('@/componentsui/container/Container.vue')
const Home = () => import('@/views/home/Home.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    name: 'Container',
    meta: {
      name: '容器'
    },
    component: Container,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          name: '首页'
        },
        component: Home
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
  history: createWebHistory(),
  routes
})

export default router