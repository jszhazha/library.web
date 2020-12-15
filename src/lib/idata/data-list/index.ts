import { onMounted } from 'vue'
import { provideListPage } from './methods/useDepend'



interface Options {
  // 从服务器取得数据
  fetchDataFromServer: () => void

  // 删除数据
  deleteDataFromServer: () => Promise<void>
}



export function listPageMix<T>(dataPageName: string, options: Options): void {
  const { fetchDataFromServer, deleteDataFromServer } = options

  provideListPage<T>({ name: dataPageName, deleteDataFromServer })


  onMounted(() => {
    // 首次加载 从服务器取得数据
    fetchDataFromServer()
  })

}

