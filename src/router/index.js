// src/router/index.js
import {createRouter, createWebHistory} from 'vue-router'
import Playerinfo from "@/pages/playerInfo/Playerinfo.vue";
import Home from "@/pages/Home.vue";
import Bans from "@/pages/Bans.vue";

const routes = [
    {path: '/', component: Home}, // Home route
    {path: '/bans', component: Bans},
    {path: "/player/:playerName", component: Playerinfo}// Your new route
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router
