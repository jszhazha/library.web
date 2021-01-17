import type { TableColumn } from '/@/lib/props/TableList'




export const tableColumns: TableColumn[] = [
  {
    title: '题名',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true

  },
  {
    title: '作者',
    dataIndex: 'author',
    align: 'center',
    width: 100,
    ellipsis: true
  },
  {
    title: '编码',
    dataIndex: 'code',
    align: 'center',
    width: 110,
    ellipsis: true
  },
  {
    title: '图书类别名称',
    dataIndex: 'bookCategory.name',
    align: 'center',
    ellipsis: true
  },
  {
    title: '图书类别编码',
    dataIndex: 'bookCategory.code',
    align: 'center',
    ellipsis: true
  },
  {
    title: '国际标准书号',
    dataIndex: 'isbn',
    align: 'center',
    ellipsis: true
  },
  {
    title: '出版社',
    dataIndex: 'publisher',
    align: 'center',
    ellipsis: true
  },
  {
    title: '总数量',
    dataIndex: 'count',
    align: 'center',
    width: 100,
    ellipsis: true
  },
  {
    title: '在馆数量',
    dataIndex: 'number',
    align: 'center',
    width: 100,
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


// 导入数据
export const importColumns: TableColumn[] = [

]