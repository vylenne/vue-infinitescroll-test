import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(), // Use HTML5 history mode
    routes,
});

export default router;
