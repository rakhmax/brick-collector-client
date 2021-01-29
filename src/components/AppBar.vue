<template>
  <v-app-bar
    app
    color="light"
    flat
  >
    <v-btn
      v-if="singlePage"
      icon
      @click="$router.go(-1)"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-app-bar-title v-if="singlePage">{{ formatSetId($route.params.itemId) }}</v-app-bar-title>
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.smAndDown && !singlePage"
      @click.stop="openSidebar"
    ></v-app-bar-nav-icon>
    <v-app-bar-title v-if="$route.name === 'Statistics' && $vuetify.breakpoint.smAndDown">
      {{ $t('statistics') }}
    </v-app-bar-title>
    <v-app-bar-title v-if="$route.name === 'Wishlist' && $vuetify.breakpoint.smAndDown">
      {{ $t('wishlist') }}
    </v-app-bar-title>
    <div
      v-if="$vuetify.breakpoint.mdAndUp && !singlePage"
      class="d-flex align-center">
      <v-icon
        class="mr-3"
        color="green"
        x-large
      >mdi-toy-brick-marker</v-icon>
      <v-app-bar-title>BrickCollector</v-app-bar-title>
    </div>
    <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>
    <v-row
      v-if="$route.meta.withExtensionBar"
      align="center"
      class="ml-0"
    >
      <v-menu
        v-if="$vuetify.breakpoint.smAndUp"
        bottom
        max-height="500px"
        min-width="200px"
        offset-y
        rounded
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-tune</v-icon>
          </v-btn>
        </template>
        <v-card min-width="500px">
          <filter-category></filter-category>
        </v-card>
      </v-menu>
      <v-text-field
        v-model="searchText"
        clearable
        color="green"
        dense
        flat
        full-width
        hide-details
        :label="$t('searchCollection')"
        prepend-inner-icon="mdi-magnify"
        single-line
        solo
        :style="{ width: '200px' }"
        @blur="clearSearch"
        @input="handleSearch"
      ></v-text-field>
      <v-btn
        v-if="$vuetify.breakpoint.xsOnly"
        icon
        v-on="on"
        @click="openMobileSettings"
      >
        <v-icon>mdi-tune</v-icon>
      </v-btn>
    </v-row>
    <div
      v-if="$vuetify.breakpoint.mdAndUp"
      class="ml-4"
    >
      <v-menu
        bottom
        min-width="200px"
        offset-y
        rounded
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-avatar
              color="green"
              size="48">
              <span class="white--text headline">
                {{ username.charAt(0) }}
              </span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                class="mb-2"
                color="green"
              >
                <span class="white--text headline">
                  {{ username.charAt(0).toUpperCase() }}
                </span>
              </v-avatar>
              <h3>{{ username }}</h3>
              <v-divider class="my-3"></v-divider>
              <switcher-view></switcher-view>
              <v-checkbox
                class="pa-2"
                hide-details
                :input-value="darkMode"
                label="Темная тема"
                @change="handleSwitchDarkMode"
              ></v-checkbox>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="handleLogout"
              >{{ $t('logout') }}</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '@/main';
import { logout } from '@/api/auth';
import AuthHelper from '@/helpers/auth';
import { SET_DARK_MODE } from '@/store/types';
import FilterCategory from './FilterCategory.vue';
import SwitcherView from './SwitcherView.vue';

export default {
  name: 'AppBar',

  components: {
    FilterCategory,
    SwitcherView,
  },

  data: () => ({
    isSearch: false,
    searchText: null,
  }),

  methods: {
    clearSearch() {
      this.isSearch = false;
    },

    async handleLogout() {
      try {
        await logout();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },

    handleSearch() {
      eventBus.$emit('changeSearchValue', {
        search: this.searchText.trim(),
      });
    },

    handleSwitchDarkMode() {
      localStorage.setItem('darkMode', Number(!this.$vuetify.theme.dark));
      this.$store.dispatch(SET_DARK_MODE, !this.$vuetify.theme.dark);
    },

    openMobileSettings() {
      eventBus.$emit('openMobileSettings', true);
    },

    openSidebar() {
      eventBus.$emit('openSidebar', true);
    },
  },

  computed: {
    ...mapState({
      darkMode: 'darkMode',
      categories(state) {
        if (this.$route.name === 'Sets') {
          return Array.from(
            new Set(state.sets.map((set) => set.categoryId)),
            (category) => ({
              text: this.categoryName(category),
              value: category,
            }),
          );
        }
        if (this.$route.name === 'Minifigures') {
          return Array.from(
            new Set(state.minifigures.map((minifig) => minifig.categoryId)),
            (category) => ({
              text: this.categoryName(category),
              value: category,
            }),
          );
        }

        return [];
      },
    }),
    username() {
      const auth = new AuthHelper();

      return auth.getUsername();
    },

    singlePage() {
      return this.$route.name === 'Minifigure'
        || this.$route.name === 'Set';
    },
  },
};
</script>

<style>
.v-app-bar-title__content {
  width: auto !important;
}
</style>
