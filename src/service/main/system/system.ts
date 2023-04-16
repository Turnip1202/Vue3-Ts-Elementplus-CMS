import tkRequest from '@/service'
import { IDataType } from '@/service/types'
export function getPageListData(url: string, queryInfo: any) {
  return tkRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
// url:users/id
export function deletePageData(url: string) {
  return tkRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return tkRequest.post<IDataType>({
    url: url,
    data: newData
  })
}
export function editPageData(url: string, editData: any) {
  return tkRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
