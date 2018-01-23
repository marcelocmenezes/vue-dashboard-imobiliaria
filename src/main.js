import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
//import  Auth from './auth/auth'
import Snotify from 'vue-snotify'


//Globals Plugins
import App from './App'

//Router Setup
import routes from './router/routes'

//Setup Plugins
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(Snotify)

//Configure Router
const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
})

//Verificando Login
/*router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!Auth.hasToken()){
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
})*/

//Config to Dev
Vue.config.productionTip = false

import 'vue-snotify/styles/material.css'
import('../node_modules/vuetify/dist/vuetify.min.css') // Ensure you are using css-loader

//Create Vue Instance
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: {}
})
