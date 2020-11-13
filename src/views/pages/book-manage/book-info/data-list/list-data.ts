import type { TableColumn } from '/@/lib/props/tableProps';




export const tablecolumns: TableColumn[] = [
  {
    title: '题名',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '国际标准书号',
    dataIndex: 'isbn',
    align: 'center'
  },
  {
    title: '作者',
    dataIndex: 'author',
    align: 'center'
  },
  {
    title: '出版社',
    dataIndex: 'press',
    align: 'center'
  },
  {
    title: '总数量',
    dataIndex: 'count',
    align: 'center'
  },
  {
    title: '在馆数量',
    dataIndex: 'number',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    width: 170,
    dataIndex: 'operation',
    slots: { customRender: 'operation' },

  }
]