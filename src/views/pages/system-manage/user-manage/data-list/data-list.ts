import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '登录账户',
    dataIndex: 'username',
    align: 'center',
    ellipsis: true

  },
  {
    title: '用户名称',
    dataIndex: 'nickName',
    align: 'center',
    width: 100,
    ellipsis: true
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: 100,
    ellipsis: true,
    slots: { customRender: 'sex' }
  },
  {
    title: '手机号码',
    dataIndex: 'mobile',
    align: 'center',
    ellipsis: true
  },
  {
    title: '邮件地址',
    dataIndex: 'email',
    align: 'center',
    width: 110,
    ellipsis: true
  },
  {
    title: '用户状态',
    dataIndex: 'enabled',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'enabled' }
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