<template>

  <v-content>
    <v-container fluid fill-height>
      <v-layout row class="mb-2">
        <h1></h1>
        <v-spacer></v-spacer>
        <v-text-field
              append-icon="search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
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
