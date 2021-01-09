<template>
  <div>
    <v-fab-transition>
      <v-btn
        v-if="$route.name !== 'Statistics'"
        :class="$vuetify.breakpoint.xsOnly && 'mb-3'"
        :style="{ zIndex: 5 }"
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
      v-if="$vuetify.breakpoint.xsOnly"
      :style="{ paddingRight: $route.meta.withExtensionBar ? '88px' : 0 }"
      color="green"
      fixed
      grow
      hide-on-scroll
    >
      <v-btn to="/minifigures">
        <span>Minifigures</span>
        <v-icon>mdi-human-male</v-icon>
      </v-btn>
      <v-btn to="/sets">
        <span>Sets</span>
        <v-icon>mdi-toy-brick</v-icon>
      </v-btn>
      <v-btn to="/statistics">
        <span>Statistics</span>
        <v-icon>mdi-chart-arc</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { eventBus } from '@/main';

export default {
  name: 'BottomNavigation',

  methods: {
    openAddDialog() {
      eventBus.$emit('openAddDialog', true);
    },
  },
};
</script>

<style>
.v-bottom-navigation.v-item-group .v-btn {
  height: inherit !important;
}
</style>
