import axios from 'axios'
import mainDomainName from '@/config/http.config'

const _axios = axios.create({
  baseURL: mainDomainName,
  timeout: 3000,
})

_axios.defaults.headers.common['Authorization'] = '';

// 请求拦截器
_axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error);
})

// 响应拦截器
_axios.interceptors.response.use((response) => {
  if (response.data.code !== undefined) {
    return {
      success: response.data.code===0 ? true : false,
      ...response.data
    }
  } else {
    return {
      success: true,
      code: 0,
      data: response.data,
      message: ''
    }
  }
}, (error) => {
  return Promise.reject(error);
});


export default _axios