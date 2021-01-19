<template>
  <v-card
    class="mx-auto"
    outlined
  >
    <v-img
      contain
      height="200px"
      light
      :src="item.image.base"
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
      <!-- <v-btn
        text
        @click="expanded = !expanded"
      >
        {{ expanded ? $t('less') : $t('more') }}
      </v-btn> -->
      <v-card-subtitle class="pa-2">
        {{ $t('qty') }}: {{ item.qty }}
        <!-- {{ formatSetId(item.itemId) }} | {{ categoryName(item.categoryId) }} -->
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
