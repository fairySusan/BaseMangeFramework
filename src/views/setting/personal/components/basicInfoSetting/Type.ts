import {ControlEnum} from '@/componentsui/baseForm'
import { ValidateTool } from '@/mixins/ValidateUtil'
export const formControls = [
  {
    key: 'name',
    control: ControlEnum['Input'],
    label: '姓名',
    prop: 'name',
  },
  {
    key: 'nickName',
    control: ControlEnum['Input'],
    label: '别名',
    prop: 'nickName',
  },
  {
    key: 'sex',
    control: ControlEnum['Radio'],
    label: '性别',
    prop: 'sex',
    options: [{
      label: '男',
      value: 0
    },{
      label: '女',
      value: 1
    }]
  },
]

export const rules = {
  name: [
          {required: true, message: '请输入姓名'},
          {validator: (rule:any, value:any, callback: any) => {
            const result = ValidateTool.checkName(value);
            if(result){
              callback();
            }else{
              callback(new Error('真实名字格式不正确，支持中文英文和点‘·’'))
            }
          }}
        ],
  sex: {required: true, message: '请选择性别'},
  phone: [
          {required: true, message: '请输入手机号'},
          {pattern: ValidateTool.PhoneReg, message: '手机号格式不正确'}
        ],
  eMail: [
          {required: true, message: '请输入邮箱'},
          {pattern: ValidateTool.EmailReg, message: '邮箱格式不正确'}
        ]
}