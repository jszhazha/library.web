import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '登录账户',
    dataIndex: 'userName',
    align: 'center',
    ellipsis: true

  },
  {
    title: '登录地址',
    dataIndex: 'ip',
    align: 'center',
    ellipsis: true
  },
  {
    title: '登录地点',
    dataIndex: 'location',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'location' }
  },
  {
    title: '运营商',
    dataIndex: 'isp',
    align: 'center',
    ellipsis: true
  },
  {
    title: '浏览器',
    dataIndex: 'client',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作系统',
    dataIndex: 'operatingSystem',
    align: 'center',
    ellipsis: true
  },


  {
    title: '登录状态',
    dataIndex: 'status',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'status' }

  },
  {
    title: '操作信息',
    dataIndex: 'description',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'description' }
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