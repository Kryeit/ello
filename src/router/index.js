// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue' // Assuming you have a Home.vue

const routes = [
    { path: '/', component: App }, // Home route
    { path: '/cities', component: App }, // Your new route
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
