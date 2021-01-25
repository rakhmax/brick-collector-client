<template>
  <v-menu
    bottom
    @click.native.stop.prevent
  >
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        :disabled="$store.state.loading"
        icon
        v-on="on"
        @click.native.stop.prevent
      >
        <v-icon :small="layout === '2'"> mdi-dots-vertical </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-if="$route.name === 'Wishlist'"
        @click="moveToCollection(item.itemId)"
      >
        <v-list-item-title>{{ $t('moveToCol') }}</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-else
        @click="openEditDialog(item)"
      >
        <v-list-item-title>{{ $t('edit') }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="deleteItem(item.itemId)">
        <v-list-item-title>{{ $t('delete') }}</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-if="item.minifigures && $route.name !== 'Wishlist'"
        @click="deleteItem(item.itemId, item.minifigures, true)"
      >
        <v-list-item-title>{{ $t('deleteWithMinifigures') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '@/main';
import { DELETE_MINIFIGURE, DELETE_SET, UPDATE_WISHLIST } from '@/store/types';

export default {
  name: 'Actions',

  props: {
    item: Object,
    itemType: String,
  },

  methods: {
    openEditDialog(item) {
      eventBus.$emit('openEditDialog', {
        item,
        dialog: true,
      });
    },

    moveToCollection(itemId) {
      this.$store.dispatch(UPDATE_WISHLIST, {
        itemId,
        type: this.itemType.charAt(0),
        inWishlist: false,
      });
    },

    deleteItem(itemId, minifigures = [], withMinifigures = false) {
      this.$store.dispatch(this.actionTypes.delete, {
        itemId,
        minifigures,
        withMinifigures,
      });
    },
  },

  computed: {
    ...mapState({ layout: ({ layout }) => layout }),

    actionTypes() {
      if (this.itemType === 'Minifig') return { delete: DELETE_MINIFIGURE };
      if (this.itemType === 'Set') return { delete: DELETE_SET };

      return {};
    },
  },
};
</script>
