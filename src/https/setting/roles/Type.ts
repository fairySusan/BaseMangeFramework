export interface GetRolesParamsI {
  Name?:string; // 角色名称
  IsLocked?:boolean; // 是否锁定
}

export interface RolesItemI {
  id: number;
	name: string;
	remark: string; // 备注
	isDefault: boolean; // 是否默认
	isLocked: boolean; // 是否锁定
  creationTime?: string; // 创建日期
	creatorId: number; // 创建者id
	creatorName: string; // 创建者名称
}

/**
 * 添加角色所需参数
 */
export interface AddRolesParamI {
	name: string;
	remark: string; // 备注
	isDefault: boolean; // 是否默认
	isLocked: boolean; // 是否锁定
}

/**
 * 修改角色所需参数
 */
 export interface ModifyRolesParamI extends AddRolesParamI{
	id: number;
}