<template>
  <v-app-bar
    app
    color="light"
    :style="{ zIndex: 7 }"
  >
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../assets/Plastic_brick_red.svg"
        transition="scale-transition"
        width="40"
      />
    </div>
    <v-app-bar-title><span>Lego Database</span></v-app-bar-title>
  </v-app-bar>
</template>

<style>
  .v-app-bar-title__content { width: auto !important }
</style>
