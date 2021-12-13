export enum SexEnum {
  '男',
  '女'
}

export const userFormRules = {
  account: [
    {required: true, message: '请输入账户名'}
  ],
  phone: [
    {required: true, message: '请输入手机号'}
  ],
  jobNumber: [
    {required: true, message: '请输入工号'}
  ],
  eMail: [
    {required: true, message: '请输入邮箱'}
  ],
  sex: [
    {required: true, message: '请选择性别'}
  ],
  roles: [
    {requied: true, message: '请选择角色'}
  ]
}