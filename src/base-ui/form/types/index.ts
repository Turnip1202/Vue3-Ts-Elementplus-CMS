// 定义传入数据的类型
type IFormType = 'input' | 'password' | 'select' | 'datepicker'
// 定义form表单元素的表现形式
export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
  isHidden?: boolean
}
// 定义表单的表现形式(配置表单的类型)
export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
