<template>
  <v-navigation-drawer
    :style="{ marginTop: '96px', paddingBottom: '96px' }"
    fixed
    color="#f5f5f5"
    mini-variant
    permanent
  >
    <v-list nav dense class="pt-2">
      <v-list-item link class="px-2" to="/minifigures">
        <v-list-item-icon>
          <v-icon>mdi-human-male</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Minifigures</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/sets">
        <v-list-item-icon>
          <v-icon>mdi-toy-brick</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Sets</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/statistics">
        <v-list-item-icon>
          <v-icon>mdi-chart-arc</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Statistics</v-list-item-title>
      </v-list-item>
    </v-list>
    <template #append>
      <v-list nav dense>
        <v-list-item @click="handleLogout">
          <v-list-item-icon class="mx-0">
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',

  methods: {
    handleLogout() {
      localStorage.removeItem('accessString');

      window.location.reload();
    },
  },
};
</script>
