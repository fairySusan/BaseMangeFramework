export enum SexEnum {
  '男',
  '女'
}

export const userFormRules = {
  account: [
    {required: true, message: '请输入账号', trigger: 'blur'}
  ],
  name: [
    {required: true, message: '请输入姓名', trigger: 'blur'}
  ],
  phone: [
    {required: true, message: '请输入手机号', trigger: 'blur'}
  ],
  jobNumber: [
    {required: true, message: '请输入工号', trigger: 'blur'}
  ],
  eMail: [
    {required: true, message: '请输入邮箱', trigger: 'blur'}
  ],
  sex: [
    {required: true, message: '请选择性别', trigger: 'blur'}
  ],
  roles: [
    {validator: (rule:any, value:number[], callback: Function) => {
      if (value.length > 0) {
        return callback()
      } else {
        return callback(new Error('请选择角色'))
      }
    }, trigger: 'blur'},
    {required: true, message: '请选择角色', trigger: 'blur'}
  ]
}

export interface UserFormI {
  account: string,
  id?: number,
  name: string,
  nickName: string,
  phone: string,
  jobNumber:string,
  eMail: string,
  sex: number,
  roleIds: number[]
}