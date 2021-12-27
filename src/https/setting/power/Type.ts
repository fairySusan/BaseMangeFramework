
// 权限管理模块 - 权限列表基本的字段
export interface BasePowerItemI{
  buttonKey: string; // 按钮key值，及按钮权限的key值
  buttonName: string; // 按钮名称
  menuId:string; // 菜单id
  id: null | string;
  isDefault: boolean; // 是否默认
  name: string; // 权限名称
  remark: string; // 备注
  functions: AllPowersResultI[]; // 功能点id数组
}

/**
 * 获取所有权限返回的数据
 */
 export interface AllPowersResultI {
  id:string;
  name: string; // 权限名称
  area: string; // 区域
  areaDesc: string; // 区域描述
  controller: string; // 控制器
  controllerDesc: string; // 控制器描述
  action: string; // Action
  actionDesc: string; // Action描述
  code:string; // code 权限code码
}

// 权限管理模块 - 权限列表返回的详细内容
export interface PowerSettingItemI extends BasePowerItemI{
  functions: AllPowersResultI[]; // 功能点id数组
}

export interface AddPowerItemI {
  buttonKey: string; // 按钮key值，及按钮权限的key值
  buttonName: string; // 按钮名称
  menuId:string; // 菜单id
  isDefault: boolean; // 是否默认
  name: string; // 权限名称
  remark: string; // 备注
  functionIds: string[]; // function的id组成的数组
}

// 权限管理模块 - 修改或新增权限列表所需参数
export interface ModifyPowerItemI extends AddPowerItemI {
  id: null | string;
}