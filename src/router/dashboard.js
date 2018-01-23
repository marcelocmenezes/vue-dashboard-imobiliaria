// Default template
import Layout from '../components/DashBoard/Layout/Default.vue'

// Clientes
import ListarClientes from '../components/DashBoard/Views/Clientes/Listar.vue'
import NovoClientes from '../components/DashBoard/Views/Clientes/Novo.vue'
import EditarClientes from '../components/DashBoard/Views/Clientes/Editar.vue'




import Suporte from '../components/DashBoard/Views/Suporte.vue'
import Overview from '../components/DashBoard/Views/Overview.vue'

import Usuarios from '../components/DashBoard/Views/Usuarios.vue'

const children = [
    { path: '', component: Overview },

    { path: 'clientes', component: ListarClientes },
    { path: 'clientes/editar/:id', component: EditarClientes },
    { path: 'clientes/novo', component: NovoClientes },
    
    
    { path: 'users', component: Usuarios },
    
    
    { path: 'suporte', component: Suporte }
]

const dashboard = { path: '/dashboard', component: Layout, meta: { requiresAuth: true }, children: children }
    


export default dashboard
