import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '字典编号',
    dataIndex: 'id',
    align: 'center',
    ellipsis: true

  },
  {
    title: '字典名称',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true

  },
  {
    title: '字典类型',
    dataIndex: 'type',
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