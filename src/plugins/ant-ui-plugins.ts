
import type { App } from 'vue'

import { Button, Divider, Form, Input, Modal, Pagination, Row, Col, Checkbox, notification, Popover, Popconfirm, message, Menu, Dropdown, Select, Progress, DatePicker } from 'ant-design-vue'

// 导入 Icon
import { PlusOutlined, SettingOutlined, DownOutlined, InfoCircleFilled } from '@ant-design/icons-vue'

import 'ant-design-vue/dist/antd.css'



// 导入自定义 ui
import '/@/assets/styles/index.less'


// 设置 通知提醒框
notification.config({ placement: 'topRight', duration: 3 })


message.config({ duration: 3 })



export default class AntUiPlugins {
  static init(app: App<Element>): void {
    app.use(Button).use(Divider).use(Form).use(Input).use(Modal).use(Pagination).use(Select)
    app.use(Row).use(Col).use(Checkbox).use(Popover).use(Popconfirm).use(Menu).use(Dropdown)
    app.use(Progress).use(DatePicker)
    app.component('PlusOutlined', PlusOutlined)
    app.component("DownOutlined", DownOutlined)
    app.component('SettingOutlined', SettingOutlined)
    app.component('InfoCircleFilled', InfoCircleFilled)
  }
}