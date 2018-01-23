// Importando configurações moduladas.
import Dashboard from './dashboard'


// Importando os components.
import LoginPage from '../components/GeneralViews/Login.vue'
import NotFound from '../components/GeneralViews/PageNotFound.vue'


//Configure Routes.
const routes = [
  { path: '/', redirect: '/dashboard' },
  // GeneralViews.
  { path: '/auth/login', component: LoginPage },
  { path: '*', redirect: '/' },
  // Dashboard routes. Configurado no dashboard.js
  Dashboard  
]

export default routes