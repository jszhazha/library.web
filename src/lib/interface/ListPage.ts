import { ImportInstance } from "/@/lib/props/ImportModal"
import { SearchInstance } from "/@/lib/idata/data-list/methods/useSearch"
import { GetPagination } from "/@/hooks/web/usePagination"


interface ListInstance<T> {
  setDataSource: (data: T[], total: number) => void,

  // 设置页码
  setPagination: (page?: number, size?: number) => void

  // 获取页码
  getPagination: () => GetPagination

  [prop: string]: unknown
}

export interface Instance<T> {
  importInstance?: ImportInstance | null

  searchInstance: SearchInstance | null

  listInstance: ListInstance<T> | null
}