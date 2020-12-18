import { onMounted } from 'vue'
import { provideListPage } from './methods/useDepend'



interface Options<T> {
  // 从服务器取得数据
  fetchDataFromServer: () => Promise<void>

  // 删除数据
  deleteDataFromServer: (record: T) => Promise<void>
}



export function listPageMix<T>(dataPageName: string, options: Options<T>): void {
  const { fetchDataFromServer, deleteDataFromServer } = options

  provideListPage<T>({ name: dataPageName, deleteDataFromServer })


  onMounted(async () => {
    // 首次加载 从服务器取得数据
    await fetchDataFromServer()
  })

}

