import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import {Cafe32, CarbonIconsVue, Laptop32, Moon32, Sun32} from '@carbon/icons-vue';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/styles/main.css'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App)
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