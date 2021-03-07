import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '登录账户',
    dataIndex: 'username',
    align: 'center',
    ellipsis: true

  },
  {
    title: '用户状态',
    dataIndex: 'enabled',
    align: 'center',
    ellipsis: true,
    width: 100,
    slots: { customRender: 'enabled' }
  },
  {
    title: '用户名称',
    dataIndex: 'nickName',
    align: 'center',
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

export const selectSexOption = [
  { value: '男', label: '男' },
  { value: '女', label: '女' },
  { value: '', label: '全部' }
]