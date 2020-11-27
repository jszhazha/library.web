import { Ref } from "vue";
import type { CreateStorage } from "/@/utils/storage/Storage";
import type { FromRules } from '/@/lib/interface/From'
import { unref, ref, onBeforeUnmount, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { assign } from 'lodash-es'
import { checkCacheData, cacheData } from './methods/cacheData'
import { checkDataRouter, CheckDataRouter } from './methods/dataRouter'
import { createStorage } from "/@/utils/storage/";
import { PageMode } from "/@/utils/helper/breadcrumb";
import { useToast } from "vue-toastification";
import { useForm } from "@ant-design-vue/use";

import './index.less'


interface DataPageMix {
  // 页面模式
  mode: Ref<number>;

  // 关闭触发
  onClosePage: () => void;

  // 重置触发
  onRestPage: () => void;

  //设置输入框为只读
  readonly: Ref<boolean>;

  // 检测消息
  validateInfos: unknown;
}

interface DataPageMixParameter<T> {
  // 数据
  dataItem: T;

  // 规则
  rules: FromRules
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
  checkCacheData<T>(name, storage, (data: T) => assign(dataItem, data));

  /**
   * 刷新页面 不会走生命周期 , 同时监听刷新和卸载时 进行缓存数据
   */
  onMounted(() => {
    // 监听刷新
    window.addEventListener('beforeunload', updateHandler)
  })
  onBeforeUnmount(() => {
    // 
    updateHandler();
    // 停止监听刷新
    window.removeEventListener('beforeunload', updateHandler)

  })
}




export function dataPageMix<T>({ dataItem, rules }: DataPageMixParameter<T>): DataPageMix {
  const { back, currentRoute } = useRouter();
  const { query, name } = unref(currentRoute);
  const toast = useToast()
  const { validateInfos, resetFields } = useForm(dataItem, rules)


  // 设置缓存
  const storage = createStorage(sessionStorage);
  // 页面模式
  const mode = ref<number>(
    checkDataRouter((query as unknown) as CheckDataRouter)
  );
  // 设置输入框为只读
  const readonly = ref<boolean>(false);


  // 页面为查看模式, 输入框 设置为只读模式
  if (mode.value === PageMode.view) {
    readonly.value = true;
  }

  // 页面为新建模式 
  if (mode.value === PageMode.new) {
    newModeInit<T>(dataItem, mode, name as string, storage)
  }

  /**
   * 页面点击关闭触发函数
   */
  const onClosePage = () => back();

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
    resetFields();
  }

  //  push({ query: { mode: PageMode[PageMode.edit] } })





  // console.log(dataItem)
  // storage.set(name as string, dataItem)

  return { onClosePage, onRestPage, mode, readonly, validateInfos };
}
