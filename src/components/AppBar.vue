<template>
  <v-app-bar
    app
    color="light"
    flat
  >
    <div class="d-flex align-center">
      <v-img
        alt="Lego Brick Logo"
        class="shrink mr-4"
        contain
        src="../assets/Plastic_brick_red.svg"
        transition="scale-transition"
        width="40"
      />
    </div>
    <v-app-bar-title><span>{{ $route.name || 'LEGO Database' }}</span></v-app-bar-title>
  </v-app-bar>
</template>

<style>
  .v-app-bar-title__content { width: auto !important }
</style>
