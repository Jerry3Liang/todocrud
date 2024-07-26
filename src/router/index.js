import { createRouter, createWebHistory } from 'vue-router';
import InsertNote from '../views/InsertNote.vue';
import UpdateNote from '../views/updateNote.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/InsertNote',
      name: 'insert-note',
      component: InsertNote
    },
    {
      path: '/UpdateNote',
      name: 'update-note',
      component: UpdateNote
    }
  ]
});

export default router;
