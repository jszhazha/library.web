import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '借阅编号',
    dataIndex: 'id',
    align: 'center',
    ellipsis: true

  },
  {
    title: '图书名称',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true

  },
  {
    title: '索书号',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true
  },
  {
    title: '读者账户',
    dataIndex: 'state',
    align: 'center',
    ellipsis: true
  },
  {
    title: '借阅日期',
    dataIndex: 'state',
    align: 'center',
    ellipsis: true
  },
  {
    title: '归还日期',
    dataIndex: 'state',
    align: 'center',
    ellipsis: true
  },
  {
    title: '延长日期',
    dataIndex: 'state',
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
    title: '续借渠道',
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