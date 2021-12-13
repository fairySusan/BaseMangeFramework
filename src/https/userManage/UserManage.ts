import _axios from "@/mixins/HttpUtil";
import { BaseResponse, BaseTableResponse } from "@/mixins/Interface";
import {GetAllUserParamI, UserManageItemI} from './Type'

/**
 * 分页获取所有用户
*/
export const getAllUsers = (params: GetAllUserParamI): Promise<BaseTableResponse<UserManageItemI[]>> => {
  return _axios.get('/api/users', { params })
}