// Default template
import Layout from '../components/DashBoard/Layout/Default.vue'

// Clientes
import ListarClientes from '../components/DashBoard/Views/Clientes/Listar.vue'

//Imoveis
import ListarImoveis from '../components/DashBoard/Views/Imoveis/Listar.vue'
//import NovoImoveis from '../components/DashBoard/Views/Imoveis/Novo.vue'
// import EditarImoveis from '../components/DashBoard/Views/Imoveis/Editar.vue'


// Administradoras
import ListarAdministradoras from '../components/DashBoard/Views/Administradoras/Listar.vue'
//import NovoAdministradoras from '../components/DashBoard/Views/Administradoras/Novo.vue'
//import EditarAdministradoras from '../components/DashBoard/Views/Administradoras/Editar.vue'


//import Suporte from '../components/DashBoard/Views/Suporte.vue'
import Overview from '../components/DashBoard/Views/Overview.vue'

import Usuarios from '../components/DashBoard/Views/Usuarios.vue'

const children = [
    { path: '', component: Overview },

    { path: 'clientes', component: ListarClientes },

    { path: 'imoveis', component: ListarImoveis },

    { path: 'users', component: Usuarios },
    
]

const dashboard = { path: '/dashboard', component: Layout, meta: { requiresAuth: true }, children: children }
    


export default dashboard
