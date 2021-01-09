<template>
  <v-data-iterator
    :items="items"
    :items-per-page="15"
    :loading="$store.state.loading"
    :search="search"
    item-key="itemId"
    loading-text="Loading..."
    sort-by="itemId"
  >
    <template #default="{ items }">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.itemId"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <slot :item="item" name="item" />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-iterator>
</template>

<script>
import tableHeaders from '@/helpers/tableHeaders';

export default {
  name: 'TableMinifigures',

  props: {
    items: Array,
    search: String,
  },

  data: () => ({
    checkbox: false,
    expanded: [],
    headers: tableHeaders,
  }),
};
</script>
