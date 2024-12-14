import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '@/pages/NotFound.vue';
import HomePage from "@/pages/HomePage.vue";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
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
