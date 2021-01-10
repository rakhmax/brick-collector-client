<template>
  <v-app-bar
    :hide-on-scroll="$vuetify.breakpoint.xsOnly"
    app
    color="light"
    elevate-on-scroll
  >
    <div v-if="$vuetify.breakpoint.smAndUp" class="d-flex align-center">
      <v-icon class="mr-3" color="green" x-large>mdi-toy-brick-marker</v-icon>
      <v-app-bar-title>{{ $t($route.meta.title) || 'Brick Collector' }}</v-app-bar-title>
    </div>
    <v-spacer />
    <div
      v-if="$route.meta.withExtensionBar"
      :style="{ width: $vuetify.breakpoint.xsOnly ? '100%' : 'auto' }"
    >
      <v-text-field
        v-model="searchText"
        :label="$t('searchCollection')"
        @blur="clearSearch"
        @input="handleSearch"
        clearable
        color="green"
        dense
        flat
        full-width
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
    filters: [],
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
            text: this.$t('sealedOnly'),
            value: 'sealedOnly',
          },
        );
      } else {
        this.filters = this.filters.filter((filter) => filter.value !== 'sealedOnly');
      }
    },
    '$vuetify.lang.current': function () {
      this.filters = this.filters.map(({ value }) => ({
        value,
        text: this.$t(value),
      }));
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

  mounted() {
    this.filters = [
      {
        text: this.$t('all'),
        value: 'all',
      },
      {
        text: this.$t('moreThenOneOnly'),
        value: 'moreThenOneOnly',
      },
    ];
  },
};
</script>

<style>
.v-app-bar-title__content {
  width: auto !important;
}
</style>
