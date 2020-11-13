
import type { App } from 'vue';

import { Button, Divider, Form, Input, Modal, Table, Pagination, Row, Col, Dropdown, Menu } from 'ant-design-vue';

// 导入 Icon
import { PlusOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons-vue';

import 'ant-design-vue/dist/antd.css';

// 导入自定义 ui
import '/@/assets/styles/index.less'

export default class AntUiPlugins {
  static init(app: App<Element>): void {
    app.use(Button).use(Divider).use(Form).use(Input).use(Modal).use(Table).use(Pagination)
    app.use(Row).use(Col).use(Dropdown).use(Menu)
    app.component('PlusOutlined', PlusOutlined)
    app.component("DownOutlined", DownOutlined)
    app.component('SettingOutlined', SettingOutlined)
  }
}