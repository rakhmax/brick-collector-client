<template>
  <v-navigation-drawer
    v-model="drawer"
    color="light"
    fixed
    :permanent="$vuetify.breakpoint.mdAndUp"
    :style="{
      marginTop: $vuetify.breakpoint.mdAndUp ? '64px' : 0,
      paddingBottom: $vuetify.breakpoint.mdAndUp ? '64px' : 0
    }"
  >
    <template
      v-if="$vuetify.breakpoint.smAndDown"
      #prepend
    >
      <v-list-item two-line>
        <v-list-item-avatar>
          <v-avatar
              color="green"
              size="48">
              <span class="white--text headline">
                {{ username.charAt(0) }}
              </span>
            </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ username }}</v-list-item-title>
          <!-- <v-list-item-subtitle>Logged In</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </template>

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
        <v-list-item-title>{{ $t('sets') }}</v-list-item-title>
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
        <v-list-item-title>{{ $t('minifigures') }}</v-list-item-title>
      </v-list-item>
      <v-list-item
        color="green"
        link
        to="/statistics"
      >
        <v-list-item-icon>
          <v-icon>mdi-chart-arc</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t('statistics') }}</v-list-item-title>
      </v-list-item>
      <v-list-item
        color="green"
        link
        to="/wishlist"
      >
        <v-list-item-icon>
          <v-icon>mdi-playlist-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t('wishlist') }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <template
      v-if="$vuetify.breakpoint.xsOnly"
      #append
    >
      <div class="pa-2">
        <v-btn
          block
          outlined
          @click="handleLogout"
        >
          {{ $t('logout') }}
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import { logout } from '@/api/auth';
import { SET_DARK_MODE } from '@/store/types';
import { eventBus } from '@/main';
import AuthHelper from '@/helpers/auth';

export default {
  name: 'Sidebar',

  data: () => ({
    drawer: true,
  }),

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

    username() {
      const auth = new AuthHelper();

      return auth.getUsername();
    },
  },

  created() {
    eventBus.$on('openSidebar', () => {
      this.drawer = !this.drawer;
    });
  },
};
</script>
