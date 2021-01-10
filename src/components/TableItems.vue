<template>
  <div v-scroll="scroll">
    <v-data-table
      :expanded="expanded"
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      :loading="$store.state.loading"
      :loading-text="`${$t('loading')}...`"
      :search="search"
      @click:row="handleClickRow"
      hide-default-footer
      item-key="itemId"
      single-expand
      sort-by="itemId"
    >
      <template #item.categoryId="{ item }">
        {{ themeName(item.categoryId) }}
      </template>
      <template #item.price="{ item }">
        <span v-if="item.price">
          {{ Number(item.price).toFixed(2) }}
        </span>
      </template>
      <template #item.actions="{ item }">
        <actions :item="item" :itemType="itemType" />
      </template>
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="pa-0">
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-img
                  :lazy-src="'http:' + item.image.base"
                  :src="'http:' + item.image.base"
                  contain
                  max-height="200"
                  max-width="100%"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <slot
                  :item="item"
                  name="info"
                />
              </v-col>
              <v-col cols="12">
                <table-price-guide
                  :item="item"
                  :itemType="itemType"
                />
              </v-col>
            </v-row>
          </v-container>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Actions from '@/components/Actions.vue';
import TablePriceGuide from '@/components/TablePriceGuide.vue';
import tableHeaders from '@/helpers/tableHeaders';
import { getThemeNameById } from '@/helpers/themeHelper';

export default {
  name: 'TableMinifigures',

  components: {
    Actions,
    TablePriceGuide,
  },

  props: {
    items: Array,
    itemType: String,
    search: String,
  },

  data: () => ({
    itemsPerPage: 15,
    checkbox: false,
    expanded: [],
    headers: tableHeaders,
  }),

  computed: {
    themeName() {
      return (themeId) => getThemeNameById.call(this, themeId);
    },
  },

  methods: {
    handleClickRow(item, { expand, isExpanded }) {
      if (isExpanded) {
        this.expanded = [];
      } else {
        expand();
      }
    },

    scroll() {
      if (window.scrollY > document.documentElement.offsetHeight - window.innerHeight - 100) {
        this.itemsPerPage += 15;
      }
    },
  },
};
</script>
