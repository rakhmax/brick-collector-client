<template>
  <v-data-table
    :expanded="expanded"
    :headers="headers"
    :items="checkbox ? filteredMinifigures : $store.state.minifigures"
    :loading="$store.state.loading"
    :search="search"
    @item-expanded="getPriceGuide"
    item-key="itemId"
    loading-text="Loading minifigures..."
    show-expand
    single-expand
  >
    <template #item.categoryId="{ item }">
      <span>{{ themeName(item.categoryId) }}</span>
    </template>
    <template #top>
      <v-container class="py-1">
        <v-text-field
          v-show="false"
          v-model="search"
          label="Search"
          class="mx-4"
        />
        <v-checkbox
          v-model="checkbox"
          label="with duplicates only"
        />
      </v-container>
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
            icon
          >
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="deleteMinifigure(item.itemId)">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length" class="pa-0">
        <v-container>
          <p>Release year: {{ item.year }}</p>
          <p v-if="item.count > 1">Number of duplicates: {{ item.count - 1 }}</p>
        </v-container>
        <h3 class="ml-4 my-2" v-if="!currentItemPriceGuide.used.hasOwnProperty('avg')">
          <v-progress-circular
            :size="24"
            :width="3"
            indeterminate
          />
        </h3>
        <div v-else class="ma-2">
          <h3 class="ml-1">Price guide</h3>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" />
                  <!-- <th class="text-left">Max</th> -->
                  <th class="text-left">Min</th>
                  <th class="text-left">Avg</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>New</td>
                  <!-- <td>{{ currentItemPriceGuide.new.max }}</td> -->
                  <td>{{ currentItemPriceGuide.new.min }}</td>
                  <td>{{ currentItemPriceGuide.new.avg }}</td>
                </tr>
                <tr>
                  <td>Used</td>
                  <!-- <td>{{ currentItemPriceGuide.used.max }}</td> -->
                  <td>{{ currentItemPriceGuide.used.min }}</td>
                  <td>{{ currentItemPriceGuide.used.avg }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { GET_MINIFIGURES, DELETE_MINIFIGURES } from '@/store/types';
import { getThemeNameById } from '../helpers/themeHelper';
import { eventBus } from '../main';
import tableHeaders from '../helpers/tableHeaders';
import { setPriceGuideByItemIdAndType } from '../helpers/priceGuide';

export default {
  name: 'TableMinifigures',

  data: () => ({
    checkbox: false,
    search: null,
    currentItemPriceGuide: {
      itemId: null,
      new: {},
      used: {},
    },
    expanded: [],
    headers: tableHeaders,
  }),

  methods: {
    fetchMinifigures() {
      this.$store.dispatch(GET_MINIFIGURES);
    },

    deleteMinifigure(itemId) {
      this.$store.dispatch(DELETE_MINIFIGURES, itemId);
    },

    getPriceGuide({ item, value }) {
      setPriceGuideByItemIdAndType.call(this, item, value, 'Minifig');
    },
  },

  computed: {
    themeName() {
      return (themeId) => getThemeNameById.call(this, themeId);
    },

    filteredMinifigures() {
      return this.$store.state.minifigures.filter((minifig) => minifig.count > 1);
    },
  },

  created() {
    eventBus.$on('searchBar', ({ search }) => {
      this.search = search;
    });
  },

  mounted() {
    this.fetchMinifigures();
  },
};
</script>
