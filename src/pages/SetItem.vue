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
          :lazy-src="`https://img.bricklink.com/SL/${$route.params.itemId}.jpg`"
          light
          :src="`https://img.bricklink.com/SL/${$route.params.itemId}.jpg`"
          :style="{ background: '#fff' }"
          width="300px"
        ></v-img>
      </v-col>
      <v-col>
        <h2 v-html="item.name"></h2>
        <p>{{ item.itemId }} | {{ categoryName(item.categoryId) }}</p>
        <p v-if="item.price">{{ $t('price') }}: {{ formatPrice(item.price) }}</p>
        <p>{{ $t('qty') }}: {{ item.qty }}</p>
        <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
        <p>
          <a :href="`https://www.lego.com/en-my/service/buildinginstructions/${formatSetId(item.itemId)}`">
            {{ $t('instruction') }}
          </a>
        </p>
        <table-price-guide
          :item="item"
          itemType="Set"
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
import { getSingleSet } from '@/api/sets';
import ListParts from '@/components/ListParts.vue';
import TablePriceGuide from '@/components/TablePriceGuide.vue';

export default {
  components: { ListParts, TablePriceGuide },
  name: 'SetItem',

  data: () => ({
    loading: false,
    item: {},
  }),

  methods: {
    async getSet() {
      this.loading = true;

      try {
        const { data } = await getSingleSet(this.$route.params.itemId);
        this.item = { ...this.item, ...data };
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
  },

  created() {
    this.item = this.$route.params;
  },

  mounted() {
    this.getSet();
  },
};
</script>
