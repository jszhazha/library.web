export const rules = {
  telephone: /^1\d{10}$/,
  dataPage: /data-page$/
}


interface Parameter {
  data: string,
  rule: 'telephone' | 'dataPage'
}

// 检查数据
export function validData({ data, rule }: Parameter): boolean {
  return rules[rule].test(data)
}