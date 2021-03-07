import type { FromRules } from '/@/lib/interface/From'

export const formRules: FromRules = {
  username: [{ required: true, whitespace: true, message: '不允许为空' }],
  nickName: [{ required: true, whitespace: true, message: '不允许为空' }],
  enabled: [{ type: 'number', required: true, message: '不允许为空' }],
  role: [
    {
      type: 'object',
      required: true,
      validator: (_rule: unknown, value: number[]): Promise<void> => {
        if (value?.length) {
          return Promise.resolve()
        }
        return Promise.reject('不允许为空')
      }
    }
  ],
  mobile: [
    {
      validator: (_rule: unknown, value: string): Promise<void> => {
        if (!value || /^1[3456789]\d{9}$/.test(value)) {
          return Promise.resolve()
        }
        return Promise.reject('格式错误')
      },
      trigger: 'blur'
    }
  ],
  email: [
    {
      validator: (_rule: unknown, value: string): Promise<void> => {
        if (!value || /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
          return Promise.resolve()
        }
        return Promise.reject('格式错误')
      },
      trigger: 'blur'
    }
  ]

}



export const selectSexOption = [
  { value: '男', label: '男' },
  { value: '女', label: '女' },
  { value: '', label: '未知' }
]

export const selectEnableOption = [
  { value: 0, label: '禁用' },
  { value: 1, label: '使用' }
]