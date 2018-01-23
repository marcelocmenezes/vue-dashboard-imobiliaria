<template>
  <v-content>
    <v-container fluid>
      <v-layout row class="mb-2">
        <v-flex>
          <h1>Novo Cliente</h1>
          
        </v-flex>
      </v-layout>

      <v-layout row>
          <v-flex>
            <v-card>
              <v-card-title>
                <span class="grey--text"></span>
              </v-card-title>
              <v-card-text>
                
              </v-card-text>
      
            </v-card>
          </v-flex>
      </v-layout>
    </v-container>
    

    <vue-snotify></vue-snotify>

  </v-content>
  
</template>

<script>

import axios from 'axios'

export default {
  
  data: () => {
    return {
      search: '',
      cliente: {
        id: 1,
        nome: '',
        cpfcnpj: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: ''
      }
    }
  },
  methods: {
    criar(item) {
      //axios.post('http://localhost:3000/clientes', cliente )
    }
  },
  created() {
    this.listarClientes();
  }
  
}
</script>
