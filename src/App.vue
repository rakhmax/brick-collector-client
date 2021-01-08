<template>
  <v-app v-resize="onResize">
    <sidebar v-if="!isMobile" />
    <v-main :class="!isMobile && 'ml-14'">
      <app-bar />
      <router-view />
      <v-fab-transition>
        <v-btn
          v-if="$route.name !== 'Statistics'"
          :class="isMobile && 'mb-3'"
          :style="{ zIndex: 5 }"
          @click="dialog = true"
          bottom
          color="error"
          fab
          fixed
          right
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
      <dialog-add-item :dialog.sync="dialog" />
    </v-main>
    <bottom-navigation v-if="isMobile"/>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import BottomNavigation from '@/components/BottomNavigation.vue';
import DialogAddItem from '@/components/DialogAddItem.vue';
import Sidebar from '@/components/Sidebar.vue';
import { GET_DOLLAR_RATE, GET_THEMES } from '@/store/types';

export default {
  name: 'App',

  components: {
    AppBar,
    BottomNavigation,
    DialogAddItem,
    Sidebar,
  },

  data: () => ({
    dialog: false,
    windowSize: {
      x: 0,
      y: 0,
    },
  }),

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
  },

  computed: {
    isMobile() {
      return this.windowSize.x < 600;
    },
  },

  mounted() {
    this.$store.dispatch(GET_THEMES);
    this.$store.dispatch(GET_DOLLAR_RATE);
    this.$vuetify.theme.dark = this.$store.state.darkMode;
    this.onResize();
  },
};
</script>

<style>
  .v-image .v-responsive__content { width: auto !important }
</style>
