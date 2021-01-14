<template>
  <div>
    <v-fab-transition>
      <v-btn
        v-if="$route.name !== 'Statistics'"
        bottom
        :class="$vuetify.breakpoint.xsOnly && navIsVisible && 'mb-3'"
        color="green"
        dark
        fab
        fixed
        right
        :style="{ zIndex: 5, transitionProperty: 'margin-bottom' }"
        @click="openAddDialog"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-bottom-navigation
      v-if="$vuetify.breakpoint.xsOnly"
      color="green"
      fixed
      grow
      hide-on-scroll
      :input-value="true"
      shift
      :style="{ paddingRight: $route.meta.withExtensionBar ? '88px' : 0 }"
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
    <v-bottom-sheet
      v-if="$vuetify.breakpoint.xsOnly"
      v-model="mobileMenu"
    >
      <v-sheet
        class="text-center"
        height="100vh"
        :style="{ overflowY: 'auto' }"
      >
        <v-container class="mb-12">
          <v-row
            class="pa-3"
            justify="space-between"
          >
            <v-btn
              icon
              @click="handleLogout"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
            <switcher-view></switcher-view>
            <v-btn
              icon
              @click="handleSwitchDarkMode"
            >
              <v-icon v-if="darkMode">mdi-weather-sunny</v-icon>
              <v-icon v-else>mdi-weather-night</v-icon>
            </v-btn>
          </v-row>
          <filter-category></filter-category>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '@/main';
import FilterCategory from '@/components/FilterCategory.vue';
import SwitcherView from '@/components/SwitcherView.vue';
import { SET_DARK_MODE } from '@/store/types';

export default {
  name: 'BottomNavigation',

  components: {
    FilterCategory,
    SwitcherView,
  },

  data: () => ({
    navIsVisible: true,
    mobileMenu: false,
  }),

  methods: {
    openAddDialog() {
      eventBus.$emit('openAddDialog', true);
    },

    test(val) {
      this.navIsVisible = val;
    },

    handleLogout() {
      localStorage.removeItem('accessString');
      window.location.reload();
    },

    handleSwitchDarkMode() {
      localStorage.setItem('darkMode', Number(!this.$vuetify.theme.dark));
      this.$store.dispatch(SET_DARK_MODE, !this.$vuetify.theme.dark);
    },
  },

  created() {
    eventBus.$on('openMobileSettings', (value) => {
      this.mobileMenu = value;
    });
  },

  computed: {
    ...mapState({ darkMode: (state) => state.darkMode }),
  },
};
</script>

<style>
.v-bottom-navigation.v-item-group .v-btn {
  height: inherit !important;
}
</style>
