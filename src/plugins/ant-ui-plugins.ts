
import type { App } from 'vue';

import { Button, Divider, Form, Input, Modal, Space, Table } from 'ant-design-vue';
import { EyeInvisibleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons-vue';
import 'ant-design-vue/dist/antd.css';
// 导入自定义 ui
import '/@/assets/styles/index.less'

export default class AntUiPlugins {
  static init(app: App<Element>): void {
    app.use(Button).use(Divider).use(Form).use(Input).use(Modal).use(Space).use(Table)
    app.component('EyeInvisibleOutlined', EyeInvisibleOutlined)
    app.component('EyeOutlined', EyeOutlined)
    app.component('PlusOutlined', PlusOutlined)
  }
}