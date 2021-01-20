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
      #extension
    >
      <filter-items></filter-items>
      <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>
      <filter-category v-if="$vuetify.breakpoint.smAndUp"></filter-category>
      <filter-year v-if="$vuetify.breakpoint.smAndUp"></filter-year>
      <v-btn
        v-if="$vuetify.breakpoint.xsOnly"
        icon
        @click="openMobileSettings"
      >
        <v-icon>mdi-tune</v-icon>
      </v-btn>
      <switcher-view v-else></switcher-view>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '@/main';
import FilterCategory from '@/components/FilterCategory.vue';
import FilterItems from '@/components/FilterItems.vue';
import SwitcherView from '@/components/SwitcherView.vue';
import FilterYear from '@/components/FilterYear.vue';

export default {
  name: 'AppBar',

  components: {
    FilterCategory,
    FilterItems,
    FilterYear,
    SwitcherView,
  },

  data: () => ({
    isSearch: false,
    searchText: null,
  }),

  methods: {
    clearSearch() {
      this.isSearch = false;
    },

    handleSearch() {
      eventBus.$emit('changeSearchValue', {
        search: this.searchText.trim(),
      });
    },

    openMobileSettings() {
      eventBus.$emit('openMobileSettings', true);
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
};
</script>

<style>
.v-app-bar-title__content {
  width: auto !important;
}
</style>
