import ToolUtil from '@/mixins/ToolUtil';
import { TokenHandler } from './TokenUtil';
import axios, { AxiosRequestConfig } from 'axios'
import mainDomainName from '@/config/http.config'
import { ElMessage } from 'element-plus';
import { BaseResponse } from './Interface';
import { JsonWebTokenI } from '@/https/login/Type';

let requestFunctionQueue:Function[] = []; // 当前要排队执行的函数队列列表

const _axios = axios.create({
  baseURL: mainDomainName,
  timeout: 3000,
  headers: {},
  validateStatus: function (status) {
    return status >= 200 && status < 500; 
  },
})

// 请求拦截器
_axios.interceptors.request.use((config: any) => {
  config.headers['Authorization'] = TokenHandler.getToken();
  return config
}, (error) => {
  return Promise.reject(error);
})

// 响应拦截器
_axios.interceptors.response.use((response) => {
  if (response.status === 401) {
    // 将401的请求在刷新token后重新再次请求-无感刷新token
    freshRequestQueue(response.config)
    return Promise.reject({
      success: false,
      code: 1,
      message: 'token过期'
    })
  } else if (response.status === 200) {
    if (response.data.code === 0) {
      return Promise.resolve({
        success: true,
        ...response.data
      })
    } else if (response.data.code === 1) {
      ElMessage({
        message: response.data.message,
        grouping: true,
        type: 'error',
      })
      return Promise.reject({
        success: false,
        ...response.data
      })
    } else if (response.data.code === undefined) {
      return Promise.resolve({
        success: true,
        code: 0,
        data: response.data,
        message: ''
      })
    }
  } 
  
}, (error) => {
  return Promise.reject(error);
});

function freshRequestQueue (config: any) {
  // 当requestFunctionQueue的length === 0 说明是刚初始化或者刚清过一次队列，此时再开始一次新的事件循环
  if (requestFunctionQueue.length === 0) {
    ToolUtil.deferCall(() => {
      TokenHandler.getNewAccessToken().then((res: BaseResponse<JsonWebTokenI>) => {
        let request
        console.log('异步执行', requestFunctionQueue)
        while(request = requestFunctionQueue.shift()) {
          request()
        }
      })
    })
  }
  requestFunctionQueue.push(() => _axios.request(config))
  console.log('同步执行', requestFunctionQueue)
}


export default _axios