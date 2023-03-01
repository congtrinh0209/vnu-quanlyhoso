import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '',
          name: 'QuanLyHoSo',
          component: () => import('@/views/QuanLyHoSo.vue'),
          props: true
        },
        {
          path: 'components',
          name: 'Components',
          component: () => import('@/views/Component.vue'),
          props: true
        }
      ]
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/Login.vue')
    }
  ]
})

export default router
