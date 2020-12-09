import type { Ref } from 'vue'
import type { CreateStorage } from "/@/utils/storage/Storage"
import type { FromRules } from '/@/lib/interface/From'
import { unref, onBeforeUnmount, onMounted, watch, reactive, toRef } from "vue"
import { provideDataPage } from './methods/useDepend'
import { checkCacheData, cacheData } from './methods/cacheData'
import { checkDataRouter, QueryRoute } from './methods/dataRouter'
import { createStorage } from "/@/utils/storage/"
import { PageMode } from "/@/utils/helper/breadcrumb"
import { useToast } from "vue-toastification"
import { useForm } from "@ant-design-vue/use"
import { useRouter } from "vue-router"
import { assign } from 'lodash-es'


import './index.less'


interface DataPageMix {

  // 页面底部方法
  onDataMethods: {
    // 关闭触发
    onClosePage: () => void;

    // 重置触发
    onRestPage: () => void;

    // 编辑触发
    onEditpage: () => void
  }
  // 页面信息
  pageInfo: PageInfo

  // 检测消息
  validateInfos: unknown
}

interface DataPageMixParameter<T> {
  // 数据
  dataItem: T;

  // 规则
  rules: FromRules
}

// 页面信息
interface PageInfo {
  // 模式
  mode: number

  // 只能读取
  readonly: boolean

  // 参数信息
  query: QueryRoute
}


// 页面为新建模式  初始化
function newModeInit<T>(dataItem: T, mode: Ref<number>, name: string, storage: CreateStorage) {
  // 页面刷新前处理
  function updateHandler() {
    if (mode.value === PageMode.new) {
      cacheData(name, storage, dataItem)
    }
  }
  // 查看缓存中是否有数据
  checkCacheData<T>(name, storage, (data: T) => (console.log(data), assign(dataItem, data)))

  /**
   * 刷新页面 不会走生命周期 , 同时监听刷新和卸载时 进行缓存数据
   */
  onMounted(() => {
    // 监听刷新
    window.addEventListener('beforeunload', updateHandler)
  })
  onBeforeUnmount(() => {
    // 
    updateHandler()
    // 停止监听刷新
    window.removeEventListener('beforeunload', updateHandler)

  })
}




export function dataPageMix<T>({ dataItem, rules }: DataPageMixParameter<T>): DataPageMix {
  // 获取方法 当前路由
  const { back, replace, currentRoute } = useRouter()

  // 获取当前页面 查询条件
  const { query, name } = unref(currentRoute)

  // 获取 对话框 实例
  const toast = useToast()
  const { validateInfos, resetFields } = useForm(dataItem, rules)
  const pageInfo = reactive<PageInfo>({
    mode: checkDataRouter((query as unknown) as QueryRoute, name as string),
    readonly: false,
    query: (query as unknown) as QueryRoute
  })


  // 设置缓存
  const storage = createStorage(sessionStorage)



  // 页面为查看模式, 输入框 设置为只读模式
  if (pageInfo.mode === PageMode.view) {
    pageInfo.readonly = true
  }

  // 页面为新建模式 
  if (pageInfo.mode === PageMode.new) {
    newModeInit<T>(dataItem, toRef(pageInfo, 'mode'), name as string, storage)
  }

  /**
   * 页面点击关闭触发函数
   */
  const onClosePage = () => back()

  /**
   * 监听路由变化 关闭对话框
   */
  watch(() => currentRoute.value, () => {
    toast.clear()
  })

  /**
   * 页面点击重置触发的函数
   */
  const onRestPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.keys(dataItem).forEach((key) => (dataItem as any)[key] = '')
    resetFields()
  }

  /**
   * 页面点击编辑触发的函数
   */
  const onEditpage = () => {
    pageInfo.mode = PageMode.edit
    pageInfo.readonly = false

    replace({ query: { mode: PageMode[PageMode.edit], id: pageInfo.query.id } })
  }

  //  push({ query: { mode: PageMode[PageMode.edit] } })

  /**
   * 注入依赖
   */
  provideDataPage({
    readonly: toRef(pageInfo, 'readonly')
  })







  // console.log(dataItem)
  // storage.set(name as string, dataItem)

  return { onDataMethods: { onClosePage, onRestPage, onEditpage }, pageInfo, validateInfos }
}
