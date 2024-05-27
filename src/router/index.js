// src/router/index.javascript
import {createRouter, createWebHistory} from 'vue-router'
import Playerinfo from "@/pages/playerInfo/Playerinfo.vue";
import Home from "@/pages/Home.vue";
import Bans from "@/pages/Bans.vue";
import Leaderboard from "@/pages/leaderboard/Leaderboard.vue";
import About from "@/pages/About.vue";
import Modpacks from "@/pages/community/Modpacks.vue";
import Launchers from "@/pages/community/Launchers.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/home', component: Home},
    {path: '/bans', component: Bans},
    {path: "/@:playerName", component: Playerinfo},
    {path: "/leaderboard", component: Leaderboard},
    {path: "/about", component: About},
    {path: "/modpacks", component: Modpacks},
    {path: "/launchers", component: Launchers}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            };
        }
        return { top: 0 };
    },
})

export default router
