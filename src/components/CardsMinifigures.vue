<template>
  <v-data-iterator
    :items="minifigures"
    :items-per-page="15"
    :search="search"
    item-key="itemId"
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
            <card-item :item="item">
              <template #info>
                <div>
                  <p>Theme: {{ themeName(item.categoryId) }}</p>
                  <p v-if="item.price">Price: {{ item.price }}</p>
                  <p>Release year: {{ item.year }}</p>
                  <p>Count: {{ item.count }}</p>
                  <p v-if="item.comment">Comment: {{ item.comment }}</p>
                </div>
              </template>
            </card-item>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-iterator>
</template>

<script>
import CardItem from '@/components/CardItem.vue';
import tableHeaders from '@/helpers/tableHeaders';
import { getThemeNameById } from '@/helpers/themeHelper';

export default {
  name: 'TableMinifigures',

  components: {
    CardItem,
  },

  props: {
    search: String,
  },

  data: () => ({
    checkbox: false,
    expanded: [],
    headers: tableHeaders,
  }),

  computed: {
    themeName() {
      return (themeId) => getThemeNameById.call(this, themeId);
    },

    minifigures() {
      if (this.checkbox) {
        return this.$store.state.minifigures.filter(
          (minifig) => minifig.count > 1,
        );
      }

      return this.$store.state.minifigures;
    },
  },
};
</script>
