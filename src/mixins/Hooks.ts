import { BaseResponse } from '@/mixins/Interface';
import { onMounted, Ref, ref } from "vue"
import { ElMessage, ElLoading  } from 'element-plus'
import { GetRsaPublicKey } from '@/https/login/Login';
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min.js';

// 请求方法类型
type RequestService<R = any, P extends any[] = any> = (...args: P) => Promise<BaseResponse<R>>;

// http请求的钩子， 用于onMounted里需要的请求
export function useRequest<T = any>(requestFun: RequestService<T>, initData: any, params?: any, ) {
  const data: Ref<T> = ref(initData)
  let loading = ref(true)

  const run = async () => {
    const res: BaseResponse<T> = await requestFun(params)
    data.value = res.data
    loading.value = false
  }

  onMounted(() => {
    run()
  })

  return {
    data,
    loading,
    run,
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

export function useFormSubmit<T, P>(submitFun: any, message?: MessageI | false) {
  let loading = ref(false)

  const submit = async (params: P) => {
    loading.value = true

    let l: any = null
    if (showMessage(message, 'loading')) {
      l = ElLoading.service({
        text: message ? (message?.loading || '正在提交') : '正在提交'
      })
    }
    const res: BaseResponse<T> = await submitFun(params)
    l && l.close()
  
    loading.value = false
    if (res.success) {
      if (showMessage(message, 'success')) {
        ElMessage({
          message: message ? (message?.success || '提交成功!') : '提交成功!' ,
          type: 'success',
        })
      }
      return Promise.resolve(res)
    } else {
      if (showMessage(message, 'error')) {
        ElMessage({
          message: message ? (message?.error	 || '提交失败!') : '提交失败!',
          type: 'error',
        })
      }
      return Promise.reject(res.message)
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