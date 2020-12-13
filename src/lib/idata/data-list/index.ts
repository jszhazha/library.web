import { onMounted } from 'vue'
import { provideListPage } from './methods/useDepend'



interface Options {
  // 从服务器取得数据
  fetchDataFromServer: () => void
}



export function listPageMix<T>(dataPageName: string, { fetchDataFromServer }: Options): void {

  provideListPage<T>(dataPageName)

  
  onMounted(() => {
    // 首次加载 从服务器取得数据
    fetchDataFromServer()
  })

}

