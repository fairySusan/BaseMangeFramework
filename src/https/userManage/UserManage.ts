import _axios from "@/mixins/HttpUtil";
import { BaseResponse, BaseTableResponse } from "@/mixins/Interface";
import {GetAllUserParamI, UserManageItemI, ModifyUserInfoParamsI, AddUserInfoParamsI, ChangeUserLockedParamI} from './Type'

/**
 * 分页获取所有用户
*/
export const getAllUsers = (params: GetAllUserParamI): Promise<BaseResponse<BaseTableResponse<UserManageItemI[]>>> => {
  return _axios.get('/api/users', { params })
}

/**
* 修改用户信息
*/
export const changeUserInfo = (params: ModifyUserInfoParamsI): Promise<BaseResponse<boolean>> => {
  return _axios.post('/api/users/edit', params)
}

/**
 * 添加用户
 */
export const addUserInfo = (params: AddUserInfoParamsI): Promise<BaseResponse<boolean>> => {
  return _axios.post('/api/users', params)
}

/**
 * 删除用户
 */
export const deleteUserInfo = (id: number): Promise<BaseResponse<string>> => {
  return _axios.post('/api/users/' + id)
}

/**
* 更改用户是否锁定
*/
export const changeUserIsLocked = (params: ChangeUserLockedParamI): Promise<BaseResponse<string>> => {
  return _axios.post('/api/users/setislocked?id=' + params.id, {isLocked: params.isLocked})
}