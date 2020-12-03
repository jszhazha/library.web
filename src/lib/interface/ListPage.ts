import { ImportInstance } from "/@/lib/props/ImportModal"
import { SearchInstance } from "/@/utils/listPage/methods/useSearch"


export interface Instance {
  importInstance?: ImportInstance | null

  searchInstance: SearchInstance | null
}