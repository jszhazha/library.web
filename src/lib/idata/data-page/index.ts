import type { Ref } from 'vue'
import type { CreateStorage } from "/@/utils/storage/Storage"
import type { FromRules } from '/@/lib/interface/From'
import { unref, onBeforeUnmount, onMounted, watch, reactive, toRef, ref } from "vue"
import { provideDataPage } from './methods/useDepend'
import { checkCacheData, cacheData } from './methods/cacheData'
import { checkDataRouter, QueryRoute } from './methods/dataRouter'
import { createStorage } from "/@/utils/storage/"
import { PageMode } from "/@/utils/helper/breadcrumb"
import { useForm } from "@ant-design-vue/use"
import { useRouter } from "vue-router"
import { assign, cloneDeep, isEqual } from 'lodash-es'
import useToast from "/@/components/Toast"


import './index.less'
import { isUnDef } from '/@/utils/is'


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

  // 保存加载
  loading: Ref<boolean>
}

interface DataPageMixParameter<T> {
  // 数据
  dataItem: T

  // 规则
  rules: FromRules

  // 请求服务器方法
  onServerMethods: {
    // 新增数据
    onNewData: () => Promise<void>

    // 保存数据
    onSaveData: (id: number) => Promise<void>

    // 通过ID加载数据
    onLoadDataById: (id: number) => Promise<void>
  }
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
  checkCacheData<T>(name, storage, (data: T) => assign(dataItem, data))

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
    if (isUnDef((dataItem as any)[key])) {
      (dataItem as any)[key] = ''
    }
  })
}



export function dataPageMix<T extends { id?: number }>(parameter: DataPageMixParameter<T>): DataPageMix {
  // 参数解构
  const { dataItem, rules, onServerMethods } = parameter

  // 获取方法 当前路由
  const { replace, currentRoute } = useRouter()

  // 原始数据
  let cacheData = {}

  // 获取当前页面 查询条件
  const { query, name } = unref(currentRoute)

  // 保存按键加载
  const loading = ref<boolean>(false)

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


  /**
   * 设置元素数据
   */
  const setCacheData = () => {
    cacheData = cloneDeep(dataItem)
  }



  // 设置缓存
  const storage = createStorage(sessionStorage)

  // 以 id 加载数据
  const onLoadDataById = async () => {
    await onServerMethods.onLoadDataById(parseInt(pageInfo.query.id!))
    setCacheData()
  }

  // 页面为查看模式, 输入框 设置为只读模式
  if (pageInfo.mode === PageMode.view) {
    pageInfo.readonly = true
    // 请求数据
    onLoadDataById()
  }

  // 页面为新建模式 
  if (pageInfo.mode === PageMode.new) {
    newModeInit<T>(dataItem, toRef(pageInfo, 'mode'), name as string, storage)
  }

  // 页面为编辑模式
  if (pageInfo.mode === PageMode.edit) {
    // 请求数据
    onLoadDataById()
  }

  /**
   * 监听路由变化 关闭对话框
   */
  watch(() => currentRoute.value, () => {
    useToast.clear()
  })

  /**
   * 页面点击重置触发的函数
   */
  const onRestPage = () => {
    Object.keys(dataItem).forEach(key => {
      if (!ruleKeys.includes(key)) {
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
    if (!await validItem()) return

    try {
      loading.value = true
      if (pageInfo.mode === PageMode.new) {
        await onServerMethods.onNewData()
        pageInfo.mode = PageMode.edit
        replace({ query: { mode: PageMode[PageMode.edit], id: dataItem.id } })
      } else if (pageInfo.mode === PageMode.edit && !isEqual(dataItem, cacheData)) {
        await onServerMethods.onSaveData(parseInt(pageInfo.query.id!))
      } else {
        return
      }
      setCacheData()
    } catch (err) {
      useToast.error(err.msg)
    } finally {
      loading.value = false
    }

  }

  /**
   * 检查数据
   */
  const validItem = async (): Promise<boolean> => {
    try {
      await validate()
      return true
    } catch (err) {
      useToast.clear()
      useToast.error('数据校验失败，请检查！')
      return false
    }
  }

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


  return { onDataMethods, pageInfo, validateInfos, loading }
}
