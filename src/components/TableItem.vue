<template>
  <td
    class="pa-0"
    :colspan="headers.length"
  >
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <v-img
            contain
            :lazy-src="'https:' + item.image.base"
            max-height="250"
            max-width="100%"
            :position="$vuetify.breakpoint.smAndUp ? '0 center' : 'center center'"
            :src="'https:' + item.image.base"
          ></v-img>
        </v-col>
        <v-col>
          <slot
            :item="item"
            name="info"
          ></slot>
        </v-col>
        <v-col cols="12">
          <table-price-guide
            :item="item"
            :item-type="itemType"
          ></table-price-guide>
        </v-col>
      </v-row>
    </v-container>
  </td>
</template>

<script>
import TablePriceGuide from '@/components/TablePriceGuide.vue';
import tableHeaders from '@/helpers/tableHeaders';

export default {
  name: 'TableItem',

  components: {
    TablePriceGuide,
  },

  props: {
    item: Object,
    itemType: String,
  },

  data: () => ({
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
      if (
        window.scrollY
        > document.documentElement.offsetHeight - window.innerHeight - 100
      ) {
        this.itemsPerPage += 15;
      }
    },
  },
};
</script>
