<template>
  <div v-scroll="scroll">
    <v-data-table
      :expanded="expanded"
      :headers="headers"
      hide-default-footer
      item-key="itemId"
      :items="items"
      :items-per-page="itemsPerPage"
      :loading="$store.state.loading"
      :loading-text="`${$t('loading')}...`"
      :search="search"
      single-expand
      sort-by="itemId"
      @click:row="handleClickRow"
    >
      <template #item.itemId="{ item }">
        {{ formatSetId(item.itemId) }}
      </template>
      <template #item.name="{ item }">
        <span v-html="item.name"></span>
      </template>
      <template #item.categoryId="{ item }">
        {{ categoryName(item.categoryId) }}
      </template>
      <template #item.actions="{ item }">
        <actions
          :item="item"
          :item-type="itemType"
        ></actions>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Actions from '@/components/Actions.vue';
import tableHeaders from '@/helpers/tableHeaders';

export default {
  name: 'TableView',

  components: {
    Actions,
  },

  props: {
    items: Array,
    itemType: String,
    search: String,
  },

  data: () => ({
    itemsPerPage: 50,
    checkbox: false,
    expanded: [],
    headers: tableHeaders,
  }),

  methods: {
    handleClickRow(item) {
      this.$router.push({
        name: this.itemType === 'Set' ? 'Set' : 'Minifigure',
        params: item,
      });
    },

    scroll() {
      if (window.scrollY > document.documentElement.offsetHeight - window.innerHeight - 100) {
        this.itemsPerPage += 25;
      }
    },
  },
};
</script>
