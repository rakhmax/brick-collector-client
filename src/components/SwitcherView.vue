<template>
  <v-btn-toggle
    v-model="layout"
    dense
    @change="handleChangeLayout"
  >
    <v-btn>
      <v-icon>mdi-view-grid</v-icon>
    </v-btn>
    <v-btn>
      <v-icon>mdi-view-list</v-icon>
    </v-btn>
    <v-btn>
      <v-icon>mdi-table-large</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import { SET_LAYOUT } from '@/store/types';

export default {
  name: 'SwitcherView',

  data: () => ({
    layout: null,
  }),

  methods: {
    handleChangeLayout(value) {
      if (value !== undefined) {
        this.$store.dispatch(SET_LAYOUT, value);
      }
    },
  },

  mounted() {
    this.layout = Number(this.$store.state.layout);
  },
};
</script>
