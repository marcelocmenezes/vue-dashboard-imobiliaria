<script>


export default {
  template: '#novo-cliente-template',

  props: {
  },

  data () {
    return {
      showModal: false,      
      selectTipo: [
        {value: 1, text:'Pessoa Física'},
        {value: 2, text: 'Pessoa Jurídida'}
      ],

      
      tipo: null,
      cpfcnpj: null,
      nome: null,
      rgie: null,
      email: null,
      telefone: null   
    }
  },
  
  methods: {
    submit () {
     

      if (!this.$v.$invalid) {
        
        
      } else {
        
        this.$v.$touch()
      }
    },

  },
  
}
</script>

<template>
  <v-content>
    <v-btn fab bottom right color="pink" dark fixed @click.stop="showModal = !showModal">
      <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-model="showModal" max-width="680px" persistent>
      <v-card>
        
        <v-card-title>
          <h1>Cadastro de Cliente</h1>
          
        </v-card-title>
        <v-divider />
        <v-card-text>
          
          <v-container fluid grid-list-sm>
                         
              <v-layout row>
                <v-flex xs12 sm4 md4>
                  <v-select label="Tipo Cliente" v-bind:items="selectTipo"   v-model="tipo" prepend-icon="nature_people"></v-select>
                </v-flex>
                
              </v-layout>

              <v-layout row>
                
                <v-flex xs12 sm12>
                  
                  <v-text-field label="Nome" required v-model="nome" prepend-icon="portrait" ></v-text-field>
                </v-flex>
              </v-layout>
              
              <v-layout row>
                
                <v-flex xs12 md6 sm6>
                  
                  <v-text-field label="CPF/CNPJ" required v-model="cpfcnpj"  v-mask="['###.###.###-##', '##.###.###/####-##']" prepend-icon=" "> </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 md6 sm6>
                  <v-text-field label="RG/IE" v-model="rgie" prepend-icon=" " />
                </v-flex>
                
                            
              </v-layout>

              <v-layout row>
                <v-flex xs12 md6 sm6>
                  <v-text-field label="E-mail" v-model="email" prepend-icon="mail" />
                </v-flex>    
                
              </v-layout>
              <v-layout row>
                <v-flex xs12 md6 sm6>
                  <v-text-field label="Telefone" v-model="telefone" v-mask="['(##) ####-####', '(##) #####-####']" prepend-icon="phone" />
                </v-flex>  
              </v-layout>
              
              
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-container fluid grid-list-xl>
            <v-layout row>
              <v-flex></v-flex><v-btn @click.prevent="submit">Cancelar</v-btn>
              <v-btn color="primary"  @click.prevent="submit">Salvar</v-btn>
            </v-layout>
          </v-container>
        </v-card-actions>
        
      </v-card>
    </v-dialog>
  </v-content>
</template>

