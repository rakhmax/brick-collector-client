<template>
  <v-autocomplete
    v-model="select"
    autofocus
    clearable
    flat
    hide-no-data
    item-text="name"
    :items="items"
    label="ID"
    :loading="loading"
    no-filter
    required
    return-object
    :rules="[computedRules]"
    :search-input.sync="search"
    @change="handleSelect"
  >
    <template v-slot:item="{ item }">
      <v-avatar
        class="mr-3 my-2"
        :color="!item.image ? 'gray' : 'white'"
      >
        <v-img
          v-if="item.image"
          :alt="item.name"
          contain
          :src="item.image"
        ></v-img>
        <span v-else>{{ item.name.charAt(0) }}</span>
      </v-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="item.name"></v-list-item-title>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import debounce from 'lodash.debounce';
import { eventBus } from '@/main';
import searchData from '@/api/search';

export default {
  name: 'SearchBox',

  data: () => ({
    loading: false,
    items: [],
    search: null,
    select: {},
  }),

  watch: {
    search(val) {
      if (val && !this.select.itemId) {
        this.handleSearch(val.toLowerCase());
      } else if (!val) {
        this.select = {};
        this.items = [];
      } else {
        this.items = [];
      }
    },
  },

  methods: {
    handleSearch: debounce(function (v) {
      this.loading = true;

      searchData(v, this.$route.name.charAt(0))
        .then((data) => { this.items = data; })
        .catch((err) => { console.log(err); })
        .finally(() => { this.loading = false; });
    }, 500),

    handleSelect() {
      eventBus.$emit('select', {
        select: this.select || {},
      });
    },
  },

  computed: {
    computedRules() {
      return (value) => {
        const lowerValue = value?.itemId?.toLowerCase();

        const { sets, minifigures } = this.$store.state;

        if (sets.find((set) => set.itemId === lowerValue)
          || minifigures.find((minifig) => minifig.itemId === lowerValue)
        ) {
          return this.$t(`youAlreadyHaveThis${this.$route.name.slice(0, -1)}`);
        }

        if (!lowerValue) {
          return `ID ${this.$t('isRequired').toLowerCase()}`;
        }

        return true;
      };
    },
  },
};
</script>
