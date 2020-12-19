import { ImportInstance } from "/@/lib/props/ImportModal"
import { SearchInstance } from "/@/lib/idata/data-list/methods/useSearch"


interface ListInstance<T> {
  setDataSource: (data: T[]) => void
  [prop: string]: unknown
}

export interface Instance<T> {
  importInstance?: ImportInstance | null

  searchInstance: SearchInstance | null

  listInstance: ListInstance<T> | null
}