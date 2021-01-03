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
      <v-menu bottom left>
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            :disabled="$store.state.loading"
            dark
            icon
          >
            <v-icon small>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="deleteMinifigure(item.legoId)">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
        text: 'Price (₽)',
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
        text: '',
        value: 'actions',
        width: 60,
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
