<template>
  <div>
    <v-fab-transition>
      <v-btn
        v-if="$route.name !== 'Statistics'"
        :class="$vuetify.breakpoint.xsOnly && navIsVisible && 'mb-3'"
        :style="{ zIndex: 5, transitionProperty: 'margin-bottom' }"
        @click="openAddDialog"
        bottom
        color="green"
        dark
        fab
        fixed
        right
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-bottom-navigation
      :input-value="true"
      v-if="$vuetify.breakpoint.xsOnly"
      :style="{ paddingRight: $route.meta.withExtensionBar ? '88px' : 0 }"
      color="green"
      fixed
      grow
      hide-on-scroll
      @update:input-value="test"
    >
      <v-btn to="/sets">
        <span>{{ $t('sets') }}</span>
        <v-icon>mdi-toy-brick</v-icon>
      </v-btn>
      <v-btn to="/minifigures">
        <span>{{ $t('minifigures') }}</span>
        <v-icon>mdi-human-male</v-icon>
      </v-btn>
      <v-btn to="/statistics">
        <span>{{ $t('statistics') }}</span>
        <v-icon>mdi-chart-arc</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { eventBus } from '@/main';

export default {
  name: 'BottomNavigation',

  data: () => ({
    navIsVisible: true,
  }),

  methods: {
    openAddDialog() {
      eventBus.$emit('openAddDialog', true);
    },

    test(val) {
      this.navIsVisible = val;
    },
  },
};
</script>

<style>
.v-bottom-navigation.v-item-group .v-btn {
  height: inherit !important;
}
</style>
