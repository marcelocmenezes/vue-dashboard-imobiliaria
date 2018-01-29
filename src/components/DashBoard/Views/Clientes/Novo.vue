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
                  
                    
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field label="Nome" v-model="nome"></v-text-field>
                      </v-flex>
                    </v-layout>
                    
                    <v-layout row>
                      <v-flex xs12 md3>
                        <v-text-field label="CPF/CNPJ" v-model="cpfcnpj"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md3>
                        <v-text-field label="RG" v-model="rg"></v-text-field>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs12 md6>
                        <v-text-field label="E-mail" v-model="email"></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs12 md4>
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
                            v-model="dataNascimento"
                            readonly
                          ></v-text-field>
                          <v-date-picker v-model="dataNascimento" no-title scrollable actions locale="pt-BR" autosave>
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

                      <v-flex xs12 md4>
                        {{ sexo }}
                        <v-select
                          label="Sexo"
                          v-bind:items="selectSexo"
                          v-model="sexo"
                          ></v-select>
                      </v-flex>

                      <v-flex xs12 md4>

                        {{ estadoCivil }}
                        <v-select
                          label="Estado Civil"
                          v-bind:items="selectEstadoCivil"
           
                          v-model="estadoCivil"
                          ></v-select>
                          
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex>
                        
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
    

    <!--vue-snotify></vue-snotify-->

  </v-content>
  
</template>

<script>

//import axios from 'axios'

export default {
  
  data: () => {
    return {
      menu: false,
      date: null,
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
        email: '',
        sexo: null,
        estadoCivil: null,
        dataNascimento: null,
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
  }
  
}
</script>
