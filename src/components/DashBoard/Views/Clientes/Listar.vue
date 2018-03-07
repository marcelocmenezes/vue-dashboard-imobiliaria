<template>
  <v-content>
    <v-container fluid>
      <v-layout row>
          <v-flex>
            <v-card>
              <v-card-title>
                <h1 class="grey--text">Lista de Clientes</h1>
                <v-spacer></v-spacer>
                
                <v-text-field
                      append-icon="search"
                      single-line
                      hide-details
                      v-model="search"
                      placeholder="Pesquisar..."
                    ></v-text-field>
              </v-card-title>
              <v-divider />
            <v-data-table
              v-bind:headers="headers"
              v-bind:items="items"
              v-bind:search="search"
              rows-per-page-text="Clientes por página:"
              no-results-text="Nenhum resultado encontrado"
              no-data-text=""
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.nome }}</td>
                <td>{{ props.item.rg }}</td>
                <td>{{ props.item.cpf }}</td>
                <td>{{ props.item.idade }}</td>
                <td>
                  <v-btn icon flat><v-icon >edit</v-icon></v-btn>
                  <v-btn icon flat @click.prevent="excluir(props.item)"><v-icon >delete_sweep</v-icon></v-btn>
                </td>
              </template>
            </v-data-table>
            </v-card>
          </v-flex>
      </v-layout>
      <novo-cliente></novo-cliente>
    </v-container>

    
  </v-content>
  
</template>

<script>

import axios from 'axios'
import NovoCliente from './NovoCliente.vue'

export default {
  
  components: {
    NovoCliente
  },

  data: () => {
    return {
      e1: 0,
      showModal: false,
      menu: false,
      search: '',
      date: null,
  
      //selected: {},
      headers: [
        //{ text: 'ID', value: 'id', align: 'left' },
        { text: 'Nome', value: 'nome', align: 'left' },
        { text: 'RG', value: 'rg', align: 'left' },
        { text: 'CPF', value: 'cpf', align: 'left' },
        { text: 'Idade', value: 'idade', align: 'left' },
        { text: ''}
      ],
      items: [],


      selectTipo: [
        {value: 1, text:'Pessoa Física'},
        {value: 2, text: 'Pessoa Jurídida'}
      ],

      clienteModel: {
        id: null,
        nome: '',
        cpfcnpj: '',
        rg: '',
        email: '',
        sexo: null,
        estadoCivil: null,
        dataNascimento: null
      }

    }
  },
  methods: {
    fecharFormulario() {
      this.cliente = {
        id: null,
        nome: '',
        cpfcnpj: '',
        rg: '',
        email: '',
        sexo: null,
        estadoCivil: null,
        dataNascimento: null
      }
      this.$nextTick(() => { this.listarImoveis()})
      this.showModal = false
    },

    criar(cliente) {
      axios.post('/clientes', cliente )
    },
    listarClientes() {
      axios.get('/cliente').then((response) => { this.items = response.data})
    },
    excluir(item) {
      //this.displayNotification()
      this.selected = item
    
      this.$snotify.success('Deseja excluir o cliente ' + this.selected.nome + '?', 'Excluir', {
        timeout: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        icon: false,
        buttons: [
          { text: 'Sim', action: (toast) => {
            this.$delete(this.items, item.id)
            console.log('Excluindo ' + item.nome)
            this.$snotify.remove(toast.id)
          }},
          { text: 'Não', action: (toast) => {
            this.selected = {}
            console.log(item)
            this.$snotify.remove(toast.id)
          }}
        ]
      })
    },
    formatDate(date) {
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}` 
    }
  },
  created() {
    //this.listarClientes();
  }
  
}
</script>
