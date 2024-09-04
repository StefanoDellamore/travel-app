import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import TripDetails from './pages/TripDetails.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/trip/:id',
            name: 'TripDetails',
            component: TripDetails
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFoundPage
        },
    ]
});
export { router };