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
    <div v-if="$route.name !== 'Statistics'">
      <v-btn v-if="!isSearch" icon @click="isSearch = true">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-text-field
        v-if="isSearch"
        v-model="searchText"
        :style="{ maxWidth: '300px', width: '100%' }"
        @blur="clearSearch"
        @input="onChange"
        autofocus
        clearable
        dense
        flat
        hide-details
        prepend-inner-icon="mdi-magnify"
        rounded
        single-line
        solo
      />
    </div>
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

    clearSearch() {
      this.isSearch = false;
      this.searchText = null;
    },
  },
};
</script>

<style>
  .v-app-bar-title__content { width: auto !important }
</style>
