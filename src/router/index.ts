import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router'
// import { createGuard } from '@/router/guard/'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('/@/pages/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('/@/pages/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export function setupRouter(app: App<Element>): void {
  app.use(router)
  // createGuard(router)
}


export default router
