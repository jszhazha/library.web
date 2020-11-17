import type { Ref } from "vue";
import { unref, ref } from "vue";
import { useRouter } from "vue-router";
import { assign } from 'lodash-es'
import { checkCacheData } from './check/cacheData'
import { checkDataRouter, CheckDataRouter } from './check/dataRouter'
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

  // 查看缓存中是否有数据
  if (mode.value === PageMode.new) {
    checkCacheData<T>(name as string, storage, (data: T) => {
      dataItem = assign(dataItem, data)
    });
  }
  /**
   * 页面关闭触发函数
   */
  const onClosePage = () => back();

  //  push({ query: { mode: PageMode[PageMode.edit] } })

  // onBeforeUnmount(() => {
  //   // createStorage(localStorage).set(name as string, dataItem)
  // })

  return { onClosePage, mode, readonly };
}
