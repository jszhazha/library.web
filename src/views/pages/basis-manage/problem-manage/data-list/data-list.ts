import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center',
    ellipsis: true

  },
  {
    title: '状态',
    dataIndex: 'show',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'show' }
  },
  {
    title: '创建者',
    dataIndex: 'createBy',
    align: 'center',
    ellipsis: true
  },
  {
    title: '更新者',
    dataIndex: 'updateBy',
    align: 'center',
    ellipsis: true
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'createTime' }
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'updateTime' }
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