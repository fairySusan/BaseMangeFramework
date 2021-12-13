const Personal = () => import("@/views/setting/personal/Personal.vue")
const UserManage = () => import("@/views/setting/userManage/UserManage.vue")
export const settingRouters = [
  {
    path: '/personal',
    name: 'personal',
    meta: {
      name: '个人中心'
    },
    component: Personal
  },
  {
    path: '/setting/staffSetting',
    name: 'staffSetting',
    meta: {
      name: '用户管理'
    },
    component: UserManage
  }
]