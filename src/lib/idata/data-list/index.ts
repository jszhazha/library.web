import { onMounted, ref } from 'vue'
import { provideListPage } from './methods/useDepend'



interface Options<T> {
  // 从服务器取得数据
  fetchDataFromServer: () => Promise<void>

  // 删除数据
  deleteDataFromServer: (record: T) => Promise<void>
}


interface onFetchData {
  // 刷新数据
  onFetchData: () => void
}


export function listPageMix<T>(dataPageName: string, options: Options<T>): onFetchData {
  const { fetchDataFromServer, deleteDataFromServer } = options

  const loading = ref<boolean>(false)

  // 设置实例
  provideListPage<T>({ name: dataPageName, deleteDataFromServer, loading })


  onMounted(async () => {
    // 首次加载 从服务器取得数据
    await onFetchData()
  })

  /**
   * 刷新数据
   */
  async function onFetchData() {
    loading.value = true
    await fetchDataFromServer()
    loading.value = false

  }

  return {
    onFetchData
  }
}

