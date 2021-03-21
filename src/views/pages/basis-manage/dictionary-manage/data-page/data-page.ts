import type { FromRules } from '/@/lib/interface/From'
import type { TableColumn } from '/@/lib/props/TableList'

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
        return Promise.reject('格式错误')
      }
    }
  ]
}


export const selectOption = [
  { value: 1, label: '正常' },
  { value: 0, label: '停用' }
]


export const dataTypeColumn: TableColumn[] = [
  {
    title: '字典编号',
    dataIndex: 'id',
    align: 'center',
    ellipsis: true

  },
  {
    title: '字典标签',
    dataIndex: 'label',
    align: 'center',
    ellipsis: true

  },
  {
    title: '字典键值',
    dataIndex: 'value',
    align: 'center',
    ellipsis: true
  },
  {
    title: '字典排序',
    dataIndex: 'sort',
    align: 'center',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'state',
    align: 'center',
    ellipsis: true
  },
  {
    title: '描述',
    dataIndex: 'description',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作',
    align: 'center',
    width: 170,
    ellipsis: true,
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]