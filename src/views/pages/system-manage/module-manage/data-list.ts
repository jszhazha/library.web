import type { TableColumn } from '/@/lib/props/TableList'




export const tableColumns: TableColumn[] = [
  {
    title: '模块名称',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true

  },
  {
    title: '排序',
    dataIndex: 'sort',
    align: 'center',
    width: 100,
    ellipsis: true
  },
  {
    title: '请求地址',
    dataIndex: 'bookCategory',
    align: 'center',
    ellipsis: true
  },
  {
    title: '类型',
    dataIndex: 'language',
    align: 'center',
    width: 110,
    ellipsis: true
  },
  {
    title: '可见',
    dataIndex: 'isbn',
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

export const importColumns: TableColumn[] = [
  {
    title: '题名',
    dataIndex: 'name',
    align: 'center'

  },
  {
    title: '作者',
    dataIndex: 'author',
    align: 'center',
    width: 100
  },
  {
    title: '语种',
    dataIndex: 'language',
    align: 'center',
    width: 110
  },
  {
    title: '图书类别',
    dataIndex: 'bookCategory',
    align: 'center'
  },
  {
    title: '国际标准书号',
    dataIndex: 'isbn',
    align: 'center'
  },
  {
    title: '出版时间',
    dataIndex: 'publicationDate',
    align: 'center'
  },
  {
    title: '出版社',
    dataIndex: 'press',
    align: 'center'
  }
]