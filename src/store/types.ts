import { ILoginState } from './login/type'
import { ISystemState } from './main/system/types'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}
// 也可以使用类型继承
// 但使用联合类型可以增强两种类型的独立性

export type IStoreType = IRootState & IRootWithModule
