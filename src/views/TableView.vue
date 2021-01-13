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
      <template #item.itemId="{ item }">
        {{ formatSetId(item.itemId) }}
      </template>
      <template #item.categoryId="{ item }">
        {{ categoryName(item.categoryId) }}
      </template>
      <template #item.price="{ item }">
        <span v-if="item.price">
          {{ formatPrice(item.price) }}
        </span>
      </template>
      <template #item.actions="{ item }">
        <actions :item="item" :itemType="itemType" />
      </template>
      <template #expanded-item="{ item }">
        <slot :item="item" name="item" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Actions from '@/components/Actions.vue';
import tableHeaders from '@/helpers/tableHeaders';

export default {
  name: 'TableMinifigures',

  components: {
    Actions,
  },

  props: {
    items: Array,
    itemType: String,
    search: String,
  },

  data: () => ({
    itemsPerPage: 25,
    checkbox: false,
    expanded: [],
    headers: tableHeaders,
  }),

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
