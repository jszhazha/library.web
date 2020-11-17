/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isFunction, isString } from '/@/utils/is'

const isToString = (value: any): false | string => {
  if (value) {
    if (isFunction(value)) {
      return `"${value}"`
    }
    const str = String(value).replace(/(^\s+)|(\s+$)/g, '')
    return str ? str : false
  }
  return false
}

export const stringify = (value: any): false | string => {
  const type = typeof value
  if (type !== 'object' || type === null) {
    return isToString(value)
  }
  const json = []
  const dataType = (value && value.constructor === Array);
  for (const k in value) {
    const result = stringify(value[k])
    if (isString(result)) {
      json.push(`${dataType ? '' : '"' + k + '":'}${result}`)
    }
  }
  return json.length ? `${dataType ? "[" : "{"}${String(json)}${dataType ? "]" : "}"}` : false
}