import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import isAuthentificated from '@/helpers/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    components: { login: Home },
    meta: { title: 'LEGO Database' },
  },
  {
    path: '/minifigures',
    name: 'Minifigures',
    component: () => import('../views/Minifigures.vue'),
    meta: {
      requiresAuth: true,
      title: 'Minifigures',
      withExtensionBar: true,
    },
  },
  {
    path: '/sets',
    name: 'Sets',
    component: () => import('../views/Sets.vue'),
    meta: {
      requiresAuth: true,
      title: 'Sets',
      withExtensionBar: true,
    },
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('../views/Statistics.vue'),
    meta: {
      title: 'Statistics',
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthentificated()) next({ name: 'Home' });
  else if (to.name === 'Home' && isAuthentificated()) next({ name: from.name || 'Statistics' });
  else {
    document.title = to.meta.title || 'LEGO Database';
    next();
  }
});

export default router;
