// Importando configurações moduladas.
import Dashboard from './dashboard'


// Importando os components.
import LoginPage from '../components/GeneralViews/Login.vue'
import NotFound from '../components/GeneralViews/PageNotFound.vue'


//Configure Routes.
const routes = [
  { path: '/', redirect: '/admin' },
  // GeneralViews.
  { path: '/auth/login', component: LoginPage },
  { path: '*', component: NotFound },
  // Dashboard routes. Configurado no dashboard.js
  Dashboard  
]

export default routes