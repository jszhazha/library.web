import type { TableColumn } from "/@/lib/props/TableList"
import type { FromRules } from '/@/lib/interface/From'

export const holdInfoColumns: TableColumn[] = [
  {
    title: "索书号",
    dataIndex: "number",
    align: "center",
    ellipsis: true,
    slots: { customRender: 'number' }
  },
  {
    title: "存放位置",
    dataIndex: "location",
    align: "center",
    ellipsis: true,
    slots: { customRender: 'location' }
  },
  {
    title: "馆藏状态",
    dataIndex: "state",
    align: "center",
    ellipsis: true
  },
  {
    title: "应还时间",
    dataIndex: "time",
    align: "center",
    ellipsis: true
  },
  {
    title: "借阅次数",
    dataIndex: "state",
    align: "center",
    ellipsis: true
  },
  {
    title: "续借次数",
    dataIndex: "state",
    align: "center",
    ellipsis: true
  },
  {
    title: "操作",
    dataIndex: "operation",
    align: "center",
    width: 120,
    ellipsis: true,
    slots: { customRender: 'operation' }
  }
]


export const formRules: FromRules = {

  name: [{ required: true, whitespace: true, message: '不允许为空' }],

  author: [{ required: true, whitespace: true, message: '不允许为空' }],

  price: [{ type: 'number', message: '格式不正确' }, { type: 'number', required: true, whitespace: true, message: '不允许为空' }],

  publisher: [{ required: true, whitespace: true, message: '不允许为空' }],

  bookCategoryId: [{ type: 'number', required: true, whitespace: true, message: '不允许为空' }],

  isbn: [{ required: true, whitespace: true, message: '不允许为空' }],

  publicationTime: [{ required: true, message: '不允许为空' }]
}