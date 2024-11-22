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
import Store from "@/pages/store/Store.vue";
import Assets from "@/pages/Assets.vue";
import Product from "@/pages/store/Product.vue";
import GettingStarted from "@/pages/GettingStarted.vue";
import Error from "@/pages/Error.vue";
import Homemade from "@/pages/community/Homemade.vue";

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
    {path: "/store", component: Store},
    {path: "/product/:name",component: Product },
    {path: "/getting-started", component: GettingStarted},
    {path: "/:pathMatch(.*)*", name: "NotFound", component: Error }, // 404 route

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
