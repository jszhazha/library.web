import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '类别名',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true

  },
  {
    title: '类别号',
    dataIndex: 'code',
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