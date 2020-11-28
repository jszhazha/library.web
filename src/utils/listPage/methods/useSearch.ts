import { Ref } from "vue"
import { PagerQueryData } from "/@/lib/http/axios/types"

interface UseSearch {
  // 重置数据
  onResetData: () => void

  // 展开 收起
  onOpen: () => void
}
interface Parameter {
  queryData: PagerQueryData,
  isOpen?: Ref<boolean>
}

export interface SearchInstance {
  // 获取当前查询数据
  getCurQueryData: () => PagerQueryData

  [prop: string]: unknown
}



export function useSearch({ queryData, isOpen }: Parameter): UseSearch {


  function onResetData() {
    const ignoreData = ['page', 'pageSize', 'sorts']
    for (const key in queryData) {
      !ignoreData.some((value) => value === key) && delete queryData[key]
    }
  }

  function onOpen() {
    isOpen!.value = !isOpen!.value
  }

  return {
    onOpen,
    onResetData,
  }
}