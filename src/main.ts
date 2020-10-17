import { createApp } from 'vue'
import { setupRouter } from './router';
import App from './App.vue'
// import store from './store'
import PluginsIniter from './plugins/plugins-initer'

const app = createApp(App)

// app.use(store)


// 设置路由
setupRouter(app)

// 设置插件
PluginsIniter.init(app)


app.mount('#app');