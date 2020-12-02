import { isUnDef, isNull } from '/@/utils/is'

interface ConfigProvideParameter {
  transformCellText: ({ text }: { text: string }) => string
}

export function useConfigProvider(): ConfigProvideParameter {
  function transformCellText({ text }: { text: string }) {
    if (isNull(text) || isUnDef(text)) {
      return ''
    }
    return text
  }
  return {
    transformCellText,
  }
}