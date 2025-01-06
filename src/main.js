// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TooltipDirective from './directives/tooltips.js'

createApp(App).use(store).use(router).directive('tooltip', TooltipDirective).mount('#app')
