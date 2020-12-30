import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '登录账户',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true

  },
  {
    title: '用户名称',
    dataIndex: 'author',
    align: 'center',
    width: 100,
    ellipsis: true
  },
  {
    title: '手机号码',
    dataIndex: 'subjectCategory',
    align: 'center',
    ellipsis: true
  },
  {
    title: '邮件地址',
    dataIndex: 'language',
    align: 'center',
    width: 110,
    ellipsis: true
  },
  {
    title: '用户状态',
    dataIndex: 'isbn',
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