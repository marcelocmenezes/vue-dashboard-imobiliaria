<template>
  <v-app id="inspire">
    
    <!-- Toolbar --> 
    <v-toolbar
      color="purple darken-3"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-xs-only">Dashboard</span>
      </v-toolbar-title>
      
      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn @click="logout()" icon>
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </div>

    </v-toolbar>
    <!-- Toolbar -->

    <!-- Sidebar -->
    <v-navigation-drawer
      fixed
      clipped
      app
      v-model="drawer"
    >
      <!-- HeaderSideBar -->
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img v-bind:src="userInfo.avatar"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="userInfo.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="userInfo.type"></v-list-tile-sub-title>

            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <!-- WrapSideBar -->
      <v-list dense>
        <v-divider />
        <v-list-tile v-for="item in items" :key="item.title" @click="$router.push(item.path)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click.stop="suporteModal = !suporteModal">
          <v-list-tile-action>
            <v-icon>help</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Suporte</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    
    <!--Sidebar-->

    <router-view></router-view>



    <v-dialog v-model="suporteModal" max-width="480px">
      <v-card>
        <v-card-title>
          <h2>Suporte</h2>
          
        </v-card-title>
        <v-divider />
        <v-card-text>
          <h4 class="light">Telefones</h4>
          <p>+55 11 3986-0465</p>
          <h4 class="light">E-mail</h4>
          <p>ti@rvinformatica.tech</p>
          <small class="grey--text ">Atendimento de <span class="green--text">09:00 às 18:00</span></small>


        </v-card-text>
      </v-card>
    </v-dialog>

  </v-app>
  
</template>


<script>

import SideBarItems from './sidebar'

  export default {  
    data: () => {
      return {
        suporteModal: false,
        drawer: null,
        items: SideBarItems,
        userInfo: { name: 'Marcelo Menezes', type: 'Developer', avatar: 'https://avatars1.githubusercontent.com/u/8910193?s=460&v=4' },
        search: '',
        childData: {
          barSearch: this.search
        }
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/auth/login')
      }
    },
    methods: {
      logout: () => {
        this.$session.destroy()
        this.$router.push('/auth/login')
      }
    }
  }
</script>
<style>
.snotify-icon { display: none; }

</style>