<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="auto"
      >
        <v-window
          v-model="onboarding"
          dark
          show-arrows
        >
          <v-window-item
            v-for="image in images"
            :key="image.url"
          >
            <v-img
              aspect-ratio="1"
              class="mx-auto"
              contain
              :lazy-src="image.lazy || image.url"
              light
              :src="image.url"
              :style="{ background: '#fff' }"
              width="300px"
            ></v-img>
          </v-window-item>
        </v-window>
      </v-col>
      <v-col>
        <h2 v-html="item.name"></h2>
        <p>{{ categoryName(item.categoryId) }}</p>
        <p v-if="item.price">{{ $t('price') }}: {{ formatPrice(item.price) }}</p>
        <p>{{ $t('qty') }}: {{ item.qty }}</p>
        <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
        <p>
          <a
            :href="`https://www.lego.com/en-my/service/buildinginstructions/${formatSetId(item.itemId)}`"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ $t('instruction') }}
          </a>
        </p>
        <p>
          <a
            :href="`https://www.bricklink.com/v2/catalog/catalogitem.page?S=${item.itemId}#T=S&O={%22loc%22:%22RU%22,%22iconly%22:0}`"
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
          item-type="Set"
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
  name: 'SetItem',

  components: {
    ListParts,
    TablePriceGuide,
  },

  data: () => ({
    loading: false,
    item: {},
    onboarding: 0,
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

  computed: {
    images() {
      return [
        {
          url: this.item.image,
          lazy: this.item.thumbnail,
        },
        {
          url: `https://img.bricklink.com/ItemImage/ON/0/${this.$route.params.itemId}.png`,
          lazy: `https://img.bricklink.com/ItemImage/OT/0/${this.$route.params.itemId}.t1.png`,
        },
        {
          url: `https://img.bricklink.com/ItemImage/IN/0/${this.$route.params.itemId}.png`,
          lazy: `https://img.bricklink.com/ItemImage/IT/0/${this.$route.params.itemId}.t1.png`,
        },
      ];
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
