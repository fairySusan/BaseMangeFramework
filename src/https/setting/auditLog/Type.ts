export interface AuditParamI {
  HttpMethod?:string; // 请求方法
  ApplicationName?:string; // 应用名称
  UserId?:string;
  StartTime?:string;
  EndTime?:string;
  Keyword?:string;
  PageIndex:number;
  PageSize:number;
  SortField?:string; // 表格排序的字段
  SortType?:string; // 排序类型  ascend，descend只有这
}

export interface AuditListItemI {
  id: string;
  applicationName: string; // 应用名称
  userId: string; // 用户id
  userName: string; // 用户名
  executionTime: string; // 审计时间
  executionDuration: number; // 执行时长
  clientIpAddress: string; // 客户端ip地址
  correlationId: string; 
  browserInfo: string; // 客户端浏览器信息
  httpMethod: string; // 请求类型
  url: string; // 发起请求的url
  exceptions: string; // 异常信息
  comments: string; // 自定义信息
  httpStatusCode: number; // http请求响应码
  actions: AuditLogAction[]; // 审计动作
  entityChanges: AuditEntityChange[]; // 数据审计信息
}

/**
 * 审计动作
 */
 interface AuditLogAction {
  serviceName: string; // 服务名称
  methodName: string; // 方法名
  parameters: string; // 传递给方法的参数的JSON格文本
  executionTime: string; // 执行的时间
  executionDuration: number; // 执行的时长
}

/**
* 数据审计信息
*/
interface AuditEntityChange {
  changeTime: string; // 变更时间
  changeType: number; // 变更类型
  entityId: string; 
  entityTypeFullName: string; // 实体类型
  propertys: AuditProperty[];
}

/**
 * 实体属性变更信息
 */
 interface AuditProperty {
  newValue: string; // 变更值
  originalValue: string; // 原始值
  propertyName: string; // 属性名称
  propertyTypeFullName: string;
}

export interface AuditLogDetailI {
  id: string;
  applicationName: string; // 应用名称
  userId: string; // 用户id
  userName: string; // 用户名
  executionTime: string; // 审计时间
  executionDuration: number; // 执行时长
  clientIpAddress: string; // 客户端ip地址
  correlationId: string; 
  browserInfo: string; // 客户端浏览器信息
  httpMethod: string; // 请求类型
  url: string; // 发起请求的url
  exceptions: string; // 异常信息
  comments: string; // 自定义信息
  httpStatusCode: number; // http请求响应码
  actions: AuditLogAction[]; // 审计动作
  entityChanges: AuditEntityChange[]; // 数据审计信息
}