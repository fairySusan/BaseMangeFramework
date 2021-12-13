import { ToolUtil } from '@/mixins/ToolUtil';
import { UserInfoHandler } from "@/mixins/UserUtil";

const tool = new ToolUtil()

export const rules = {
  oldPassword: [
    {required: true, message: '请输入旧密码'}
  ],
  newPassword: [
    {required: true, message: '请输入新密码'},
    {validator: validatePassword, }
  ],
  newPasswordConfirm: [
    {required: true, message: '请确认新密码'},
    {validator: (rule:any, value:string, callback:Function) => {

    }}
  ]
}

export function validatePassword(rule:any, value:string, callback:Function){
  const pwdRank = tool.calcPwdRank(value)
  if(value === ''){
      callback(new Error('未填写密码'));
  }else if(value.length < 8 || value.length > 20){
      callback(new Error('密码长度在8到20位'));
  }else if (value.toLowerCase().indexOf('hx')!=-1) {
      callback(new Error('不能使用 hx 作为密码'));
  } else if (value.toLowerCase().indexOf(UserInfoHandler.getUserInfo()?.account as string) !== -1) {
      callback(new Error('不能使用姓名拼音作为密码'));
  } else if (tool.isKeyBoardContinuousChar(value)) {
      callback(new Error("键盘连续字符不能超过 3 个"))
  } else if (pwdRank !== 3) {
      callback(new Error("包含数字、小写字母、大写字母、特殊符号 4 类中至少3类"))
  } else {
      callback()
  }
}