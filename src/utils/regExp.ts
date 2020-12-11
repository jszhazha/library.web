export const ruleMap = {
  telephone: /^1\d{10}$/,
  dataPage: /data-page$/
}


// 检查数据
export function validData(data: string, rule: 'telephone' | 'dataPage'): boolean {
  return ruleMap[rule].test(data)
}