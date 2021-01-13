import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/pages/Login.vue';
import isAuthentificated from '@/helpers/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    components: { login: Login },
    meta: { title: 'BrickCollector' },
  },
  {
    path: '/minifigures',
    name: 'Minifigures',
    component: () => import('../pages/Minifigures.vue'),
    meta: {
      requiresAuth: true,
      title: 'minifigures',
      withExtensionBar: true,
    },
  },
  {
    path: '/sets',
    name: 'Sets',
    component: () => import('../pages/Sets.vue'),
    meta: {
      requiresAuth: true,
      title: 'sets',
      withExtensionBar: true,
    },
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('../pages/Statistics.vue'),
    meta: {
      requiresAuth: true,
      title: 'statistics',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthentificated()) next({ name: 'Login' });
  else if (to.name === 'Login' && isAuthentificated()) next({ name: from.name || 'Statistics' });
  else {
    document.title = Vue.prototype.$t(to.meta.title) || 'BrickCollector';
    next();
  }
});

export default router;
