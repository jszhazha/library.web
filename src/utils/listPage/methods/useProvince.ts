
import { provide, inject } from 'vue';
import { useGo } from "/@/hooks/web/usePage";
import { PageMode } from "/@/utils/helper/breadcrumb";



const key = Symbol('dataItem');

interface DataPage<T> {
  // 添加数据 
  onNewDataItem: () => void

  // 查看数据
  onViewDataItem: (record: T) => void

  // 编辑数据 
  onEditDataItem: (record: T) => void
}




/**
 * @description 页面跳转进入的函数
 * @param name dataPage 页面 name 名称
 */
export function provideDataPage<T extends { id?: number }>(name: string): void {
  const pageGo = useGo();

  const onNewDataItem = () => pageGo({ name, query: { mode: PageMode[PageMode.new] } });
  const onViewDataItem = (record: T) => pageGo({ name, query: { mode: PageMode[PageMode.view], id: record.id } });
  const onEditDataItem = (record: T) => pageGo({ name, query: { mode: PageMode[PageMode.edit], id: record.id } });

  const instance: DataPage<T> = { onNewDataItem, onViewDataItem, onEditDataItem }

  provide(key, instance);
}

export function injectDataPage<T>(): DataPage<T> {
  return inject(key) as DataPage<T>;
}
