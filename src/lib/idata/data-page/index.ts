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
    // 重置触发
    onRestPage: () => void

    // 编辑触发
    onEditPage: () => void

    // 保存数据
    onSavePage: () => void
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
  // 模式 出错 -1 查看 0 编辑 1 新增 2
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

/**
 * 数据初始化
 */
function dataItemInit<T>(dataItem: T, ruleKeys: string[]) {
  ruleKeys.forEach(key => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (dataItem as any)[key] = ''
  })
}



export function dataPageMix<T>({ dataItem, rules }: DataPageMixParameter<T>): DataPageMix {
  // 获取方法 当前路由
  const { replace, currentRoute } = useRouter()

  // 获取当前页面 查询条件
  const { query, name } = unref(currentRoute)

  // 获取 对话框 实例
  const toast = useToast()

  // 规则 key 数组
  const ruleKeys: string[] = Object.keys(rules)

  // 数据初始化
  dataItemInit<T>(dataItem, ruleKeys)

  // 获取 ant 表单规则 
  const { validateInfos, resetFields, validate } = useForm(dataItem, rules)

  // 页面模式
  const mode = checkDataRouter((query as unknown) as QueryRoute, name as string)

  // 获取页面信息
  const pageInfo = reactive<PageInfo>({
    mode: mode,
    readonly: mode === -1 ? true : false,
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
   * 监听路由变化 关闭对话框
   */
  watch(() => currentRoute.value, () => {
    toast.clear()
  })

  /**
   * 页面点击重置触发的函数
   */
  const onRestPage = () => {
    Object.keys(dataItem).forEach(key => {
      if (!ruleKeys.includes(key)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (dataItem as any)[key] = ''
      }
    })

    resetFields()
  }

  /**
   * 页面点击编辑触发的函数
   */
  const onEditPage = () => {
    pageInfo.mode = PageMode.edit
    pageInfo.readonly = false
    replace({ query: { mode: PageMode[PageMode.edit], id: pageInfo.query.id } })
  }

  /**
   * 页面点击保存触发的函数
   */
  const onSavePage = async () => {
    try {
      await validate()
    } catch (err) {
    }
  }

  //  push({ query: { mode: PageMode[PageMode.edit] } })

  /**
   * 注入依赖
   */
  provideDataPage({
    readonly: toRef(pageInfo, 'readonly')
  })



  // 数据方法
  const onDataMethods = {
    onRestPage,
    onEditPage,
    onSavePage
  }


  // console.log(dataItem)
  // storage.set(name as string, dataItem)

  return { onDataMethods, pageInfo, validateInfos }
}
