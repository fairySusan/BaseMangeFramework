import { BaseResponse } from '@/mixins/Interface';
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min.js';
import {GetRsaPublicKey} from '@/https/login/Login'
import {LoginParamsI} from '@/https/login/Type'
import { ref } from 'vue';

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

export function useLogin (params: LoginParamsI) {
  
}

