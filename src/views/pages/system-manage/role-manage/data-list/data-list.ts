import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '角色编号',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true

  },
  {
    title: '角色名称',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true

  },
  {
    title: '角色状态',
    dataIndex: 'code',
    align: 'center',
    ellipsis: true
  },
  {
    title: '创建时间',
    dataIndex: 'updateBy',
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