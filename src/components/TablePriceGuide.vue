<template>
  <div>
    <v-btn
      v-if="!priceGuide.used"
      :block="block"
      :loading="loading"
      outlined
      @click.stop="getPriceGuide"
    >{{ $t('getPriceGuide') }}</v-btn>
    <div v-else>
      <h3>{{ $t('priceGuide') }}</h3>
      <v-simple-table dense>
        <template #default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">{{ $t('min') }}</th>
              <th class="text-left">{{ $t('avg') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ $t('new') }}</td>
              <td>{{ priceGuide.new.min }}</td>
              <td>{{ priceGuide.new.avg }}</td>
            </tr>
            <tr>
              <td>{{ $t('used') }}</td>
              <td>{{ priceGuide.used.min }}</td>
              <td>{{ priceGuide.used.avg }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import { getPriceGuideByItemIdAndType } from '@/helpers/priceGuide';

export default {
  name: 'TablePriceGuide',

  props: {
    item: Object,
    itemType: String,
  },

  data: () => ({
    priceGuide: {},
    loading: false,
  }),

  methods: {
    async getPriceGuide() {
      this.loading = true;
      this.priceGuide = await getPriceGuideByItemIdAndType(
        this.item, this.priceGuide.itemId, this.itemType,
      );
      this.loading = false;
    },
  },

  watch: {
    item() {
      this.priceGuide = {};
    },
  },

  computed: {
    block() {
      const { layout } = this.$store.state;

      return layout === '0'
        || layout === '1'
        || this.$vuetify.breakpoint.xsOnly
        || false;
    },
  },
};
</script>
