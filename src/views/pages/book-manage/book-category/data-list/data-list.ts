import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '类别名',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true

  },
  {
    title: '编码',
    dataIndex: 'code',
    align: 'center',
    ellipsis: true
  },
  {
    title: '创建者',
    dataIndex: 'createBy',
    align: 'center',
    ellipsis: true
  },
  {
    title: '更新者',
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
    slots: { customRender: 'operation' },
  }
]