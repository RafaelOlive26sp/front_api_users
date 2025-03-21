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
  const authToken = store.state.auth.token;
  const userPrivilegeId = store.state.auth.user?.privilege_id;

  // console.log(authToken)

  if (to.meta.requiresAuth && !authToken) {
    return next({ name: 'login' });
  }



  if (to.meta.requiresAuth && authToken) {
    // Verifique se o privilégio é válido
    if (userPrivilegeId === undefined) {
      console.error('User privilege ID is undefined');
      return next({ name: 'login' });
    }
    if (to.name === 'dashboard' && ![1, 2].includes(userPrivilegeId)) {
      console.log("voce nao é admin");

      return next({ name: 'login' });

    }
    return next();
  }

  if (to.meta.guest && authToken && [1, 2].includes(userPrivilegeId)) {
    console.log('Redirecting to dashboard');
    return next({ name: 'dashboard' });
  }

  return next();
});

export default router
