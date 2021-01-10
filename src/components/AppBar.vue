<template>
  <v-app-bar
    :hide-on-scroll="$vuetify.breakpoint.xsOnly"
    app
    color="light"
    elevate-on-scroll
  >
    <div v-if="$vuetify.breakpoint.smAndUp" class="d-flex align-center">
      <v-icon class="mr-3" color="green" x-large>mdi-toy-brick-marker</v-icon>
      <v-app-bar-title>{{ $route.name || "LEGO Database" }}</v-app-bar-title>
    </div>
    <v-spacer />
    <div
      v-if="$route.meta.withExtensionBar"
      :style="{ width: $vuetify.breakpoint.xsOnly ? '100%' : 'auto' }"
    >
      <v-text-field
        full-width
        label="Search collection"
        v-model="searchText"
        @blur="clearSearch"
        @input="handleSearch"
        clearable
        color="green"
        dense
        flat
        hide-details
        prepend-inner-icon="mdi-magnify"
        single-line
        solo
      />
    </div>
    <template v-slot:extension v-if="$route.meta.withExtensionBar">
      <v-select
        v-model="filterValue"
        v-if="$vuetify.breakpoint.xsOnly"
        :items="filters"
        @change="handleFilter"
        dense
        flat
        hide-details
        label="Filter"
        solo
      />
      <v-radio-group
        v-else
        v-model="filterValue"
        @change="handleFilter"
        hide-details
        row
      >
        <v-radio
          v-for="filter in filters"
          :key="filter.value"
          :label="filter.text"
          :value="filter.value"
        />
      </v-radio-group>
      <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
      <v-btn icon @click="handleChangeLayout">
        <v-icon>
          {{ isCardLayout ? "mdi-table-large" : "mdi-view-grid" }}
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
    filters: [
      {
        text: 'All',
        value: 'all',
      },
      {
        text: 'More then 1 only',
        value: 'moreThenOneOnly',
      },
    ],
    filterValue: 'all',
    isSearch: false,
    searchText: null,
  }),

  watch: {
    $route({ name }) {
      this.filterValue = 'all';
      if (name === 'Sets') {
        this.filters.push(
          {
            text: 'Sealed only',
            value: 'sealedOnly',
          },
        );
      } else {
        this.filters = this.filters.filter((filter) => filter.value !== 'sealedOnly');
      }
    },
  },

  methods: {
    handleSearch() {
      eventBus.$emit('changeSearchValue', {
        search: this.searchText,
      });
    },

    handleFilter(value) {
      this.radioGroup = value;
      eventBus.$emit('changeFilter', value);
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
    }),
  },
};
</script>

<style>
.v-app-bar-title__content {
  width: auto !important;
}
</style>
