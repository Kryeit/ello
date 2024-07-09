import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import enMessages from '../localization/en_en.json'
import esMessages from '../localization/es_es.json'

import {Cafe32, CarbonIconsVue, Laptop32, Moon32, Sun32} from '@carbon/icons-vue';

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/styles/main.css'
import {createI18n} from "vue-i18n";
import {useColorMode} from "@vueuse/core";

const vuetify = createVuetify({
    components,
    directives,
})

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

const mode = useColorMode({
    modes: {
        cafe: 'cafe',
    },
})

createApp(App)
    .use(i18n)
    .use(
        CarbonIconsVue,
        {
            components: {
                Moon: Moon32,
                Sun: Sun32,
                Cafe: Cafe32,
                Laptop: Laptop32
            }
        }
    )
    .use(router)
    .use(vuetify)
    .mount('#app');