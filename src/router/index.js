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
  const userPrivilege = store.state.auth.user?.privilege_id;



  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' });
  }

  if (to.meta.guest && isAuthenticated) {
    console.log('Redirecting to dashboard');
    return next({ name: 'dashboard' });
  }

  if (to.meta.requiresAuth && isAuthenticated) {
    // Verifique se o privilégio é válido
    if (to.name === 'dashboard' && ![1, 2].includes(userPrivilege)) {
      return next({ name: 'login' });
    }
    return next();
  }

  return next();
});

export default router
