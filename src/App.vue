<template>
  <v-app v-resize="onResize">
    <sidebar v-if="!isMobile" />
    <v-main :class="!isMobile && 'ml-14'">
      <app-bar />
      <router-view />
      <v-fab-transition>
        <v-btn
          :style="{ zIndex: 5 }"
          @click="dialog = true"
          class="mb-3"
          color="error"
          bottom
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
import { GET_THEMES } from '@/store/types';

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
    scrolledToBottom: false,
  }),

  mounted() {
    this.$store.dispatch(GET_THEMES);
    this.$vuetify.theme.dark = this.$store.state.darkMode;
    this.onResize();
    // this.onScroll();
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    onScroll() {
      window.onscroll = () => {
        console.log(this.scrolledToBottom);
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 56) {
          this.scrolledToBottom = true;
        } else {
          this.scrolledToBottom = false;
        }
      };
    },
  },

  computed: {
    isMobile() {
      return this.windowSize.x < 600;
    },
  },
};
</script>
