import type { TableColumn } from '/@/lib/props/TableList'




export const tableColumns: TableColumn[] = [
  {
    title: '权限项名称',
    width: 100,
    dataIndex: 'description',
    align: 'center'
  },
  {
    title: '权限项',
    dataIndex: 'authorities',
    align: 'center',
    width: "50%",
    slots: { customRender: 'authorities' }
  },
  {
    title: '操作',
    align: 'center',
    width: 100,
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]

