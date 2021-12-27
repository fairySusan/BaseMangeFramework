import _axios from "@/mixins/HttpUtil";
import { BaseResponse } from "@/mixins/Interface";
import {BasePowerItemI, ModifyPowerItemI, AllPowersResultI} from './Type'

 /**
 * 获取所有的接口权限
 */
export const  getAllFunctionPower = ():Promise<BaseResponse<AllPowersResultI[]>> => {
  return _axios.get('/api/functions')
}


// 权限管理模块 - 获取指定菜单权限
export const getCurMenuPowerList = (params:{menuid:string}):Promise<BaseResponse<BasePowerItemI[]>> => {
  return _axios.get('/api/menus/'+ params.menuid + '/powers')
}

// 权限管理模块 - 新增权限
export const addCurMenuPower = (params:ModifyPowerItemI):Promise<BaseResponse<BasePowerItemI[]>> => {
  return _axios.post('/api/powers', params)
}

// 权限管理模块 - 修改权限
export const changeCurMenuPower = (params:ModifyPowerItemI):Promise<BaseResponse<BasePowerItemI[]>> => {
  return _axios.post('/api/powers/edit', params)
}

/**
 * 权限管理模块 - 删除权限
 * @param powerid 权限id
 */
export const deletePowerList = (powerid:string):Promise<BaseResponse<boolean>> => {
  return _axios.post('/api/powers/del?id='+powerid)
}