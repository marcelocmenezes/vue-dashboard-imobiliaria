<template>
  <v-content>
    <v-container fluid>
      <v-layout row>
          <v-flex>
            <v-card>
              <v-card-title>
                <h1 class="grey--text">Lista de Imóveis</h1>
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
                <td>{{ props.item.logradouro }}</td>
                <td>{{ props.item.numero }}</td>
                <td>{{ props.item.bairro }}</td>
                <td>{{ props.item.cidade }}</td>
                <td>{{ props.item.uf }}</td>
                <td>{{ props.item.aluguel }}</td>
                <td>{{ props.item.iptu }}</td>

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
          <h1>Cadastro de Imóvel</h1>
          
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-container fluid grid-list-xl>
            <v-layout row>
              <v-flex xs12 md2 sm2>
                <v-text-field label="CEP" v-model="imovelModel.cep" mask="#####-###" @blur="buscarCep(imovelModel.cep)"></v-text-field>
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field label="Logradouro" v-model="imovelModel.logradouro" disabled></v-text-field>
              </v-flex>
              <v-flex xs12 md2 sm2>
                <v-text-field label="Numero" v-model="imovelModel.numero"></v-text-field>
              </v-flex>
            </v-layout>
              
            <v-layout row>
              <v-flex xs12 md5 sm5>
                <v-text-field label="Complemento" v-model="imovelModel.complemento"></v-text-field>
              </v-flex>
              <v-flex xs12 md3 sm3>
                <v-text-field label="Bairro" v-model="imovelModel.bairro" disabled></v-text-field>
              </v-flex>
              <v-flex xs12 md3 sm3>
                <v-text-field label="Cidade" v-model="imovelModel.cidade" disabled></v-text-field>
              </v-flex>
              <v-flex xs12 md1 sm1>
                <v-text-field label="UF" v-model="imovelModel.uf" disabled></v-text-field>
              </v-flex>

            </v-layout>

            <v-layout row>
              <v-flex xs12 md3>
                <v-text-field label="Valor Aluguel" v-model.lazy="imovelModel.aluguel" v-money="money"></v-text-field>
              </v-flex>
              
              <v-flex xs12 md3>
                <v-text-field v-money="money" label="Valor IPTU" v-model.lazy="imovelModel.iptu"></v-text-field>
              </v-flex>
              

            </v-layout>
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-container fluid grid-list-xl>
            <v-layout row>
              <v-flex><v-btn block color="error" @click="fecharFormulario()">Cancelar</v-btn></v-flex>
              <v-flex><v-btn block color="success" @click="salvarFormulario(imovelModel)">Salvar</v-btn></v-flex>
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

export default {
  
  data: () => {
    return {
      e1: 0,
      showModal: false,
      search: '',
      
      imovelModel: {
        id: null,
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        aluguel: null,
        iptu: null 
      },

      money: { decimal: ',', thousands: '.', prefix: 'R$ ',precision: 2, masked: false },
      headers: [
        //{ text: 'ID', value: 'id', align: 'left' },
        { text: 'Endereço', value: 'logradouro', align: 'left' },
        { text: 'Numero', value: 'numero', align: 'left' },
        { text: 'Bairro', value: 'bairro', align: 'left' },
        { text: 'Cidade', value: 'cidade', align: 'left' },
        { text: 'UF', value: 'uf', align: 'left' },
        { text: 'Valor Aluguel', value: 'aluguel', align: 'left'},
        { text: 'Valor IPTU', value: 'iptu', align: 'left'}
      ],
      items: []
    }
  },
  methods: {
    
    fecharFormulario() {
      this.imovelModel = { cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', uf: '', aluguel: null, iptu: null }
      this.$nextTick(() => { this.listarImoveis()})
      this.showModal = false
    },
    
    salvarFormulario(imovel) {
      if(item.id == null) 
        axios.post('http://localhost:3000/imoveis', imovel )
      else 
        axios.update('http://localhost:3000/imoveis', imovel)
      
      this.fecharFormulario()
    },

    listarImoveis() {
      this.items = []
      axios.get('http://localhost:3000/imoveis').then((response) => { this.items = response.data})
    },

    buscarCep(cep) {
      axios.get('http://viacep.com.br/ws/'+ cep +'/json/')
        .then(response => {
          this.imovelModel.logradouro = response.data.logradouro
          this.imovelModel.bairro = response.data.bairro
          this.imovelModel.cidade = response.data.localidade
          this.imovelModel.uf = response.data.uf
        })
        .catch( err => {
          console.log(err)
        })
    }

  },

  created() {
    this.listarImoveis();
  }
  
}
</script>
