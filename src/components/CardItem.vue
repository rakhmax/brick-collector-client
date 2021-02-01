<template>
  <v-card
    class="mx-auto"
    outlined
    :ripple="false"
    :to="{
      name: itemType === 'Set' ? 'Set' : 'Minifigure',
      params: item
    }"
  >
    <v-img
      contain
      height="200px"
      :lazy-src="lazySrc"
      light
      :src="src"
      :style="{ background: '#fff' }"
      width="auto"
    ></v-img>
    <v-card-title
      class="d-block"
      :style="{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }"
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
  </v-card>
</template>

<script>
import Actions from '@/components/Actions.vue';

export default {
  name: 'CardItem',

  components: {
    Actions,
  },

  props: {
    item: Object,
    itemType: String,
  },

  computed: {
    lazySrc() {
      return `https://img.bricklink.com/${this.itemType.charAt(0)}/${this.item.itemId}.jpg`;
    },

    src() {
      return `https://img.bricklink.com/${this.itemType.charAt(0)}L/${this.item.itemId}.jpg`;
    },
  },
};
</script>
