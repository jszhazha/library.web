import type { TableColumn } from "/@/lib/props/TableList"
import type { FromRules } from '/@/lib/interface/From'

export const holdInfoColumns: TableColumn[] = [
  {
    title: "索书号",
    dataIndex: "searchCode",
    align: "center",
    ellipsis: true
  },
  {
    title: "存放位置",
    dataIndex: "address",
    align: "center",
    ellipsis: true,
    width: 260,
    slots: { customRender: 'address' }
  },
  {
    title: "馆藏状态",
    dataIndex: "status",
    align: "center",
    ellipsis: true,
    slots: { customRender: 'status' }
  },
  {
    title: "应还时间",
    dataIndex: "backTime",
    align: "center",
    ellipsis: true
  },
  {
    title: "借阅次数",
    dataIndex: "borrowingTimes",
    align: "center",
    ellipsis: true
  },
  {
    title: "归还次数",
    dataIndex: "renewalTimes",
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

  isbn: [
    { required: true, whitespace: true, message: '不允许为空' },
    {
      validator: (_rule: unknown, value: string): Promise<void> => {
        if (/^[0-9]+$/.test(value)) {
          return Promise.resolve()
        }
        return Promise.reject('格式错误')
      }
    }],

  publicationTime: [{ required: true, message: '不允许为空' }]
}


export const bookDetailRules: FromRules = {

  address: [{ required: true, whitespace: true, message: '不允许为空' }]
}