import { createRouter, createWebHistory } from 'vue-router';
import DataApp from '../views/DataApp.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/DataApp',
      name: 'data-app',
      component: DataApp
    }
  ]
});

export default router;
