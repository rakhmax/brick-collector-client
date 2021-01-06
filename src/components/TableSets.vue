<template>
  <v-data-table
    :headers="headers"
    :item-class="itemRowBackground"
    :items="$store.state.sets"
    :loading="$store.state.loading"
    :search="search"
    @item-expanded="getPriceGuide"
    item-key="itemId"
    show-expand
    single-expand
    :expanded="expanded"
    loading-text="Loading sets..."
  >
    <template #item.categoryId="{ item }">
      <span>{{ themeName(item.categoryId) }}</span>
    </template>
    <template #top>
      <v-text-field
        v-show="false"
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
            icon
          >
            <v-icon small>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="deleteSet(item.itemId)">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteSet(item.itemId, true)">
            <v-list-item-title>Delete with minifigures</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length" class="pa-0">
        <div class="ml-4 mt-2">
          <p v-if="item.minifiguresCount">Minifigures: {{ item.minifiguresCount }}</p>
          <p>Parts: {{ item.pieces }}</p>
          <p v-if="item.extraPieces">Extra parts: {{ item.extraPieces }}</p>
          <p>Release year: {{ item.year }}</p>
          <p v-if="item.count > 1">Number of duplicates: {{ item.count - 1 }}</p>
        </div>
        <h3 class="ml-4 my-2" v-if="!currentItemPriceGuide.used.hasOwnProperty('avg')">
          <v-progress-circular
            :size="24"
            :width="3"
            indeterminate
          />
        </h3>
        <div v-else class="ma-2">
          <h3 class="ml-2 mt-2">Price guide</h3>
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
import { DELETE_SETS, GET_SETS } from '@/store/types';
import { getThemeNameById } from '../helpers/themeHelper';
import { eventBus } from '../main';
import tableHeaders from '../helpers/tableHeaders';
import { setPriceGuideByItemIdAndType } from '../helpers/priceGuide';

export default {
  name: 'TableSets',

  data: () => ({
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
    fetchSets() {
      this.$store.dispatch(GET_SETS);
    },

    deleteSet(itemId, withMinifigures = false) {
      this.$store.dispatch(DELETE_SETS, { itemId, withMinifigures });
    },

    getPriceGuide({ item, value }) {
      setPriceGuideByItemIdAndType.call(this, item, value, 'Set');
    },
  },

  computed: {
    themeName() {
      return (themeId) => getThemeNameById.call(this, themeId);
    },

    itemRowBackground() {
      return (item) => item.sealed && 'sealed';
    },
  },

  created() {
    eventBus.$on('searchBar', ({ search }) => {
      this.search = search;
    });
  },

  mounted() {
    this.fetchSets();
  },
};
</script>

<style>
  .sealed {
    background-color: #1B5E20;
  }
</style>
