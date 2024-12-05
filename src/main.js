import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import enMessages from '../localization/en_en.json'
import esMessages from '../localization/es_es.json'

import {
    ArrowLeft32,
    Cafe32,
    CarbonIconsVue,
    Download16,
    Laptop32,
    LogoDiscord16,
    LogoGithub16,
    LogoYoutube16,
    Moon32,
    Sun32,
    Contrast32,
    TrashCan16,
    ShoppingCartClear32,
} from '@carbon/icons-vue';

import './assets/styles/main.css'
import {createI18n} from "vue-i18n";
import {useColorMode} from "@vueuse/core";
import AuthService from "@/js/auth/authService.js";

const browserLanguage = navigator.language.split('-')[0];
const savedLanguage = localStorage.getItem('language') || browserLanguage || 'en';

export const i18n = createI18n({
    locale: savedLanguage,
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {
        en: enMessages,
        es: esMessages
    }
})

useColorMode({
    modes: {
        cafe: 'cafe',
    },
})

AuthService.validateToken();

createApp(App)
    .use(i18n)
    .use(
        CarbonIconsVue,
        {
            components: {
                DiscordLogo: LogoDiscord16,
                GithubLogo: LogoGithub16,
                YoutubeLogo: LogoYoutube16,
                Moon: Moon32,
                Sun: Sun32,
                Cafe: Cafe32,
                Laptop: Laptop32,
                Contrast: Contrast32,
                Trash: TrashCan16,
                Download: Download16,
                ArrowLeft: ArrowLeft32,
                ShoppingCartClear: ShoppingCartClear32,
            }
        }
    )
    .use(router)
    .mount('#app');