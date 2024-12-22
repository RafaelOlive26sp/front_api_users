import { createRouter, createWebHistory } from 'vue-router'
import HomeLogin from '../views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'

import store from '@/store/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: HomeLogin,
      meta:{guest:true},
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta:{requiresAuth:true},
    },

  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.auth.token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({name: 'login'})
  }else if (to.meta.guest && isAuthenticated) {
    next({name: 'dashboard'})
  }else {
    next()
  }
})

export default router
