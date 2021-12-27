import _axios from "@/mixins/HttpUtil";
import { BaseResponse, BaseTableResponse } from "@/mixins/Interface";
import {SystemLogParamsI,SystemLogItemI} from './Type'

/** 
 * 获取所有的日志记录
 * @param params
 */
export const getSystemLogList = (params?: SystemLogParamsI): Promise<BaseResponse<BaseTableResponse<SystemLogItemI[]>>> => {
  return _axios.get('/api/logs', {params})
}

/** 
* 删除指定的日志记录
* @param idArr 日志id组成的数组
*/
export const deleteSystemLog = (params:{idArr:number[]}): Promise<BaseResponse<boolean>> => {
  return _axios.post('/api/logs/delete', params.idArr)
}

/** 
* 清除所有的日志记录
*/
export const clearSystemLog = (): Promise<BaseResponse<boolean>> => {
  return _axios.post('/api/logs/clear')
}