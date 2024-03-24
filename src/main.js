import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ClickOutsideDirective from "@/ClickOutsideDirective.js";

createApp(App)
    .use(router)
    .directive("click-outside", ClickOutsideDirective)
    .mount('#app');
