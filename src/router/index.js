// src/router/index.javascript
import {createRouter, createWebHistory} from 'vue-router'
import Playerinfo from "@/pages/playerInfo/Playerinfo.vue";
import Home from "@/pages/Home.vue";
import Bans from "@/pages/Bans.vue";
import Leaderboard from "@/pages/leaderboard/Leaderboard.vue";
import About from "@/pages/About.vue";
import Modpacks from "@/pages/community/Modpacks.vue";
import Launchers from "@/pages/community/Launchers.vue";
import LegacyGallery from "@/pages/LegacyGallery.vue";
import Login from "@/pages/auth/Login.vue";
import Assets from "@/pages/Assets.vue";
import GettingStarted from "@/pages/GettingStarted.vue";
import Error from "@/pages/Error.vue";
import Homemade from "@/pages/community/Homemade.vue";
import PrivacyPolicy from "@/pages/policies/PrivacyPolicy.vue";
import Donate from "@/pages/Donate.vue";
import Survival from "@/pages/Survival.vue";
import Analytics from "@/pages/Analytics.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login, props: route => ({ token: route.query.t })},
    {path: '/home', component: Home},
    {path: '/bans', component: Bans},
    {path: "/@:playerName", component: Playerinfo},
    {path: "/leaderboard", component: Leaderboard},
    {path: "/about", component: About},
    {path: "/modpacks", component: Modpacks},
    {path: "/launchers", component: Launchers},
    {path: "/homemade", component: Homemade},
    {path: "/legacy-gallery", component: LegacyGallery},
    {path: "/branding", component: Assets},
    {path: "/survival", component: Survival},
    {path: "/analytics", redirect: () => { window.location.href = 'https://coucou.kryeit.com/#/leaderboard'; } },
    {path: "/getting-started", component: GettingStarted},
    {path: "/:pathMatch(.*)*", name: "NotFound", component: Error }, // 404 route

    {path: "/privacy", component: PrivacyPolicy},

    {path: "/donate", component: Donate},

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
