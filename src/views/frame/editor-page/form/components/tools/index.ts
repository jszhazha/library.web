import { isArray } from "/@/utils/is"


interface ViewList {
  [prop: string]: string[]
}


// 视图工具
const viewTools = import.meta.globEager('./**/index.vue')

// 工具列表
const viewList: ViewList = {}


Object.keys(viewTools).forEach((key) => {
  // 读取文件名称
  const [classify, name] = key.replace(/\.\/|.index.vue/g, '').split('/')
  // 设置数组
  !isArray(viewList[classify]) && (viewList[classify] = [])
  // 添加数据
  viewList[classify].push(name)
})


console.log(viewList)