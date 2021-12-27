const Personal = () => import("@/views/setting/personal/Personal.vue")
const UserManage = () => import("@/views/setting/userManage/UserManage.vue")
const MenuManage = () => import("@/views/setting/menuMange/MenuManage.vue")
const RoleManage = () => import("@/views/setting/roleManage/RoleManage.vue")
const PowerManage = () => import("@/views/setting/powerManage/PowerManage.vue")
const SystemLog = () => import("@/views/setting/systemLog/SystemLog.vue")
const AuditLog = () => import("@/views/setting/auditLog/AuditLog.vue")


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
  },
  {
    path: '/setting/roleSetting',
    name: 'roleManage',
    meta: {
      name: '角色管理'
    },
    component: RoleManage
  },
  {
    path: '/setting/powerSetting',
    name: 'powerManage',
    meta: {
      name: '权限管理'
    },
    component: PowerManage
  },
  {
    path: '/systemLog',
    name: 'systemLog',
    meta: {
      name: '系统日志'
    },
    component: SystemLog
  },
  {
    path: '/auditLog',
    name: 'auditLog',
    meta: {
      name: '审计日志'
    },
    component: AuditLog
  }
]