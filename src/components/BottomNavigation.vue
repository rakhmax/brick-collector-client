<template>
  <v-bottom-navigation
    :style="{ paddingRight: $route.name !== 'Statistics' ? '88px' : 0 }"
    color="error"
    fixed
    hide-on-scroll
    grow
  >
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

<script>
export default {
  name: 'BottomNavigation',
};
</script>

<style>
.v-bottom-navigation.v-item-group .v-btn {height: inherit !important;}
</style>
