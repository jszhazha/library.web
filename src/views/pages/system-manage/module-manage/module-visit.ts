import type { TableColumn } from '/@/lib/props/TableList'




export const tableColumns: TableColumn[] = [
  {
    title: '权限项名称',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true

  },
  {
    title: '权限项',
    dataIndex: 'authorities',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'authorities' }
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

