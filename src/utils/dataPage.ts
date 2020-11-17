import type { Ref } from 'vue';
import type { CreateStorage } from '/@/utils/storage/Storage'
import { unref, ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { parsePageModeFromString, PageMode } from "/@/utils/helper/breadcrumb";
import { useMessage } from '/@/hooks/web/useMessage'
import { isBoolean, isString, isStrNum } from "/@/utils/is";
import { createStorage } from '/@/utils/storage/'



const { notification } = useMessage()

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
  // 解析路由
  const pageMode = parsePageModeFromString(mode);
  // 设置报错内容
  let description: string | boolean = false
  // 判断 mode , id 是否正确
  if (isBoolean(pageMode)) {
    description = '记录的 MODE 值不合法, 请修改后再次尝试'
  } else if (pageMode.mode !== PageMode.new && !isStrNum(id)) {
    description = '记录的 ID 值不合法, 请修改后再次尝试'
  }
  // 判断 description 类型 字符串 -> 弹出提示框
  if (isString(description)) {
    onMounted(() => notification.error({ message: '错误', description: description as string }))
  }
  // 输出结果
  return isBoolean(pageMode) ? PageMode.view : pageMode.mode
}

// 新建状态 检查缓存中是否有数据
function checkCacheData(name: string, storage: CreateStorage) {
  const data = storage.get(name)
  console.log(data)
  notification.info({
    message: '测试',
    description: (h) => h('div','3423')
  })
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

  // 页面为查看模式, 输入框 设置为只读模式
  if (mode.value === PageMode.view) {
    readonly.value = true
  }

  // 查看缓存中是否有数据
  if (mode.value === PageMode.new) {
    checkCacheData(name as string, storage)
  }
  console.log(dataItem)
  /**
   * 页面关闭触发函数
   */
  const onClosePage = () => back()

  //  push({ query: { mode: PageMode[PageMode.edit] } })

  // onBeforeUnmount(() => {
  //   // createStorage(localStorage).set(name as string, dataItem)
  // })



  return { onClosePage, mode, readonly }
}


