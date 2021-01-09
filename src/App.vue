<template>
  <v-app>
    <router-view name="login" />
    <div v-if="isAuthentificated">
      <sidebar v-if="$vuetify.breakpoint.smAndUp" />
      <v-main :class="$vuetify.breakpoint.smAndUp && 'ml-14'">
        <app-bar />
        <router-view />
      </v-main>
      <bottom-navigation />
    </div>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import BottomNavigation from '@/components/BottomNavigation.vue';
import Sidebar from '@/components/Sidebar.vue';
import { GET_DOLLAR_RATE, GET_THEMES, SET_DARK_MODE } from '@/store/types';
import isAuthentificated from './helpers/auth';

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
    this.$store.dispatch(GET_THEMES);
    this.$store.dispatch(GET_DOLLAR_RATE);
    this.$store.dispatch(SET_DARK_MODE, this.$store.state.darkMode);
    this.$vuetify.theme.themes.light.primary = '#4caf50';
    this.$vuetify.theme.themes.dark.primary = '#4caf50';
  },

  destroyed() {
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change');
  },
};
</script>

<style>
  .v-image .v-responsive__content { width: auto !important }
</style>
