
import type { App } from 'vue';

import { Button, Divider, Form, Input, Modal, Pagination, Row, Col, Dropdown, Menu, notification } from 'ant-design-vue';

// 导入 Icon
import { PlusOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons-vue';

import 'ant-design-vue/dist/antd.css';

// 导入 toastification 通知提醒框
import Toast from "vue-toastification";
// 导入 toastification 通知提醒框 UI
import "vue-toastification/dist/index.css";

// 导入自定义 ui
import '/@/assets/styles/index.less'


// 设置 通知提醒框
notification.config({ placement: 'topRight', duration: 6 });




export default class AntUiPlugins {
  static init(app: App<Element>): void {
    app.use(Toast);
    app.use(Button).use(Divider).use(Form).use(Input).use(Modal).use(Pagination)
    app.use(Row).use(Col).use(Dropdown).use(Menu)
    app.component('PlusOutlined', PlusOutlined)
    app.component("DownOutlined", DownOutlined)
    app.component('SettingOutlined', SettingOutlined)
  }
}