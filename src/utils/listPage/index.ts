import { onMounted } from 'vue'
import { provideDataPage } from '/@/utils/listPage/methods/useProvince'



interface Options {
  // 从服务器取得数据
  fetchDataFromServer: () => void
}



export function listPageMix<T>(dataPageName: string, { fetchDataFromServer }: Options): void {

  provideDataPage<T>(dataPageName)

  
  onMounted(() => {
    // 首次加载 从服务器取得数据
    fetchDataFromServer()
  })

}

