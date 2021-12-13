export interface BaseResponse<T> {
  success: boolean,
  code: number,
  message: string,
  data: T
}

/**
 * 公用分页的字段
 * T是返回的data里面的数据类型
 */
export interface BaseTableResponse<T>{
  success: boolean,
  code: number,
  message: string,
  data: {
    pageIndex: number; // 当前所在页
    pageSize: number; // 每页多少条数据
    totalCount: number; // 总共多少条数据
    pageCount: number; // 总共多少页
    startRecordIndex: number; // 第一条数据索引
    endRecordIndex: number; // 最后一条数据索引
    data: T; // 分页的数据
  }
}