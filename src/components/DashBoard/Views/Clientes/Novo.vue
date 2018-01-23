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
              <v-card-text>
                <v-container fluid grid-list-xl>
                  <v-form v-model="cliente">
                    
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field label="Nome"></v-text-field>
                      </v-flex>
                    </v-layout>
                    
                    <v-layout row>
                      <v-flex xs12 md3>
                        <v-text-field label="CPF/CNPJ"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md3>
                        <v-text-field label="RG"></v-text-field>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs12 md6>
                        <v-text-field label="E-mail"></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs12 md4>

                      </v-flex>

                      <v-flex xs12 md4>
                        <v-select
                          label="Sexo"
                          v-bind:items="selectSexo"
                          v-model="cliente.sexo"
                          ></v-select>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-select
                          label="Estado Civil"
                          v-bind:items="selectEstadoCivil"
           
                          v-model="cliente.estadoCivil"
                          ></v-select>
                          
                      </v-flex>
                    </v-layout>


                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-action>
                
              </v-card-action>
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
      
      cliente: {
        id: null,
        nome: '',
        cpfcnpj: '',
        rg: '',
        sexo: null,
        estadoCivil: null,
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
    editar() {

    },
    criar(item) {
      //axios.post('http://localhost:3000/clientes', cliente )
    },
    listarClientes() {
      //axios.get('http://localhost:3000/clientes').then((response) => { this.cliente = response.data})
    }
  },
  created() {
    this.listarClientes();
  }
  
}
</script>
