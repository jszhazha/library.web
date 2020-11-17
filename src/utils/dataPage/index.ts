import type { Ref } from "vue";
import { unref, ref, onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { assign } from 'lodash-es'
import { checkCacheData, cacheData } from './methods/cacheData'
import { checkDataRouter, CheckDataRouter } from './methods/dataRouter'
import { createStorage } from "/@/utils/storage/";
import { PageMode } from "/@/utils/helper/breadcrumb";



import './index.less'


interface DataPageMix {
  // 页面模式
  mode: Ref<number>;

  // 关闭触发
  onClosePage: () => void;

  //设置输入框为只读
  readonly: Ref<boolean>;
}




export function dataPageMix<T>(dataItem: T): DataPageMix {
  const { back, currentRoute } = useRouter();
  const { query, name } = unref(currentRoute);
  // 设置缓存
  const storage = createStorage(localStorage);
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
    // 更新前处理
    function updateHandler() {
      if (mode.value === PageMode.new) {
        cacheData(name as string, storage, dataItem)

      }
    }
    // 查看缓存中是否有数据
    checkCacheData<T>(name as string, storage, (data: T) => assign(dataItem, data));

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
  /**
   * 页面关闭触发函数
   */
  const onClosePage = () => back();

  //  push({ query: { mode: PageMode[PageMode.edit] } })




  // console.log(dataItem)
  // storage.set(name as string, dataItem)

  return { onClosePage, mode, readonly };
}
