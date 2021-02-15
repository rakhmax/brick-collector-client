<template>
  <v-badge
    class="mx-auto"
    color="success"
    overlap
    :style="{ width: '100%' }"
    :value="item.sealed || 0"
  >
    <v-card
      class="mx-auto"
      outlined
      :ripple="false"
      :to="{
        name: itemType === 'Set' ? 'Set' : 'Minifigure',
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
          :lazy-src="item.thumbnail"
          light
          :src="item.image"
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
    </v-card>
  </v-badge>
</template>

<script>
import Actions from '@/components/Actions.vue';

export default {
  name: 'ListItem',

  components: {
    Actions,
  },

  props: {
    item: Object,
    itemType: String,
  },
};
</script>
