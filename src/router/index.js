import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/statistics',
  },
  {
    path: '/minifigures',
    name: 'Minifigures',
    component: () => import('../views/Minifigures.vue'),
  },
  {
    path: '/sets',
    name: 'Sets',
    component: () => import('../views/Sets.vue'),
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('../views/Statistics.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name || 'LEGO Database';
  next();
});

export default router;
