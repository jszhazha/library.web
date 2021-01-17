import type { Ref } from 'vue'
import { provide, inject, createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { useGo } from "/@/hooks/web/usePage"
import { PageMode } from "/@/utils/helper/breadcrumb"
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';



const key = Symbol('listPage')

interface DataPage<T> {
  // 数据加载
  loading: Ref<boolean>

  // 添加数据 
  onNewDataItem: () => void

  // 查看数据
  onViewDataItem: (record: T) => void

  // 编辑数据 
  onEditDataItem: (record: T) => void

  // 删除数据
  onDeleteDataItem: (record: T) => void
}

interface Options {
  name: string

  // 从服务器删除数据
  deleteDataFromServer: (id: number) => Promise<void>

  // 数据加载
  loading: Ref<boolean>
}






/**
 * @description 页面跳转进入的函数
 * @param name dataPage 页面 name 名称
 */
export function provideListPage<T extends { id?: number }>(options: Options): void {

  const { name, deleteDataFromServer, loading } = options

  const go = useGo()

  function onNewDataItem() {
    go({ name, query: { mode: PageMode[PageMode.new] } })
  }

  function onViewDataItem(record: T) {
    go({ name, query: { mode: PageMode[PageMode.view], id: record.id } })
  }

  function onEditDataItem(record: T) {
    go({ name, query: { mode: PageMode[PageMode.edit], id: record.id } })
  }

  function onDeleteDataItem(record: T) {
    Modal.confirm({
      icon: createVNode(ExclamationCircleOutlined),
      title: '删除数据',
      content: '确定要删除该数据吗？',
      okText: '确定',
      okType: 'primary',
      cancelText: '取消',
      onOk() {
        return new Promise(async (resolve) => {
          await deleteDataFromServer(record.id!)
          resolve('')
        })
      }
    })
  }

  const instance: DataPage<T> = { loading, onNewDataItem, onViewDataItem, onEditDataItem, onDeleteDataItem }

  provide(key, instance)
}

export function injectListPage<T>(): DataPage<T> {
  return inject(key, {}) as DataPage<T>
}
