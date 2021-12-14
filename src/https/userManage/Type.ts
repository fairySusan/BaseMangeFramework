export interface GetAllUserParamI {
  Key?:string; // 关键字
	Name?: string; // 如果不传这个参数即为获取所有的用户
	Account?: string;
	NickName?: string;
	Phone?: string;
	JobNumber?: string;
	EMail?: string;
	Sex?: number;
	IsLocked?: boolean;
	RoleIds?: number[];
	StartCreatedTime?: string;
	EndCreatedTime?: string;
	PageIndex?: number;
	PageSize?: number;
}

export interface UserManageItemI {
	id: number;
	account: string;
	creationTime: string;
	isLocked: boolean;
  name: string;
	nickName: string;
	phone: string;
	jobNumber: string;
	eMail: string;
	headProtrait: string; // 头像
	sex: number;
	roles: {
		creationTime: string;
		creatorId: number;
		creatorName: string;
		id: number;
		isDefault: boolean;
		isLocked: boolean;
		name: string;
		remark: string;
	}[]
}

export interface ModifyUserInfoParamsI {
	id: number,
	name: string,
  nickName: string,
  phone: string,
  jobNumber:string,
  eMail: string,
  sex: 0 | 1,
  roleIds: number[]
}

export interface AddUserInfoParamsI {
	account: string;
	name: string,
  nickName: string,
  phone: string,
  jobNumber:string,
  eMail: string,
  sex: 0 | 1,
  roleIds: number[]
}