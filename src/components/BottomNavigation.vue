<template>
  <v-bottom-navigation grow fixed>
    <v-btn to="/minifigures">
      <span>Minifigures</span>
      <v-icon>mdi-human-male</v-icon>
    </v-btn>
    <v-btn to="/sets">
      <span>Sets</span>
      <v-icon>mdi-toy-brick</v-icon>
    </v-btn>
    <v-btn to="/statistics">
      <span>Statistics</span>
      <v-icon>mdi-chart-arc</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<style>
.v-bottom-navigation.v-item-group .v-btn {height: inherit !important;}
</style>
