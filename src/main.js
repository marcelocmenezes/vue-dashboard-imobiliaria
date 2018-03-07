import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import money from  'v-money'
import mask from  'vue-the-mask'
import VueSession from 'vue-session'
import axios from 'axios'

import VueSwal from 'vue-swal'

//Globals Plugins
import App from './App'

//Router Setup
import routes from './router/routes'

// Session Options
var sessionOptions = {
  persist: true
}

// Axios Config
axios.defaults.baseURL = 'https://api.marcelocmenezes.com.br/v1/'

//Setup Plugins
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(money)
Vue.use(mask)
Vue.use(VueSession, sessionOptions)

Vue.use(VueSwal)

//Configure Router
const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
})

//Verificando Login
/*router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(this.$session.exists()){
      console.log('não logado')
      next({
        path: '/auth/login'
      })
    } else {
      console.log('logado')
      next()
    }
    
  } else {
    next()
  }
})
*/

//Config to Dev
Vue.config.productionTip = false

import('vuetify/dist/vuetify.min.css') // Ensure you are using css-loader

//Create Vue Instance
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: {}
})
