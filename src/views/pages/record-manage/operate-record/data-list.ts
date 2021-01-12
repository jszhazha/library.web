import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '操作人员',
    dataIndex: 'username',
    align: 'center',
    ellipsis: true
  },
  {
    title: '主机',
    dataIndex: 'ip',
    align: 'center',
    width: 130,
    ellipsis: true
  },
  {
    title: '请求方法',
    dataIndex: 'httpMethod',
    align: 'center',
    width: 100,
    ellipsis: true
  },
  {
    title: '系统模块',
    dataIndex: 'systemModule',
    align: 'center',
    width: 150,
    ellipsis: true,
    slots: { customRender: 'systemModule' }
  },
  {
    title: '响应时间',
    dataIndex: 'executionTime',
    align: 'center',
    width: 100,
    ellipsis: true
  },
  {
    title: '浏览器',
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
    title: '操作状态',
    dataIndex: 'status',
    align: 'center',
    ellipsis: true,
    width: 90

  },
  {
    title: '操作信息',
    dataIndex: 'description',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作日期',
    dataIndex: 'createTime',
    align: 'center',
    ellipsis: true,
    width: 200,
    slots: { customRender: 'createTime' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    ellipsis: true,
    width: 100,
    slots: { customRender: 'action' }
  }
  

]