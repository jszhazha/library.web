export const ruleMap = {
  telephone: /^1\d{10}$/
}


// 检查数据
export function validData(data: string, rule: 'telephone'): boolean {
  return ruleMap[rule].test(data)
}