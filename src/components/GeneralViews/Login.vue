<template>
  <v-app id="inspire" class="bg">
    <v-container>
      <v-layout row mt-5>
        <v-flex xs12 sm4 offset-sm4>
          <p class="white--text text-xs-center">Seja Bem-vindo ao sistema imobiliário.</p>
        </v-flex>
      </v-layout>
      <v-layout row >
        <v-flex xs12 sm4 offset-sm4>
          <v-card>
            <v-card-title>
              <v-layout justify-space-around>
                <v-icon x-large>https</v-icon>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        min="6"
                        name="email"
                        label="E-mail"
                        v-model="email"
                        counter
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name="senha"
                        label="Senha"
                        type="password"
                        v-model="senha"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn block color="success" @click="login(email, senha)">Entrar</v-btn>
                    </v-flex>
                  </v-layout>

                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              
              <v-content>
              <p class="grey--text text-xs-center"><sub> Todos os direitos reservados à &copy; RV Informática LTDA. 
                <br />Licenciado para Ferraz Dal Lago.</sub></p>
              </v-content>
              
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container> 
  </v-app>
</template>
<script>
import axios from 'axios'
//require('axios-debug')(axios);

export default {
  data: () => {
    return {
      email: null,
      senha: null
    }
  },
  
  methods: {
    login: function(email, senha) {
      var self = this
      axios.post('/auth', {email, senha}).then((response) => {
        
        if(response.status === 200 && 'token' in response.data) {
          self.$session.start()
          self.$session.set('jwt', response.data.token)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$session.get('jwt')
          self.$router.push('/dashboard')
          
        }
      })
      .catch(function(res) {
        if(res instanceof Error) {
          console.log(res.message);
        } else {
          console.log(res.data);
        }
      })
    }
  }
}
</script>
<style scoped>
  .bg {
    background: #800080 !important;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #7f00ff, #800080) !important;  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right,#7f00ff, #800080) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>

