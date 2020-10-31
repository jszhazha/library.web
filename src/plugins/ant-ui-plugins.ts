
import type { App } from 'vue';

import { Button, Divider, Form, Input, Modal } from 'ant-design-vue';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
import 'ant-design-vue/dist/antd.css';
// 导入自定义 ui
import '/@/assets/styles/index.less'

export default class AntUiPlugins {
  static init(app: App<Element>): void {
    app.use(Button)
    app.use(Divider)
    app.use(Form)
    app.use(Input)
    app.use(Modal)
    app.component('EyeInvisibleOutlined', EyeInvisibleOutlined)
    app.component('EyeOutlined', EyeOutlined)
  }
}