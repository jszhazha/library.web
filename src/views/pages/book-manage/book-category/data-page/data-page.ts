import type { FromRules } from '/@/lib/interface/From'

export const formRules: FromRules = {
  name: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ],
  code: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    },
    {
      validator: (_rule: unknown, value: string): Promise<void> => {
        if (/^[A-Z0-9a-z]{0,4}$/.test(value)) {
          return Promise.resolve()
        }
        return Promise.reject('格式不正确')
      }
    }
  ]
}