<template>
  <v-menu bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        :disabled="$store.state.loading"
        icon
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="openEditDialog(item)">
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item>
      <v-list-item @click="deleteItem(item.itemId)">
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-if="item.minifiguresCount"
        @click="deleteItem(item.itemId, true)"
      >
        <v-list-item-title>Delete with minifigures</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { eventBus } from '@/main';
import { DELETE_MINIFIGURE, DELETE_SET } from '@/store/types';

export default {
  name: 'TableActions',

  props: {
    item: Object,
    itemType: String,
  },

  watch: {
    itemType(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
  },

  methods: {
    openEditDialog(item) {
      eventBus.$emit('open', {
        item,
        dialog: true,
      });
    },

    deleteItem(itemId, withMinifigures = false) {
      debugger;
      this.$store.dispatch(this.actionTypes.delete, { itemId, withMinifigures });
    },
  },

  computed: {
    actionTypes() {
      debugger;
      if (this.itemType === 'Minifig') return { delete: DELETE_MINIFIGURE };
      if (this.itemType === 'Set') return { delete: DELETE_SET };

      return {};
    },
  },
};
</script>
