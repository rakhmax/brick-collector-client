<template>
  <div>
    <v-fab-transition>
      <v-btn
        v-if="allowToAdd"
        bottom
        color="green"
        dark
        fab
        fixed
        right
        @click="openAddDialog"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <!-- <v-bottom-navigation
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
    </v-bottom-navigation> -->
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
import AuthHelper from '@/helpers/auth';

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
      new AuthHelper().removeTokens();
      window.location.reload();
    },

    handleSwitchDarkMode() {
      localStorage.setItem('darkMode', Number(!this.$vuetify.theme.dark));
      this.$store.dispatch(SET_DARK_MODE, !this.$vuetify.theme.dark);
    },
  },

  computed: {
    ...mapState({ darkMode: (state) => state.darkMode }),

    allowToAdd() {
      return this.$route.name === 'Minifigures'
        || this.$route.name === 'Sets'
        || this.$route.name === 'Wishlist';
    },
  },

  created() {
    eventBus.$on('openMobileSettings', (value) => {
      this.mobileMenu = value;
    });
  },
};
</script>

<style scoped>
.v-bottom-navigation.v-item-group .v-btn {
  height: inherit !important;
}
.v-input__control {
  width: 100% !important
}
.v-label {
  width: 100% !important
}

.v-item-group > .v-btn {
  width: 53%;
}
</style>
