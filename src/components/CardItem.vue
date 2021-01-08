<template>
  <v-card class="mx-auto">
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
    <v-card-subtitle>{{ item.itemId }}</v-card-subtitle>
    <v-card-actions>
      <v-btn
        @click="expanded = !expanded"
        text
      >
        {{ expanded ? 'Less' : 'More' }}
      </v-btn>
      <v-spacer />
      <actions :item="item" />
    </v-card-actions>
    <v-expand-transition>
      <div v-show="expanded">
        <v-divider />
        <v-card-text>
          <slot name="info" />
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import Actions from '@/components/Actions.vue';

export default {
  name: 'CardMinifigure',

  components: {
    Actions,
  },

  props: {
    item: Object,
  },

  data: () => ({
    expanded: false,
  }),
};
</script>
