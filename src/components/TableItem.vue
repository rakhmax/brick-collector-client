<template>
  <td :colspan="headers.length" class="pa-0">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-img
            :lazy-src="'https:' + item.image.base"
            :position="$vuetify.breakpoint.smAndUp ? '0 center' : 'center center'"
            :src="'https:' + item.image.base"
            contain
            max-height="250"
            max-width="100%"
          ></v-img>
        </v-col>
        <v-col>
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

<script>
import TablePriceGuide from '@/components/TablePriceGuide.vue';
import tableHeaders from '@/helpers/tableHeaders';

export default {
  name: 'TableMinifigures',

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
