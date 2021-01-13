<template>
  <v-menu bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        :disabled="$store.state.loading"
        icon
      >
        <v-icon :small="layout === '2'">
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="openEditDialog(item)">
        <v-list-item-title>{{ $t('edit') }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="deleteItem(item.itemId)">
        <v-list-item-title>{{ $t('delete') }}</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-if="item.minifiguresCount"
        @click="deleteItem(item.itemId, true)"
      >
        <v-list-item-title>{{ $t('deleteWithMinifigures') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '@/main';
import { DELETE_MINIFIGURE, DELETE_SET } from '@/store/types';

export default {
  name: 'TableActions',

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

    deleteItem(itemId, withMinifigures = false) {
      this.$store.dispatch(this.actionTypes.delete, { itemId, withMinifigures });
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
