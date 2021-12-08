import _axios from "@/mixins/HttpUtil";
import { BaseResponse } from "@/mixins/Interface";
import { LoginParamsI, LoginResponseI, VertifyCodeI } from './Type'

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