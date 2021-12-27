import { MenuItemI } from "../setting/menu/Type";
import { BasePowerItemI } from "../setting/power/Type";

export interface LoginParamsI {
  account: string; // 账户名
  password: string; // 密码
  verificationCode:string; // 输入的验证码
  verificationCodeFlag:string; // 获取验证码返回的code值
}

export interface LoginResponseI {
  jsonWebToken: JsonWebTokenI,
  user: UserI
}

export interface JsonWebTokenI {
  accessToken:string;
  refreshToken:string;
  refreshUctExpires: string;
  tokenUtcExpires:string;
}

export interface UserI {
  account: string;
  creationTime: string;
  eMail: string;
  headProtrait: string;
  id: number;
  isLocked: boolean;
  jobNumber: string;
  name: string;
  nickName: string;
  phone: string;
  sex: number;
  sexName: string;
  roles: RoleI[]
}

export interface RoleI {
  creationTime: string;
  creatorId: number;
  creatorName: string;
  id: number;
  isDefault: boolean;
  isLocked: boolean;
  name: string;
  remark: string;
}

// 获取验证码
export interface VertifyCodeI{
  imageBase64:string;
  randomCodeFlag:string;
}

export interface ChangeUserInfoParamI {
  name: string;
	nickName: string;
	phone: string;
	eMail: string;
	headProtrait?: string; // 头像
	sex: number;
}

export interface RegisterUserInfoResultI {
	id: number;
	account: string;
	creationTime: string;
	isLocked: boolean;
	deletedTime: string;
//	roles: AddNewRolesResult[];
}

export interface ChangeSelfPasswordParamI {
  oldPassword: string; // 旧密码
	newPasswordConfirm: string; // 新密码确认
	newPassword: string; // 新密码
}

export interface ChangePasswordAdminI {
  id: number;
  password: string;
}

export interface UserInitDataResultI {
  roles: RoleI[];
	powers: BasePowerItemI[];
	menus: MenuItemI[]; // 当前用户拥有的菜单
}