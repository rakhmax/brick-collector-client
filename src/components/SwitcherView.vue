<template>
  <v-btn-toggle
    v-model="layout"
    class="btn-group"
    dense
    @change="handleChangeLayout"
  >
    <v-btn class="btn-group__item">
      <v-icon>mdi-view-grid</v-icon>
    </v-btn>
    <v-btn class="btn-group__item">
      <v-icon>mdi-view-list</v-icon>
    </v-btn>
    <v-btn class="btn-group__item">
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

<style scoped lang="scss">
  @import '~vuetify/src/styles/styles.sass';
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    .btn-group {
      width: calc(100% - 42px);

      &__item {
        width: calc(100% / 3)
      }
    }
  }
</style>
