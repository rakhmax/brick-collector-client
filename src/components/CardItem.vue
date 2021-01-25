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
};
</script>
