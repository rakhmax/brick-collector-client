<template>
  <v-app-bar
    app
    color="light"
    elevate-on-scroll
    :hide-on-scroll="$vuetify.breakpoint.xsOnly"
  >
    <div
      v-if="$vuetify.breakpoint.smAndUp"
      class="d-flex align-center"
    >
      <v-icon
        class="mr-3"
        color="green"
        x-large
      >mdi-toy-brick-marker</v-icon>
      <v-app-bar-title>{{ $t($route.meta.title) || 'Brick Collector' }}</v-app-bar-title>
    </div>
    <v-spacer></v-spacer>
    <div
      v-if="$route.meta.withExtensionBar"
      :style="{ width: $vuetify.breakpoint.xsOnly ? '100%' : 'auto' }"
    >
      <v-text-field
        v-model="searchText"
        clearable
        color="green"
        dense
        flat
        full-width
        hide-details
        :label="$t('searchCollection')"
        prepend-inner-icon="mdi-magnify"
        single-line
        solo
        @blur="clearSearch"
        @input="handleSearch"
      ></v-text-field>
    </div>
    <template
      v-if="$route.meta.withExtensionBar"
      v-slot:extension
    >
      <v-select
        v-if="$vuetify.breakpoint.xsOnly"
        v-model="filterValue"
        dense
        flat
        hide-details
        :items="filters"
        label="Filter"
        solo
        @change="handleFilter"
      ></v-select>
      <v-radio-group
        v-else
        v-model="filterValue"
        hide-details
        row
        @change="handleFilter"
      >
        <v-radio
          v-for="filter in filters"
          :key="filter.value"
          :label="filter.text"
          :value="filter.value"
        ></v-radio>
      </v-radio-group>
      <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>
      <v-select
        class="mr-2"
        clearable
        dense
        flat
        hide-details
        :items="categories"
        :label="$t('category')"
        multiple
        solo
        :style="{ maxWidth: '300px' }"
        @change="handleThemeFilter"
      ></v-select>
      <v-btn-toggle
        v-model="layout"
        dense
        @change="handleChangeLayout"
      >
        <v-btn>
          <v-icon>mdi-view-grid</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi-table-large</v-icon>
        </v-btn>
      </v-btn-toggle>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '@/main';
import { SET_LAYOUT } from '@/store/types';

export default {
  name: 'AppBar',

  data: () => ({
    filters: [],
    filterValue: 'all',
    isSearch: false,
    searchText: null,
    layout: null,
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
        search: this.searchText.trim(),
      });
    },

    handleFilter(value) {
      eventBus.$emit('changeFilter', value);
    },

    handleThemeFilter(value) {
      eventBus.$emit('changeThemeFilter', value);
    },

    clearSearch() {
      this.isSearch = false;
    },

    handleChangeLayout(value) {
      if (value !== undefined) {
        this.$store.dispatch(SET_LAYOUT, value);
      }
    },
  },

  computed: {
    ...mapState({
      categories(state) {
        if (this.$route.name === 'Sets') {
          return Array.from(new Set(state.sets.map((set) => set.categoryId)),
            (category) => ({
              text: this.categoryName(category),
              value: category,
            }));
        }
        if (this.$route.name === 'Minifigures') {
          return Array.from(new Set(state.minifigures.map((minifig) => minifig.categoryId)),
            (category) => ({
              text: this.categoryName(category),
              value: category,
            }));
        }

        return [];
      },
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

    this.layout = Number(this.$store.state.layout);
  },
};
</script>

<style>
.v-app-bar-title__content {
  width: auto !important;
}
</style>
