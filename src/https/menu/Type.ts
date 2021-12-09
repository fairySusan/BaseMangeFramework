import { PowerSettingItemI } from "../power/Type";

export interface BasicMenuItemI {
  id: string | null; // 菜单Id
  parentId: string | null; // 父级Id
  name: string; // 菜单名称
  icon: string; // 图标
  url: string; // 路由地址
  indexOrder:number; // 菜单序号
}
export interface MenuItemI extends BasicMenuItemI {
  children:MenuItemI[]; // 子菜单
	creationTime?: string; // 创间时间
  parentName?: string; // 父级角色名称
  powers?:PowerSettingItemI[] // 当前菜单对应的权限
}