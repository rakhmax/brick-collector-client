<template>
  <v-card
    class="mx-auto"
    outlined
    :to="{
      path: `${$route.path}/${item.itemId}`,
      params: item
    }"
  >
    <v-img
      contain
      height="200px"
      :lazy-src="`https://img.bricklink.com/${itemType.charAt(0)}L/${item.itemId}.jpg`"
      light
      :src="`https://img.bricklink.com/${itemType.charAt(0)}L/${item.itemId}.jpg`"
      :style="{ background: '#fff' }"
      width="auto"
    ></v-img>
    <v-card-title
      class="d-block"
      :style="{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }"
      :title="item.name"
      v-html="item.name"
    ></v-card-title>
    <v-card-subtitle>
      {{ formatSetId(item.itemId) }} | {{ categoryName(item.categoryId) }}
    </v-card-subtitle>
    <v-card-actions>
      <v-card-subtitle class="pa-2">
        {{ $t('qty') }}: {{ item.qty }}
      </v-card-subtitle>
      <v-spacer></v-spacer>
      <actions
        :item="item"
        :item-type="itemType"
      ></actions>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="expanded">
        <v-divider></v-divider>
        <v-card-text>
          <slot name="info"></slot>
          <table-price-guide
            :item="item"
            :item-type="itemType"
          ></table-price-guide>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import Actions from '@/components/Actions.vue';
import TablePriceGuide from '@/components/TablePriceGuide.vue';

export default {
  name: 'CardItem',

  components: {
    Actions,
    TablePriceGuide,
  },

  props: {
    item: Object,
    itemType: String,
  },

  data: () => ({
    expanded: false,
  }),
};
</script>
