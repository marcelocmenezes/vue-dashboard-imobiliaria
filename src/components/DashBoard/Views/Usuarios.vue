<template>
  <v-content>
    <v-container fluid>
      <v-layout row class="mb-2">
        <v-flex>
          <h1>Usuários</h1>
          
        </v-flex>
      </v-layout>

      <v-layout row>
          <v-flex>
            <v-card>
              <v-card-title>
                <span class="grey--text">Lista de Clientes</span>
                <v-spacer></v-spacer>
                
                <v-text-field
                      append-icon="search"
                      single-line
                      hide-details
                      v-model="search"
                      placeholder="Pesquisar..."
                    ></v-text-field>
              </v-card-title>
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
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.rg }}</td>
                <td>{{ props.item.cpf }}</td>
                <td>{{ props.item.idade }}</td>
                <td ma-0 pa-0><span v-if="props.item.tipo == 1">Administrador</span><span v-else-if="props.item.tipo == 0">Supervisor</span><span v-else-if="props.item.tipo == 2">Colaborador</span></td>

                <td>
                  <v-btn icon flat small><v-icon >edit</v-icon></v-btn>
                  <v-btn icon flat small @click.prevent="excluir(props.item)"><v-icon >block</v-icon></v-btn>
                  <v-btn icon flat small @click.prevent="excluir(props.item)"><v-icon >vpn_key</v-icon></v-btn>
                </td>
              </template>
            </v-data-table>
            </v-card>
          </v-flex>
      </v-layout>
    </v-container>
    
    <v-btn fab bottom right color="pink" dark fixed @click.stop="showModal = !showModal">
      <v-icon>add</v-icon>
    </v-btn>
    
    <v-dialog v-model="showModal" max-width="870px">
      <v-card>
        <v-card-title>
          <span class="headline">Cadastro de Usuários</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="showModal = !showModal"><v-icon>close</v-icon></v-btn>
        </v-card-title>

        <v-card-text>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step step="1" :complete="e1 > 1">Dados Pessoais</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2">Dados Financeiros</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>

              <v-stepper-content step="1">
                <v-card  class="mb-5" height="200px">

                </v-card>
                <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
                
              </v-stepper-content>
              
              <v-stepper-content step="2">
                <v-card color="secondary" class="mb-5" height="200px">

                </v-card>
                <v-btn color="primary" @click.stop="dialog = !dialog">Salvar</v-btn>
                
              </v-stepper-content>
              
            </v-stepper-items>

          </v-stepper>
        </v-card-text>

      </v-card>
    </v-dialog>

    <vue-snotify></vue-snotify>

  </v-content>
  
</template>

<script>

import axios from 'axios'

export default {
  
  data: () => {
    return {
      e1: 0,
      showModal: false,
      search: '',
      selected: {},
      headers: [
        //{ text: 'ID', value: 'id', align: 'left' },
        { text: 'Nome', value: 'nome', align: 'left' },
        { text: 'E-mail', value: 'email', align: 'left' },
        { text: 'RG', value: 'rg', align: 'left' },
        { text: 'CPF', value: 'cpf', align: 'left' },
        { text: 'Idade', value: 'idade', align: 'left' },
        { text: 'Tipo', value: 'tipo', align: 'left' },
        { text: ''}
      ],
      items: []
    }
  },
  methods: {
    editar() {

    },
    criar(item) {
      axios.post('http://localhost:3000/clientes', item )
    },
    listarClientes() {
      axios.get('http://localhost:3000/clientes').then((response) => { this.items = response.data})
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
    }
  },
  created() {
    this.listarClientes();
  }
  
}
</script>
