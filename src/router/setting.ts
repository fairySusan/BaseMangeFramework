const Personal = () => import("@/views/setting/personal/Personal.vue")
const UserManage = () => import("@/views/setting/userManage/UserManage.vue")
const MenuManage = () => import("@/views/setting/menuMange/MenuManage.vue")
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
  },
  {
    path: '/setting/menuManage',
    name: 'menuManage',
    meta: {
      name: '菜单管理'
    },
    component: MenuManage
  }
]