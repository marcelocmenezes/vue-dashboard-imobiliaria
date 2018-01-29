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
    </v-container>
    
    <v-btn fab bottom right color="pink" dark fixed @click.stop="showModal = !showModal">
      <v-icon>add</v-icon>
    </v-btn>
    
    <v-dialog v-model="showModal" max-width="960px" persistent>
      <v-card>
        <v-card-title>
          <h1>Cadastro de Cliente</h1>
          
        </v-card-title>
        <v-divider />
        <v-card-text>
          
          <v-container fluid grid-list-xl>
                         
              <v-layout row>
                <v-flex xs12 sm12>
                  <v-text-field label="Nome" v-model="clienteModel.nome"></v-text-field>
                </v-flex>
              </v-layout>
              
              <v-layout row>
                <v-flex xs12 md3 sm3>
                  <v-text-field label="CPF/CNPJ" v-model="clienteModel.cpfcnpj" v-mask="['###.###.###-##', '##.###.###/####-##']"></v-text-field>
                </v-flex>
                <v-flex xs12 md3 sm3>
                  <v-text-field label="RG" v-model="clienteModel.rg"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 md6 sm3>
                  <v-text-field label="E-mail" v-model="clienteModel.email"></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12 md4 sm4>
                  <v-menu
                    lazy
                    :close-on-content-click="false"
                    v-model="menu"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      label="Data de Nascimento"
                      v-model="clienteModel.dataNascimento"
                      @blur="date = parseDate(clienteModel.dataNascimento)"
                      v-mask="['##/##/####']"
                    ></v-text-field>
                    <v-date-picker v-model="date" @input="clienteModel.dataNascimento = formatDate($event)" no-title scrollable actions locale="pt-br" autosave>
                      <template slot-scope="{ save, cancel }">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="cancel">Cancelar</v-btn>
                          <v-btn flat color="primary" @click="save">OK</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex xs12 md4 sm4>
                  <v-select
                    label="Sexo"
                    v-bind:items="selectSexo"
                    v-model="clienteModel.sexo"
                    ></v-select>
                </v-flex>

                <v-flex xs12 md4 sm4>
                  <v-select
                    label="Estado Civil"
                    v-bind:items="selectEstadoCivil"
      
                    v-model="clienteModel.estadoCivil"
                    ></v-select>
                    
                </v-flex>
              </v-layout>
            
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-container fluid grid-list-xl>
            <v-layout row>
              <v-flex><v-btn block color="error" @click="fecharFormulario()">Cancelar</v-btn></v-flex>
              <v-flex><v-btn block color="success" @click="criar(clienteModel)">Salvar</v-btn></v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <vue-snotify></vue-snotify>

  </v-content>
  
</template>

<script>

import axios from 'axios'
//import mask from 'vue-the-mask'

export default {
  
  

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

      selectEstadoCivil: [
        {value: 1, text: 'Solteiro(a)'},
        {value: 2, text: 'Casado(a)'},
        {value: 3, text: 'Viuvo(a)'},
        {value: 4, text: 'Divorciado(a)'}
      ],
      selectSexo: [
        {value: 1, text:'Masculino'},
        {value: 2, text: 'Feminino'}
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
    this.listarClientes();
  }
  
}
</script>
