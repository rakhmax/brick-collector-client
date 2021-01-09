<template>
  <v-app v-resize="onResize">
    <router-view name="login" />
    <div v-if="isAuthentificated">
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
    </div>
  </v-app>
</template>

<script>
import { debounce } from 'lodash';
import { mapState } from 'vuex';
import AppBar from '@/components/AppBar.vue';
import BottomNavigation from '@/components/BottomNavigation.vue';
import DialogAddItem from '@/components/DialogAddItem.vue';
import Sidebar from '@/components/Sidebar.vue';
import { GET_DOLLAR_RATE, GET_IS_MOBILE, GET_THEMES } from '@/store/types';
import isAuthentificated from './helpers/auth';

export default {
  name: 'App',

  components: {
    AppBar,
    BottomNavigation,
    DialogAddItem,
    Sidebar,
  },

  data: () => ({
    scrolledToBottom: false,
    dialog: false,
    windowSize: {
      x: 0,
      y: 0,
    },
  }),

  methods: {
    onResize: debounce(function () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
      this.$store.commit(GET_IS_MOBILE, this.windowSize.x < 600);
    }, 300),

    scroll() {
      console.log(window.scrollY === document.documentElement.offsetHeight - window.innerHeight);
    },
  },

  computed: {
    ...mapState({ isMobile: (state) => state.isMobile }),

    isAuthentificated() {
      return isAuthentificated();
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
