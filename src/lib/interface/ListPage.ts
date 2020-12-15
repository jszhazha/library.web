import { ImportInstance } from "/@/lib/props/ImportModal"
import { SearchInstance } from "/@/lib/idata/data-list/methods/useSearch"
export interface Instance {
  importInstance?: ImportInstance | null

  searchInstance: SearchInstance | null
}