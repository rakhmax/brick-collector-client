<template>
  <v-bottom-navigation
    :style="{ paddingRight: '92px' }"
    color="error"
    fixed
    grow
  >
    <v-btn to="/minifigures">
      <v-icon>mdi-human-male</v-icon>
    </v-btn>
    <v-btn to="/sets">
      <v-icon>mdi-toy-brick</v-icon>
    </v-btn>
    <v-btn to="/statistics">
      <v-icon>mdi-chart-arc</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<style>
.v-bottom-navigation.v-item-group .v-btn {height: inherit !important;}
</style>
