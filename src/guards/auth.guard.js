import router from '@/router';

export default function authGuard(store) {
  const authRoutes = ['Login', 'Registration', 'ForgotPassword'];

  router.beforeEach((to, from, next) => {
    if (store.state.authStore.firstLogin) {
      return next({ name: 'Profile' });
    }
    if (authRoutes.includes(to.name) && store.state.authStore.isAuth) {
      return next({ name: 'Home' });
    }
    if (!authRoutes.includes(to.name) && !store.state.authStore.isAuth) {
      return next({ name: 'Login' });
    }
    return next();
  });
}
