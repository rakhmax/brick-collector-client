<template>
  <v-autocomplete
    v-model="select"
    :items="items"
    :loading="loading"
    :search-input.sync="search"
    @change="handleSelect"
    autofocus
    clearable
    flat
    hide-no-data
    item-text="name"
    label="Search..."
    no-filter
    return-object
    required
  >
    <template #item="{ item }">
      <v-avatar class="mr-3 my-2" color="indigo">
        <img
          v-if="item.img"
          :alt="item.name"
          :src="item.img"
        >
        <span v-else>{{ item.name.charAt(0) }}</span>
      </v-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="item.name"></v-list-item-title>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import { debounce } from 'lodash';
import searchData from '../api/search';
import { eventBus } from '../main';

export default {
  name: 'App',

  data: () => ({
    loading: false,
    items: [],
    search: null,
    select: {},
  }),

  watch: {
    search(val) {
      eventBus.$emit('search', {
        search: val,
      });

      if (val && !this.select.legoId) {
        this.handleSearch(val.toLowerCase());
      } else if (!val) {
        this.select = {};
      } else {
        this.items = [];
      }
    },
  },

  methods: {
    handleSearch: debounce(function (v) {
      this.loading = true;

      searchData(v, this.$route.name.toLowerCase())
        .then((data) => { this.items = data; })
        .catch((err) => console.log(err))
        .finally(() => { this.loading = false; });
    }, 400),

    handleSelect() {
      eventBus.$emit('select', {
        select: this.select || {},
      });
    },
  },
};
</script>
