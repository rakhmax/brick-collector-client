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
      <v-spacer />
    <v-btn v-if="!isSearch" icon @click="isSearch = true">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-text-field
      @input="onChange"
      v-model="searchText"
      clearable
      rounded
      dense
      v-if="isSearch"
      append-icon="mdi-close"
      @click:append="isSearch = false"
      hide-details
      single-line
      prepend-icon="mdi-magnify"
      solo
    />
  </v-app-bar>
</template>

<script>
import { eventBus } from '../main';

export default {
  data: () => ({
    isSearch: false,
    searchText: null,
  }),

  methods: {
    onChange() {
      eventBus.$emit('searchBar', {
        search: this.searchText,
      });
    },
  },
};
</script>

<style>
  .v-app-bar-title__content { width: auto !important }
</style>
