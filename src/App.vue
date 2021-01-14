<template>
  <v-app>
    <router-view name="login"></router-view>
    <div v-if="isAuthentificated">
      <sidebar v-if="$vuetify.breakpoint.smAndUp"></sidebar>
      <v-main :class="$vuetify.breakpoint.smAndUp && 'ml-14'">
        <app-bar></app-bar>
        <router-view></router-view>
      </v-main>
      <bottom-navigation></bottom-navigation>
    </div>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import BottomNavigation from '@/components/BottomNavigation.vue';
import Sidebar from '@/components/Sidebar.vue';
import { GET_DOLLAR_RATE, GET_CATEGORIES, SET_DARK_MODE } from '@/store/types';
import isAuthentificated from '@/helpers/auth';

export default {
  name: 'App',

  components: {
    AppBar,
    BottomNavigation,
    Sidebar,
  },

  computed: {
    isAuthentificated() {
      return isAuthentificated();
    },
  },

  created() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('darkMode')) {
        if (e.matches) {
          this.$store.dispatch(SET_DARK_MODE, true);
        } else {
          this.$store.dispatch(SET_DARK_MODE, false);
        }
      }
    });
  },

  mounted() {
    this.$store.dispatch(GET_CATEGORIES);
    this.$store.dispatch(GET_DOLLAR_RATE);
    this.$store.dispatch(SET_DARK_MODE, this.$store.state.darkMode);
  },
};
</script>

<style>
.v-image .v-responsive__content {
  width: auto !important;
}
.ps {
  height: 5000px;
}
</style>
