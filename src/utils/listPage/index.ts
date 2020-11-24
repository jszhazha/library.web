import { provideDataPage } from '/@/utils/listPage/methods/useProvince'
// import { ImportInstance } from "/@/lib/props/ImportModal";

// interface ListPageMix {

// }




export function listPageMix<T>(dataPageName: string): void {

  provideDataPage<T>(dataPageName)

  // function searchInstance(): void {
  //   // 
  // }

}