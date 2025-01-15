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

  console.log('To route:', to.name);
  console.log('Is authenticated:', isAuthenticated);
  console.log('User privilege:', userPrivilege);

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
  // console.log('To route:', to.name);
  // console.log('Is authenticated:', isAuthenticated);
  // console.log('User privilege:', userPrivilege);
  //
  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   console.log('Redirecting to login');
  //   return next({ name: 'login' });
  // }
  //
  // if (to.meta.guest && isAuthenticated) {
  //   console.log('Redirecting to dashboard');
  //   return next({ name: 'dashboard' });
  // }
  //
  // if (to.meta.requiresAuth && isAuthenticated) {
  //   if (to.name === 'dashboard' && ![1, 2].includes(userPrivilege)) {
  //     console.log('Insufficient privileges, redirecting to login');
  //     return next({ name: 'login' });
  //   }
  //   console.log('Allowing access to route');
  //   return next();
  // }
  //
  // console.log('No conditions met, allowing access');
  // return next();
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.state.auth.token;
//   const userPrivilege = store.state.auth.user?.privilege_id;
//
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next({name: 'login'})
//   }else if (to.meta.guest && isAuthenticated) {
//     next({name: 'dashboard'})
//   }else if(to.meta.requiresAuth && isAuthenticated) {
//     if (to.name === 'dashboard' && ![1,2].includes(userPrivilege)){
//       next({name:'login'});
//     }else {
//       next()
//     }
//   }else{
//     next()
//   }
// })

export default router
