import type { Ref } from 'vue';
import type { CreateStorage } from '/@/utils/storage/Storage'
import { unref, ref, onBeforeUnmount } from 'vue'
import { useRouter } from "vue-router";
import { parsePageModeFromString, PageMode } from "/@/utils/helper/breadcrumb";
import { useMessage } from '/@/hooks/web/useMessage'
import { isBoolean, isString } from "/@/utils/is";
import { createStorage } from '/@/utils/storage/'

interface DataPageMix {
  // 页面模式
  mode: Ref<number>

  // 关闭触发
  onClosePage: () => void

  //设置输入框为只读
  readonly: Ref<boolean>
}

interface CheckDataRouter {
  id: string

  mode: string
}


// 检查路由是否合法 并返回页面模式
function checkDataRouter(query: CheckDataRouter): number {
  const { id, mode } = query
  const pageMode = parsePageModeFromString(mode);
  const { notification } = useMessage()
  let description: string | boolean = false
  if (isBoolean(pageMode)) {
    description = '记录的 MODE 值不合法, 请修改后再试'
  } else if (pageMode.mode !== PageMode.new && !isString(id)) {
    description = '记录的 ID 值不合法, 请修改后再试'
  }
  if (isString(description)) {
    notification.error({ message: '错误', description })
  }
  return isBoolean(pageMode) ? PageMode.view : pageMode.mode
}

// 新建状态 检查缓存中是否有数据
function checkCacheData(name: string, storage: CreateStorage) {
  const data = storage.get(name)
  console.log(data)
}


export function dataPageMix<T>(dataItem: T): DataPageMix {
  const { back, currentRoute } = useRouter()
  const { query, name } = unref(currentRoute)
  // 设置缓存
  const storage = createStorage(localStorage)
  // 页面模式
  const mode = ref<number>(checkDataRouter((query as unknown) as CheckDataRouter))
  // 设置输入框为只读
  const readonly = ref<boolean>(false)
  if (mode.value === PageMode.view) {
    readonly.value = true
  }
  if (mode.value === PageMode.new) {
    checkCacheData(name as string, storage)
  }
  console.log(dataItem)
  /**
   * 页面关闭触发函数
   */
  const onClosePage = () => back()

  //  push({ query: { mode: PageMode[PageMode.edit] } })

  onBeforeUnmount(() => {
    // createStorage(localStorage).set(name as string, dataItem)
  })



  return { onClosePage, mode, readonly }
}


