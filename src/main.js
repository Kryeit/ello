import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import enMessages from '../localization/en_en.json'
import esMessages from '../localization/es_es.json'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import {
    ArrowLeft32,
    Cafe32,
    CarbonIconsVue,
    Contrast32,
    Download16,
    Laptop32,
    LogoDiscord16,
    LogoGithub16,
    LogoYoutube16,
    Moon32,
    ShoppingCartClear32,
    Sun32,
    TrashCan16,
} from '@carbon/icons-vue';

import './assets/styles/main.css'
import {createI18n} from "vue-i18n";
import {useColorMode} from "@vueuse/core";
import AuthService from "@/js/auth/authService.js";
import {
    Button,
    ButtonGroup,
    ConfirmationService,
    ConfirmDialog,
    Dialog,
    InputGroup,
    InputGroupAddon,
    InputNumber,
    InputText,
    Message,
    ProgressBar,
    Textarea,
    Toast,
    ToastService
} from "primevue";

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

// Start loading the product catalog at application launch
// productStore.fetchCatalog().catch(error => {
//     console.error('Failed to preload product catalog:', error);
// });

// Validate user token if available
AuthService.validateToken().then();

createApp(App)
    .use(i18n)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })
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
    .use(ToastService)
    .use(ConfirmationService)

    .component("Button", Button)
    .component("Dialog", Dialog)
    .component("InputText", InputText)
    .component("ProgressBar", ProgressBar)
    .component("ButtonGroup", ButtonGroup)
    .component("PrimeToast", Toast)
    .component("ConfirmDialog", ConfirmDialog)
    .component("Message", Message)
    .component("Textarea", Textarea)
    .component("InputNumber", InputNumber)
    .component("InputGroup", InputGroup)
    .component("InputGroupAddon", InputGroupAddon)
    .mount('#app');