<template>
  <v-data-table
    :headers="headers"
    :items="minifigures"
    :loading="$store.state.loading"
    :search="search"
    loading-text="Loading minifigures..."
  >
    <template #item.theme="{ item }">
      <span>{{ themeName(item.theme) }}</span>
    </template>
    <template #top>
      <v-text-field
        v-model="search"
        label="Search"
        class="mx-4"
      />
    </template>
    <template #item.actions="{ item }">
      <!-- <v-icon small class="mr-2">
        mdi-pencil {{ item }}
      </v-icon> -->
      <v-icon small @click="deleteMinifigure(item.legoId)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { GET_MINIFIGURES, DELETE_MINIFIGURES } from '@/store/types';
import { getThemeNameById } from '../helpers/themeHelper';

export default {
  name: 'TableMinifigures',

  data: () => ({
    search: null,
    headers: [
      {
        text: 'ID',
        value: 'legoId',
        width: 70,
      },
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Theme', value: 'theme' },
      {
        text: 'Price',
        value: 'price',
        width: 120,
      },
      {
        sortable: false,
        text: 'Comment',
        value: 'comment',
      },
      {
        sortable: false,
        text: 'Actions',
        value: 'actions',
      },
    ],
    minifigures: [],
  }),

  methods: {
    fetchMinifigures() {
      this.$store.dispatch(GET_MINIFIGURES)
        .then(() => { this.minifigures = this.$store.state.minifigures; });
    },

    deleteMinifigure(legoId) {
      this.$store.dispatch(DELETE_MINIFIGURES, legoId)
        .then(() => { this.minifigures = this.$store.state.minifigures; });
    },
  },

  computed: {
    themeName() {
      return (themeId) => getThemeNameById.call(this, themeId);
    },
  },

  mounted() {
    this.fetchMinifigures();
  },
};
</script>
