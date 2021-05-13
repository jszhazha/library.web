import { isArray } from "/@/utils/is"


interface ViewList {
  [prop: string]: string[]
}

interface ModuleList {
  [prop: string]: unknown
}


// 视图工具
const viewTools = import.meta.globEager('./**/index.vue')

// 工具列表
export const viewList: ViewList = {}

// 模块列表
export const moduleList: ModuleList = {}

// 分类 中文 和 图标
export const classify = {
  name: {
    base: '基础',
    input: '输入框',
    checkbox: '多选框',
    radio: '单选框'
  },
  icon: {
    base: 'ant-design:highlight-outlined',
    input: 'ant-design:edit-outlined',
    checkbox: 'ant-design:check-square-outlined',
    radio: 'mdi:radiobox-marked'
  }
}


Object.keys(viewTools).forEach((key) => {
  // 读取文件名称
  const [classify, name] = key.replace(/\.\/|.index.vue/g, '').split('/')
  // 设置数组
  !isArray(viewList[classify]) && (viewList[classify] = [])
  // 添加模块
  moduleList[`${name}Module`] = viewTools[key].default
  // 添加数据
  viewList[classify].push(name)
})

