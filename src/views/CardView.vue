<template>
  <div v-scroll="scroll">
    <v-container fluid>
      <v-data-iterator
        hide-default-footer
        item-key="itemId"
        :items="items"
        :items-per-page="itemsPerPage"
        :loading="$store.state.loading"
        :loading-text="`${$t('loading')}...`"
        :search="search"
        sort-by="itemId"
      >
        <template #default="{ items }">
          <v-row>
            <v-col
              v-for="item in items"
              :key="item.itemId"
              cols="12"
              lg="3"
              md="4"
              sm="6"
              xl="2"
            >
              <slot
                :item="item"
                name="item"
              ></slot>
            </v-col>
          </v-row>
        </template>
        <template #loading>
          <v-row>
            <v-col
              v-for="item in 8"
              :key="item.itemId"
              cols="12"
              lg="3"
              md="4"
              sm="6"
              xl="2"
            >
              <v-skeleton-loader
                class="mx-auto"
                type="card"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import tableHeaders from '@/helpers/tableHeaders';

export default {
  name: 'CardView',

  props: {
    items: Array,
    search: String,
  },

  data: () => ({
    itemsPerPage: 50,
    checkbox: false,
    expanded: [],
    headers: tableHeaders,
  }),

  methods: {
    scroll() {
      if (
        window.scrollY
        === document.documentElement.offsetHeight - window.innerHeight
      ) {
        this.itemsPerPage += 25;
      }
    },
  },
};
</script>
