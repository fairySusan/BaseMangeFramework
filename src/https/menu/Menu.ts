import _axios from "@/mixins/HttpUtil";
import { BaseResponse } from "@/mixins/Interface";
import { MenuItemI,AddMenuParamI, ChangeMenuParamI } from './Type'

/**
 * 获取当前登录用户的菜单列表
 * @param userId 用户id
 */
export const GetCureentUserMenus = (): Promise<BaseResponse<MenuItemI[]>> => {
    return _axios.get('/api/users/menus')
}

/**
 * 获取所有的菜单列表
 */
export const getAllMenuList = ():Promise<BaseResponse<MenuItemI[]>> => {
    return _axios.get('/api/menus')
}

/**
 * 新增菜单
 * @param params 新增菜单所需参数
 */
export const addNewMenu = (params: AddMenuParamI): Promise<BaseResponse<MenuItemI>> => {
    return _axios.post('/api/menus', params)
}

/**
 * 修改菜单内容
 * @param params 修改所需参数
 */
export const changeMenuItem = (params: ChangeMenuParamI): Promise<BaseResponse<MenuItemI>> => {
    return _axios.post('/api/menus/edit', params)
}

/**
 * 删除菜单
 * @param id 删除菜单的id值
 */
export const deleteMenuItem = (id: string): Promise<BaseResponse<string>> => {
    return _axios.post('/api/menus/del?id=' + id,)
}
