import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '登录账户',
    dataIndex: 'userName',
    align: 'center',
    ellipsis: true

  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
    align: 'center',
    width: 100,
    ellipsis: true
  },
  {
    title: '国家',
    dataIndex: 'country',
    align: 'center',
    ellipsis: true
  },
  {
    title: '省',
    dataIndex: 'region',
    align: 'center',
    width: 110,
    ellipsis: true
  },
  {
    title: '市',
    dataIndex: 'city',
    align: 'center',
    ellipsis: true
  },
  {
    title: '运营商',
    dataIndex: 'isp',
    align: 'center',
    ellipsis: true
  },
  {
    title: '客户端',
    dataIndex: 'client',
    align: 'center',
    width: 150,
    ellipsis: true
  },
  {
    title: '操作系统',
    dataIndex: 'operatingSystem',
    align: 'center',
    width: 150,
    ellipsis: true
  },
  {
    title: '登录状态',
    dataIndex: 'status',
    align: 'center',
    ellipsis: true,
    width: 90,
    slots: { customRender: 'status' }

  },
  {
    title: '登录日期',
    dataIndex: 'createTime',
    align: 'center',
    ellipsis: true,
    width: 200,
    slots: { customRender: 'createTime' }
  }

]