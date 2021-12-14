import { TokenHandler } from './TokenUtil';
import axios, { AxiosRequestConfig } from 'axios'
import mainDomainName from '@/config/http.config'
import { ElMessage } from 'element-plus';

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
  config.headers.common['Authorization'] = TokenHandler.getToken();
  return config
}, (error) => {
  return Promise.reject(error);
})

// 响应拦截器
_axios.interceptors.response.use((response) => {
  // 无感刷新token
  const {config} = response
  if (response.status === 401) {
    if (requestFunctionQueue.length === 0) {
      TokenHandler.getNewAccessToken().then(() => {
        requestFunctionQueue.forEach(c => c());
      }).finally(() => {
        requestFunctionQueue = []
      })
    }
    requestFunctionQueue.push(() => _axios.request(config))
  } else if (response.status === 200) {
    if (response.data.code === 0) {
      return {
        success: true,
        ...response.data
      }
    } else if (response.data.code === 1) {
      ElMessage({
        message: response.data.message,
        grouping: true,
        type: 'error',
      })
      return {
        success: false,
        ...response.data
      }
    } else if (response.data.code === undefined) {
      return {
        success: true,
        code: 0,
        data: response.data,
        message: ''
      }
    }
  } 
  
}, (error) => {
  return Promise.reject(error);
});


export default _axios