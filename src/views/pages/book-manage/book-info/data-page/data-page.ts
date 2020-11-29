import type { TableColumn } from "/@/lib/props/TableList"
import type { FromRules } from '/@/lib/interface/From'

export const holdInfoColumns: TableColumn[] = [
  {
    title: "索书号",
    dataIndex: "number",
    align: "center",
  },
  {
    title: "存放位置",
    dataIndex: "number",
    align: "center",
  },
  {
    title: "馆藏状态",
    dataIndex: "state",
    align: "center",
  },
  {
    title: "应还时间",
    dataIndex: "state",
    align: "center",
  },
  {
    title: "借阅次数",
    dataIndex: "state",
    align: "center",
  },
  {
    title: "续借次数",
    dataIndex: "state",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "state",
    align: "center",
  },
]


export const formRules: FromRules = {
  name: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空',
    },
  ],
  author: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空',
    },
  ],
}