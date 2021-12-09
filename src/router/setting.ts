const Personal = () => import("@/views/setting/personal/Personal.vue")
export const settingRouters = [
  {
    path: '/personal',
    name: 'personal',
    meta: {
      name: '个人中心'
    },
    component: Personal
  }
]