export const menuFormRules = {
  name: [
    {required: true, message: '请输入名称'}
  ],
  url: [{required: true, message: '请输入路径'}],
  icon: [{required: true, message: '请选择图标'}]
}

export interface MenuFormI {
  id: string | null,
  name: string,
  icon: string,
  url: string
}