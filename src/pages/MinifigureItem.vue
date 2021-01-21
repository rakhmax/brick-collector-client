<template>
  <v-container>
    <v-row>
      <v-col
      cols="12"
      sm="auto"
      >
        <v-img
          aspect-ratio="1"
          contain
          :lazy-src="`https://img.bricklink.com/ML/${$route.params.itemId}.jpg`"
          light
          :src="`https://img.bricklink.com/ML/${$route.params.itemId}.jpg`"
          :style="{ background: '#fff' }"
          width="250px"
        ></v-img>
      </v-col>
      <v-col>
        <h2 v-html="item.name"></h2>
        <p>{{ item.itemId }} | {{ categoryName(item.categoryId) }}</p>
        <p v-if="item.price">{{ $t('price') }}: {{ item.price }}</p>
        <p>{{ $t('qty') }}: {{ item.qty }}</p>
        <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
        <table-price-guide
          :item="item"
          itemType="Minifig"
        ></table-price-guide>
      </v-col>
    </v-row>
    <list-parts
      :loading="loading"
      :parts="item.parts"
    ></list-parts>
  </v-container>
</template>

<script>
import { getSingleMinifigure } from '@/api/minifigures';
import ListParts from '@/components/ListParts.vue';
import TablePriceGuide from '@/components/TablePriceGuide.vue';

export default {
  components: { ListParts, TablePriceGuide },
  name: 'MinifigureItem',

  data: () => ({
    loading: false,
    item: {},
  }),

  methods: {
    async getMinifigure() {
      this.loading = true;

      try {
        const { data } = await getSingleMinifigure(this.$route.params.itemId);
        this.item = { ...this.item, ...data };
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
  },

  created() {
    const {
      itemId, name, categoryId, year, qty,
    } = this.$route.params;

    this.item = {
      itemId, name, categoryId, year, qty,
    };
  },

  mounted() {
    this.getMinifigure();
  },
};
</script>
