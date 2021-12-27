export const menuFormRules = {
  name: [
    {required: true, message: '请输入名称'}
  ],
  url: [{required: true, message: '请输入路径', trigger: 'blur'}],
  icon: [{required: true, message: '请选择图标', trigger: 'blur'}]
}

export interface MenuFormI {
  parentId: string | null,
  id: string | null,
  name: string,
  icon: string,
  url: string
}