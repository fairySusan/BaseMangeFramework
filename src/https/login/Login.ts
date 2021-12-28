import _axios from "@/mixins/HttpUtil";
import { BaseResponse } from "@/mixins/Interface";
import { ChangePasswordAdminI, ChangeSelfPasswordParamI, ChangeUserInfoParamI, LoginParamsI, LoginResponseI, RegisterUserInfoResultI, UserInitDataResultI, VertifyCodeI } from './Type'

/**
 * 登录
 * @param params 
 * @returns 
 */
export const Login = (params: LoginParamsI):Promise<BaseResponse<LoginResponseI>> => {
  return _axios.post('/api/account/login', params)
}

/**
 * 获取验证码图片
 * @param params
 */
export const GetVertifyCode = (): Promise<BaseResponse<VertifyCodeI>> => {
  return _axios.get('/api/images/getverifycodeimg')
}

/**
 * 获取Rsa的公钥
 */
export const GetRsaPublicKey = (): Promise<BaseResponse<string>> => {
  return _axios.get('/api/account/rsa/publickey')
}

 /**
 * 用户修改自己的个人信息
 * @param params 
 */
export const ChangeUserInfo = (params: ChangeUserInfoParamI): Promise<BaseResponse<RegisterUserInfoResultI>> => {
  return _axios.post('/api/account/modifyinfo', params)
}

/**
 * 管理员重置用户密码
 */
export const ChangeUserPasswordAdmin = (params: ChangePasswordAdminI): Promise<BaseResponse<string>> => {
  return _axios.post('/api/account/passwordreset', params)
}

/**
 * 用户修改自己的密码
 */
export const ChangePasswordByUser = (params: ChangeSelfPasswordParamI): Promise<BaseResponse<string>> => {
  return _axios.post('/api/account/modifypassword', params)
}

/**
 * 初始化用户数据
 */
 export const InitUserData = (): Promise<BaseResponse<UserInitDataResultI>> => {
  return _axios.get('/api/users/initdata')
}

 //导出服务、订单、值机
export const ExportOrder = (params:  {PageIndex: number;PageSize: number,ReportType:0,  SortField: 'State,StartDate'
SortType: 'asc,asc'}): Promise<Blob> => {
  return _axios.get(`/api/orders/download`, {params, responseType: 'blob'})
}