<template>
  <v-container>
    <v-row>
      <v-col
      cols="12"
      sm="auto"
      >
        <v-img
          aspect-ratio="1"
          class="mx-auto"
          contain
          :lazy-src="item.thumbnail"
          light
          :src="item.image"
          :style="{ background: '#fff' }"
          width="250px"
        ></v-img>
      </v-col>
      <v-col>
        <h2 v-html="item.name"></h2>
        <p>{{ categoryName(item.categoryId) }}</p>
        <p v-if="item.price">{{ $t('price') }}: {{ formatPrice(item.price) }}</p>
        <p>{{ $t('qty') }}: {{ item.qty }}</p>
        <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
        <p>
          <a
            :href="`https://www.bricklink.com/v2/catalog/catalogitem.page?M=${item.itemId}#T=S&O={%22loc%22:%22RU%22,%22iconly%22:0}`"
            rel="noopener noreferrer"
            :style="{ display: 'inline-flex', alignItems: 'center' }"
            target="_blank"
            >
            {{ $t('seeOnBL') }}
            <v-img
              class="ml-1"
              height="16px"
              src="http://static.bricklink.com/renovate/img/favicon/favicon-16x16.png"
              width="16px"
            ></v-img>
          </a>
        </p>
        <table-price-guide
          :item="item"
          item-type="Minifig"
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
      itemId, name, categoryId, year, qty, image, thumbnail,
    } = this.$route.params;

    this.item = {
      itemId, name, categoryId, year, qty, image, thumbnail,
    };
  },

  mounted() {
    this.getMinifigure();
  },
};
</script>
