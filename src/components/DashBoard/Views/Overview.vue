<template>

  <v-content>
    <v-container fluid fill-height>
      <v-layout row class="mb-2">
        <h1>Visão Geral</h1>
      </v-layout>

      <v-layout row>
        <doughnut :chart-data="renderChart"></doughnut>
      </v-layout>
    </v-container>


  <v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
    <v-icon>add</v-icon>
  </v-btn>
  
  </v-content>
</template>

<script>

export default {


}
</script>

<style>

</style>
