<template>
  <v-content>
    <v-container fluid>
      <v-layout row class="mb-2">
        <v-flex>
          <h1>Novo Imóvel</h1>
                  
        </v-flex>
      </v-layout>

      <v-layout row>
          <v-flex>
            <v-card>
              <!--v-card-title>
                <span class="grey--text"></span>
              </v-card-title-->
              <v-card-text>
                <v-container fluid grid-list-xl>
                  <v-layout row>
                    <v-flex xs12 md2>
                      <v-text-field label="CEP" v-model="imovel.cep" mask="#####-###" @blur="buscarCep(imovel.cep)"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md8>
                      <v-text-field label="Logradouro" v-model="imovel.logradouro"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                      <v-text-field label="Numero" v-model="imovel.numero"></v-text-field>
                    </v-flex>
                  </v-layout>
                    
                  <v-layout row>
                    <v-flex xs12 md4>
                      <v-text-field label="Complemento" v-model="imovel.complemento"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md3>
                      <v-text-field label="Bairro" v-model="imovel.bairro"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-text-field label="Cidade" v-model="imovel.cidade"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md1>
                      <v-text-field label="UF" v-model="imovel.uf"></v-text-field>
                    </v-flex>

                  </v-layout>

                  <v-layout row>
                    <v-flex xs12 md3>
                      {{ this.alugel }}
                      <v-text-field label="Valor Aluguel" v-model.lazy="imovel.aluguel" v-money="money"></v-text-field>
                    </v-flex>
                    
                    <v-flex xs12 md3>
                      <v-text-field v-money="money" label="Valor IPTU" v-model.lazy="imovel.iptu"></v-text-field>
                    </v-flex>
                    

                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="criar(imovel)">Salvar</v-btn>
              </v-card-actions>
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
      imovel: { cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', uf: '', aluguel: null, iptu: null },

      money: { decimal: ',', thousands: '.', prefix: 'R$ ',precision: 2, masked: false }
      
    }
  },

  methods: {
    criar(imovel) {
      
      axios.post('http://localhost:3000/imoveis', imovel )
      
    },
    buscarCep(cep) {
      axios.get('http://viacep.com.br/ws/'+ cep +'/json/')
        .then(response => {
          console.log(response.data.logradouro);
          this.imovel.logradouro = response.data.logradouro;
          this.imovel.bairro = response.data.bairro;
          this.imovel.cidade = response.data.localidade;
          this.imovel.uf = response.data.uf;

          
        })
        .catch( err => {

        })
    }
  },
  created() {
    
  }
  
}
</script>
