import {GetRolesParamsI, RolesItemI, ModifyRolesParamI, AddRolesParamI, AddRoleMenuPowerParamsI, ChangeIsLockedParamI} from './Type'
import _axios from "@/mixins/HttpUtil";
import { BaseResponse } from "@/mixins/Interface";

// 获取所有的角色
export const getAllRolesList = (params?: GetRolesParamsI): Promise<BaseResponse<RolesItemI[]>> => {
  return _axios.get('/api/roles', {params})
}

/**
 * 添加新角色
 */
export const addNewRole = (params: AddRolesParamI): Promise<BaseResponse<boolean>> => {
  return _axios.post('/api/roles', params)
}

/**
 * 修改角色
 */
export const changeRoles = (params: ModifyRolesParamI): Promise<BaseResponse<boolean>> => {
  return _axios.post('/api/roles/edit', params)
}

/**
 * 删除角色
 */
export const deleteRoles = (id: number): Promise<BaseResponse<string>> => {
  return _axios.post('/api/roles/delete?id=' + id)
}

/**
 * 变更指定角色是否锁定的状态
 * @param params 
 */
 export const changeRolesLockedStatus = (params: ChangeIsLockedParamI) => {
  return _axios.post('/api/roles/setislocked?id='+params.id, {
    isLocked:params.IsLocked
  })
}

/**
 * 保存指定角色权限
 * @param roleId 角色id
 * @param limitIdArr 当前选中的权限id数组
 */
 export const saveCurrentRolePower = (params:AddRoleMenuPowerParamsI):Promise<BaseResponse<string>> => {
  return _axios.post('/api/roles/saverolepower?id='+params.roleId, params.menupowerArr)
}