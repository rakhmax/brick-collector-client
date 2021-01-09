<template>
  <div>
    <v-btn
      v-if="!priceGuide.used"
      :block="block"
      :loading="loading"
      @click="getPriceGuide"
      outlined
    >Get price guide</v-btn>
    <div v-else>
      <h3>Price guide</h3>
      <v-simple-table dense>
        <template #default>
          <thead>
            <tr>
              <th class="text-left" />
              <th class="text-left">Min</th>
              <th class="text-left">Avg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>New</td>
              <td>{{ priceGuide.new.min }}</td>
              <td>{{ priceGuide.new.avg }}</td>
            </tr>
            <tr>
              <td>Used</td>
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
      const { isCardLayout, isMobile } = this.$store.state;

      return isCardLayout || isMobile;
    },
  },
};
</script>
