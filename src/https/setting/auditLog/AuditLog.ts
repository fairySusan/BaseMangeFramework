import _axios from "@/mixins/HttpUtil";
import { BaseResponse, BaseTableResponse } from "@/mixins/Interface";
import { AuditListItemI, AuditParamI, AuditLogDetailI} from './Type'
/** 
 * 获取所有的日志记录
 * @param params
 */
export const getAuditLogList = (params: AuditParamI): Promise<BaseResponse<BaseTableResponse<AuditListItemI[]>>> => {
  return _axios.get('/api/auditloggings', {params})
}

/** 
* 根据id获取审计日志数据
* @param guid 查询所需id
*/
export const getAuditLogInfo = (params:{guid: string}): Promise<BaseResponse<AuditLogDetailI>> => {
    return _axios.get('/api/auditloggings/'+ params.guid)
}