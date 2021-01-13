<template>
  <v-card class="mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      >
      <v-img
        :src="item.image.thumbnail"
        :style="{ background: '#fff' }"
        contain
        light
      />
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="overline mb-4">
          {{ formatSetId(item.itemId) }}
        </div>
        <v-list-item-title :title="item.name" class="headline mb-1">
          {{ item.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ categoryName(item.categoryId) }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn
        @click="expanded = !expanded"
        text
      >
        {{ expanded ? $t('less') : $t('more') }}
      </v-btn>
      <v-spacer />
      <actions :item="item" :itemType="itemType" />
    </v-card-actions>
    <v-expand-transition>
      <div v-show="expanded">
        <v-divider />
        <v-card-text>
          <slot name="info" />
          <table-price-guide
            :item="item"
            :itemType="itemType"
          />
        </v-card-text>

      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import Actions from '@/components/Actions.vue';
import TablePriceGuide from './TablePriceGuide.vue';

export default {
  name: 'CardMinifigure',

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
