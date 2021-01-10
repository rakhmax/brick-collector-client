<template>
  <v-card class="mx-auto" outlined>
    <v-img
      :src="item.image.base"
      :style="{ background: '#fff' }"
      contain
      height="200px"
      light
    />
    <v-card-title
      :style="{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }"
      class="d-block"
    >
      {{ item.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ item.itemId }} | {{ themeName(item.categoryId) }}
    </v-card-subtitle>
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
import { getThemeNameById } from '@/helpers/themeHelper';
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

  computed: {
    themeName() {
      return (themeId) => getThemeNameById.call(this, themeId);
    },
  },
};
</script>
