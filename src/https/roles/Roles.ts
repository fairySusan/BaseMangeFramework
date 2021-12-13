import {GetRolesParamsI, RolesItemI} from './Type'
import _axios from "@/mixins/HttpUtil";
import { BaseResponse } from "@/mixins/Interface";

// 获取所有的角色
export const GetAllRolesList = (params?: GetRolesParamsI): Promise<BaseResponse<RolesItemI[]>> => {
  return _axios.get('/api/roles', {params})
}