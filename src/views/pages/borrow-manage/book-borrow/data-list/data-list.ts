import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '借阅编号',
    dataIndex: 'code',
    align: 'center',
    ellipsis: true

  },
  {
    title: '索书号',
    dataIndex: 'bookCode',
    align: 'center',
    ellipsis: true
  },
  {
    title: '读者账户',
    dataIndex: 'createBy',
    align: 'center',
    ellipsis: true
  },
  {
    title: '借阅日期',
    dataIndex: 'createTime',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'createTime' }
  },
  {
    title: '归还日期',
    dataIndex: 'revertDate',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'revertDate' }
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