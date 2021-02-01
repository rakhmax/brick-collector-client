<template>
  <div class="py-3">
    <div class="mb-3">
      <span
        class="text-h6 ml-3"
        @click="handleExpand(0)"
      >{{ $t('minifigures') }}<v-icon>mdi-menu-down</v-icon></span>
      <v-expand-transition>
        <div v-show="expanded.includes(0)">
          <card-view
            v-if="layout === '0'"
            :items="minifigures"
            :search="search"
          >
            <template #item="{ item }">
              <card-item
                :item="item"
                item-type="Minifig"
              ></card-item>
            </template>
          </card-view>
          <list-view
            v-if="layout === '1'"
            item-type="Minifig"
            :items="minifigures"
            :search="search"
          >
            <template #item="{ item }">
              <list-item
                :item="item"
                item-type="Minifig"
              ></list-item>
            </template>
          </list-view>
          <table-view
            v-if="layout === '2'"
            item-type="Minifig"
            :items="minifigures"
            :search="search"
          >
            <template #item="{ item }">
              <table-item
                :item="item"
                item-type="Minifig"
              ></table-item>
            </template>
          </table-view>
        </div>
      </v-expand-transition>
    </div>
    <div class="mb-3">
      <span
        class="text-h6 ml-3"
        @click="handleExpand(1)"
      >{{ $t('sets') }}<v-icon>mdi-menu-down</v-icon></span>
      <v-expand-transition>
        <div v-show="expanded.includes(1)">
          <card-view
            v-if="layout === '0'"
            :items="sets"
            :search="search"
          >
            <template #item="{ item }">
              <card-item
                :item="item"
                item-type="Set"
              ></card-item>
            </template>
          </card-view>
          <list-view
            v-if="layout === '1'"
            item-type="Set"
            :items="sets"
            :search="search"
          >
            <template #item="{ item }">
              <list-item
                :item="item"
                item-type="Set"
              ></list-item>
            </template>
          </list-view>
          <table-view
            v-if="layout === '2'"
            item-type="Set"
            :items="sets"
            :search="search"
          ></table-view>
        </div>
      </v-expand-transition>
    </div>
    <dialog-add-item :item-type="itemType"></dialog-add-item>
    <dialog-edit-item :item-type="itemType"></dialog-edit-item>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { GET_WISHLIST } from '@/store/types';
import CardView from '@/views/CardView.vue';
import ListView from '@/views/ListView.vue';
import TableView from '@/views/TableView.vue';
import CardItem from '@/components/CardItem.vue';
import ListItem from '@/components/ListItem.vue';
import DialogAddItem from '@/components/DialogAddItem.vue';
import DialogEditItem from '@/components/DialogEditItem.vue';

export default {
  name: 'Wishlist',

  components: {
    CardView,
    ListView,
    TableView,
    CardItem,
    ListItem,
    DialogAddItem,
    DialogEditItem,
  },

  data: () => ({
    itemType: 'Wishlist',
    search: null,
    wishlist: {
      sets: [],
      minifigures: [],
    },
    filterRules: {},
    expanded: [0, 1],
  }),

  methods: {
    async fetchWishlist() {
      await this.$store.dispatch(GET_WISHLIST);
    },

    handleExpand(type) {
      if (!this.expanded.includes(type)) {
        this.expanded.push(type);
      } else {
        const idx = this.expanded.indexOf(type);

        if (idx !== -1) {
          this.expanded.splice(idx, 1);
        }
      }
    },
  },

  computed: {
    ...mapState({
      layout: 'layout',
      allWishlist: 'wishlist',
      minifigures: ({ wishlist }) => wishlist.minifigures,
      sets: ({ wishlist }) => wishlist.sets,
    }),
  },

  mounted() {
    this.fetchWishlist();
  },
};
</script>
