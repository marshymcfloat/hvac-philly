import { createApp } from 'vue'
import 'lenis/dist/lenis.css'
import './style.css'
import './homepage.css'
import RouterApp from './RouterApp.vue'
import router from './router/index.js'
import { redirectToCentralAdmin, shouldRedirectToCentralAdmin } from './utils/centralAdminRedirect.js'
import { installDeployRecovery } from './utils/deployRecovery.js'

if (shouldRedirectToCentralAdmin(window.location.pathname)) {
  redirectToCentralAdmin(window.location.pathname)
} else {
  installDeployRecovery(router)
  createApp(RouterApp).use(router).mount('#app')
}
