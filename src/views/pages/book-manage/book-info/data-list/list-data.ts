import type { ColumnProps } from 'ant-design-vue/lib/table/interface';


export const tablecolumns: ColumnProps[] = [
  {
    title: '题名',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '图书编号',
    dataIndex: 'code',
    align: 'center'
  },
  {
    title: '学科类别',
    dataIndex: 'subjectCategory',
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
  }
]