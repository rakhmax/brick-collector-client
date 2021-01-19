<template>
  <v-navigation-drawer
    color="light"
    fixed
    mini-variant
    permanent
    :style="{
      marginTop: $vuetify.breakpoint.mdAndUp
        ? $route.meta.withExtensionBar
          ? '112px'
          : '64px'
        : $route.meta.withExtensionBar
        ? '104px'
        : '56px',
      paddingBottom: $vuetify.breakpoint.mdAndUp
        ? $route.meta.withExtensionBar
          ? '112px'
          : '64px'
        : $route.meta.withExtensionBar
        ? '104px'
        : '56px',
      paddingTop: !$route.meta.withExtensionBar ? '48px' : 0,
    }"
  >
    <v-list
      class="pt-2"
      dense
      nav
    >
      <v-list-item
        color="green"
        link
        to="/sets"
      >
        <v-list-item-icon>
          <v-icon>mdi-toy-brick</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Sets</v-list-item-title>
      </v-list-item>
      <v-list-item
        class="px-2"
        color="green"
        link
        to="/minifigures"
      >
        <v-list-item-icon>
          <v-icon>mdi-human-male</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Minifigures</v-list-item-title>
      </v-list-item>
      <v-list-item
        color="green"
        link
        to="/statistics"
      >
        <v-list-item-icon>
          <v-icon>mdi-chart-arc</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Statistics</v-list-item-title>
      </v-list-item>
    </v-list>
    <template #append>
      <v-list
        dense
        nav
      >
        <v-tooltip right>
          <template #activator="{ on, attrs }">
            <v-list-item
              v-bind="attrs"
              v-on="on"
              @click="handleSwitchDarkMode"
            >
              <v-list-item-icon class="mx-0">
                <v-icon v-if="darkMode">mdi-weather-sunny</v-icon>
                <v-icon v-else>mdi-weather-night</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>
          <span v-if="darkMode">{{ $t('applyLightTheme') }}</span>
          <span v-else>{{ $t('applyDarkTheme') }}</span>
        </v-tooltip>
        <v-divider></v-divider>
        <v-tooltip right>
          <template #activator="{ on, attrs }">
            <v-list-item
              v-bind="attrs"
              v-on="on"
              @click="handleLogout"
            >
              <v-list-item-icon class="mx-0">
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>
          <span>{{ $t('logout') }}</span>
        </v-tooltip>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import { logout } from '@/api/auth';
import { SET_DARK_MODE } from '@/store/types';

export default {
  name: 'Sidebar',

  methods: {
    async handleLogout() {
      try {
        await logout();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },

    handleSwitchDarkMode() {
      localStorage.setItem('darkMode', Number(!this.$vuetify.theme.dark));
      this.$store.dispatch(SET_DARK_MODE, !this.$vuetify.theme.dark);
    },
  },

  computed: {
    ...mapState({ darkMode: (state) => state.darkMode }),
  },
};
</script>
