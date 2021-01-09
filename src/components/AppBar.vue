<template>
  <v-app-bar
    :hide-on-scroll="isMobile"
    app
    dense
    elevate-on-scroll
  >
    <div v-if="!isMobile" class="d-flex align-center">
      <v-img
        alt="Lego Brick"
        class="shrink mr-4"
        contain
        src="../assets/Plastic_brick_red.svg"
        transition="scale-transition"
        width="40"
      />
      <v-app-bar-title>{{ $route.name || 'LEGO Database' }}</v-app-bar-title>
    </div>
    <v-spacer />
    <div
      v-if="$route.name !== 'Statistics'"
      :style="{ width: isMobile ? '100%' : 'auto' }"
    >
      <v-text-field
        full-width
        label="Search collection"
        v-model="searchText"
        @blur="clearSearch"
        @input="handleSearch"
        clearable
        dense
        flat
        hide-details
        prepend-inner-icon="mdi-magnify"
        single-line
        solo
      />
    </div>
    <template v-slot:extension>
      <v-spacer />
      <v-btn
        icon
        @click="handleChangeLayout"
      >
        <v-icon>
          {{ isCardLayout ? 'mdi-view-list' : 'mdi-view-grid' }}
        </v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { eventBus } from '@/main';
import { mapState } from 'vuex';
import { SET_CARD_LAYOUT } from '@/store/types';

export default {
  name: 'AppBar',

  data: () => ({
    isSearch: false,
    searchText: null,
  }),

  methods: {
    handleSearch() {
      eventBus.$emit('changeSearchValue', {
        search: this.searchText,
      });
    },

    clearSearch() {
      this.isSearch = false;
    },

    handleChangeLayout() {
      this.$store.dispatch(SET_CARD_LAYOUT, Number(!this.isCardLayout));
    },
  },

  computed: {
    ...mapState({
      isCardLayout: (state) => state.isCardLayout,
      isMobile: (state) => state.isMobile,
    }),
  },
};
</script>

<style>
.v-app-bar-title__content { width: auto !important }
</style>
