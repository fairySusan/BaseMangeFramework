import _axios from "@/mixins/HttpUtil";
import { BaseResponse } from "@/mixins/Interface";
import { MenuItemI } from './Type'

/**
 * 获取当前登录用户的菜单列表
 * @param userId 用户id
 */
export const GetCureentUserMenus = (): Promise<BaseResponse<MenuItemI[]>> => {
    return _axios.get('/api/users/menus')
}