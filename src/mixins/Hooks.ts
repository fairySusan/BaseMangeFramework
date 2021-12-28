import { useStore } from '@/store';
import { BaseTableResponse, BaseResponse,initTableData} from './Interface';
import { onMounted, Ref, ref } from "vue"
import { ElMessage  } from 'element-plus'
import { GetRsaPublicKey } from '@/https/login/Login';
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min.js';
import {MessageLoading} from '@/mixins/UIUtil'
import ToolUtil from './ToolUtil';


// 请求方法类型
type RequestService<R = any, P extends any[] = any> = (...args: P) => Promise<BaseResponse<R>>;

// http请求的钩子， 用于onMounted里需要的请求
export function useRequest<T = any>(requestFun: RequestService<T>, initData: any, params?: any, immediate = true) {
  const data: Ref<T> = ref(initData)
  let loading = ref(false)

  const run = async () => {
    loading.value = true
    try {
      const res: BaseResponse<T> = await requestFun(params)
      data.value = (res as BaseResponse<T>).data
      loading.value = false
    } catch(e: any) {
      data.value = initData
      loading.value = false
    }
  }


  onMounted(() => {
    immediate && run()
  })

  return {
    data,
    loading,
    run,
  }
}

/**
 * 表格请求的钩子
 */
// 请求方法类型
type RequestTableService<R = any, P extends any[] = any> = (...args: P) => Promise<BaseResponse<BaseTableResponse<R>>>;

export function useTableRequest<T = any>(requestFun: RequestTableService<T>, params?: any, ) {
  const store = useStore()
  const data: Ref<BaseTableResponse<T>> = ref(initTableData)
  let loading = ref(false)
  let pageSize = ref(0)

  const getList = async () => {
    loading.value = true
    params.PageSize = pageSize.value
    try {
      const res: BaseResponse<BaseTableResponse<T>> = await requestFun(params)
      data.value = res.data
      loading.value = false
    } catch(e:any) {
      data.value = initTableData
      loading.value = false
    }
  }

  
  const onCurrentChange = (pageIndex: number) => {
    params.PageIndex = pageIndex
    getList()
  }

  const onSizeChange = (_pageSize:number) => {
    pageSize.value = _pageSize
    getList()
  }

  onMounted(() => {
    pageSize.value = store.state.common.defaultPageSize
    getList()
  })

  return {
    data,
    loading,
    getList,
    onCurrentChange,
    onSizeChange
  }
}

/*
*表单提交的钩子 封装提交按钮的防抖、提交的loading提示、提交成功/提交失败的提示
*@param submitFun 提交的方法名
*@param params 提交的参数
*@param message 提交过程中的提示 提交成功 提交失败的提示 传false不显示提示
*/

interface MessageI {
  success?: string | false,
  error	?: string | false,
  loading?: string | false
}

//T：接口返回数据的类型， P：提交的参数的类型
export function useFormSubmit<T, P>(submitFun: any, message?: MessageI | false) {
  let loading = ref(false)

  const submit = async (params: P) => {
    loading.value = true
    const l = MessageLoading({
      message: '正在提交...',
    })
    try {
      const res: BaseResponse<T> = await submitFun(params)
      if (showMessage(message, 'success')) {
        ElMessage({
          message: message ? (message?.success || '提交成功!') : '提交成功!' ,
          type: 'success',
        })
      }
      loading.value = false
      return Promise.resolve(res)
    } catch(e: any) {
      if (showMessage(message, 'error')) {
        ElMessage({
          message: message ? (message?.error	 || '提交失败!') : '提交失败!',
          type: 'error',
        })
      }
      loading.value = false
      l.close()
      return Promise.reject(e.message)
    }
  }
 

  return {
    loading,
    submit
  }
}

/*
*一般操作的钩子: 比如开启，关闭。 封装提交按钮的防抖、提交的loading提示、操作成功/操作失败的提示
*@param submitFun 操作的方法名
*@param params 操作的参数
*@param message 操作过程中的提示 操作成功 操作失败的提示 传false不显示提示
*/
//T：接口返回数据的类型， P：提交的参数的类型
export function useOptionRequest<T, P>(submitFun: any, message?: MessageI | false) {
  let loading = ref(false)

  const submit = async (params: P) => {
    loading.value = true
    try {
      const res: BaseResponse<T> = await submitFun(params)
      if (showMessage(message, 'success')) {
        ElMessage({
          message: message ? (message?.success || '操作成功!') : '操作成功!' ,
          type: 'success',
        })
      }
      loading.value = false
      return Promise.resolve(res)
    } catch(e: any) {
      if (showMessage(message, 'error')) {
        ElMessage({
          message: message ? (message?.error	 || '操作失败!') : '操作失败!',
          type: 'error',
        })
      }
      loading.value = false
      return Promise.reject(e.message)
    }
  }
 

  return {
    loading,
    submit
  }
}


function showMessage (message: MessageI | false | undefined, type: string) {
  if (message === undefined) {
    return true
  }
  if (message === false) {
    return false
  }

  if (message[type] === undefined) {
    return true
  }

  if (message[type] === false) {
    return false
  }

  return true
}

/* 
下载的hook
*@param requestFun 下载文件的请求方法
*@param params 请求的参数
*@param fileName 下载的文件名 eg: 日志.xslx
*/
export function useDownLoad<P>(requestFun:any, params?: P, fileName?:string) {
  const loading = ref(false)
  const run = async () => {
    loading.value = true
    const l = MessageLoading({
      message: '正在下载...',
    })
    try {
      const res: BaseResponse<Blob> = await requestFun(params)
      ToolUtil.AtagDownLoadHandle(res.data, fileName, )
      ElMessage({
        message: '下载成功！',
        type: 'success',
      })
    }catch(e) {
      console.log(e)
    }
    l.close()
    loading.value = false
  }

  return {
    run,
    loading
  }
}

// 加密hook
export async function useEncrypt(password: string) {
  const encryptPassword = ref('')
  const res: BaseResponse<string> = await GetRsaPublicKey()
  const jsEncryptTarget = new JSEncrypt();
  jsEncryptTarget.setPublicKey(res.data);
  encryptPassword.value = jsEncryptTarget.encrypt(password);

  return {
    encryptPassword
  }
}