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