import type { TableColumn } from '/@/lib/props/TableList';




export const tableColumns: TableColumn[] = [
  {
    title: '题名',
    dataIndex: 'name',
    align: 'center',

  },
  {
    title: '作者',
    dataIndex: 'author',
    align: 'center',
    width: 100
  },
  {
    title: '学科类别',
    dataIndex: 'subjectCategory',
    align: 'center'
  },
  {
    title: '语种',
    dataIndex: 'language',
    align: 'center',
    width: 110
  },
  {
    title: '国际标准书号',
    dataIndex: 'isbn',
    align: 'center',
  },
  {
    title: '出版社',
    dataIndex: 'press',
    align: 'center'
  },
  {
    title: '总数量',
    dataIndex: 'count',
    align: 'center',
    width: 100
  },
  {
    title: '在馆数量',
    dataIndex: 'number',
    align: 'center',
    width: 100
  },
  {
    title: '操作',
    align: 'center',
    width: 170,
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
  }
]

export const importColumns: TableColumn[] = [
  {
    title: '题名',
    dataIndex: 'name',
    align: 'center',

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
    title: '学科类别',
    dataIndex: 'subjectCategory',
    align: 'center'
  },
  {
    title: '国际标准书号',
    dataIndex: 'isbn',
    align: 'center',
  },
  {
    title: '出版时间',
    dataIndex: 'publicationDate',
    align: 'center',
  },
  {
    title: '出版社',
    dataIndex: 'press',
    align: 'center'
  },
]