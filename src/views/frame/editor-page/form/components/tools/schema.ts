


// 模型工具
const schemaTools = import.meta.globEager('./**/schema.ts')




Object.keys(schemaTools).forEach((key) => {
  // 读取文件名称
  const [classify, name] = key.replace(/\.\/|.schema.ts/g, '').split('/')
  console.log(classify, name)
})