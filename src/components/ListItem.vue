<template>
  <v-card
    class="mx-auto"
    outlined
    :to="{
      path: `${$route.path}/${item.itemId}`,
      params: item
    }"
  >
    <v-list-item three-line>
      <v-list-item-avatar
        color="grey"
        size="80"
        tile
      >
      <v-img
        contain
        :lazy-src="`https://img.bricklink.com/${itemType.charAt(0)}/${item.itemId}.jpg`"
        light
        :src="`https://img.bricklink.com/${itemType.charAt(0)}/${item.itemId}.jpg`"
        :style="{ background: '#fff' }"
      ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-row
          align="center"
          class="px-3 pt-1"
          justify="space-between"
        >
          <span class="overline">{{ formatSetId(item.itemId) }}</span>
          <actions
            :item="item"
            :item-type="itemType"
          ></actions>
        </v-row>
        <v-list-item-title
          class="headline mb-1"
          :title="item.name"
          v-html="item.name"
        ></v-list-item-title>
        <v-list-item-subtitle>
          {{ categoryName(item.categoryId) }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          {{ $t('qty') }}: {{ item.qty }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
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
  name: 'ListItem',

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
