import { createApp } from 'vue'
import { setupRouter } from './router';
import { setupStore } from './store'
import App from './App.vue'
import PluginsIniter from './plugins/plugins-initer'

const app = createApp(App)

// 设置路由
setupRouter(app)

// 设置 vuex
setupStore(app)

// 设置插件
PluginsIniter.init(app)

app.mount('#app');