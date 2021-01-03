<template>
  <v-data-table
    :headers="headers"
    :items="minifigures"
    :loading="$store.state.loading"
    :search="search"
    class="elevation-1"
    loading-text="Loading minifigures..."
  >
    <template v-slot:item.theme="{ item }">
      <span>{{ $store.state.themes.find((theme) => {
        return theme.id === item.theme;
      }).name }}</span>
    </template>
    <template v-slot:top>
      <v-text-field
        v-model="search"
        label="Search"
        class="mx-4"
      />
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
      >
        mdi-pencil {{item}}
      </v-icon>
      <v-icon
        small
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { GET_MINIFIGURES } from '@/store/types';

export default {
  name: 'TableMinifigures',

  data: () => ({
    search: '',
    headers: [
      { text: 'ID', value: 'legoId' },
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Theme', value: 'theme' },
      { text: 'Price', value: 'price' },
      // { text: 'Count', value: 'count' },
      {
        text: 'Comment',
        sortable: false,
        value: 'comment',
      },
    ],
    minifigures: [],
  }),

  methods: {
    getAll() {
      this.$store.dispatch(GET_MINIFIGURES)
        .then(() => { this.minifigures = this.$store.state.minifigures; });
    },
  },

  mounted() {
    this.getAll();
  },
};
</script>
