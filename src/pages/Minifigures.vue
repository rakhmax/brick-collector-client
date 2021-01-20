<template>
  <div :style="{ marginBottom: '110px' }">
    <card-view
      v-if="layout === '0'"
      :items="minifigures"
      :search="search"
    >
      <template #item="{ item }">
        <card-item
          :item="item"
          :item-type="itemType"
        ></card-item>
      </template>
    </card-view>
    <list-view
      v-if="layout === '1'"
      :item-type="itemType"
      :items="minifigures"
      :search="search"
    >
      <template #item="{ item }">
        <list-item
          :item="item"
          :item-type="itemType"
        ></list-item>
      </template>
    </list-view>
    <table-view
      v-if="layout === '2'"
      :item-type="itemType"
      :items="minifigures"
      :search="search"
    >
      <template #item="{ item }">
        <table-item
          :item="item"
          :item-type="itemType"
        ></table-item>
      </template>
    </table-view>
    <dialog-add-item :item-type="itemType"></dialog-add-item>
    <dialog-edit-item :item-type="itemType"></dialog-edit-item>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '@/main';
import CardItem from '@/components/CardItem.vue';
import ListItem from '@/components/ListItem.vue';
import TableItem from '@/components/TableItem.vue';
import DialogAddItem from '@/components/DialogAddItem.vue';
import DialogEditItem from '@/components/DialogEditItem.vue';
import CardView from '@/views/CardView.vue';
import ListView from '@/views/ListView.vue';
import TableView from '@/views/TableView.vue';
import { GET_MINIFIGURES } from '@/store/types';

export default {
  name: 'Minifigures',

  components: {
    CardItem,
    CardView,
    ListView,
    DialogAddItem,
    DialogEditItem,
    TableView,
    TableItem,
    ListItem,
  },

  data: () => ({
    itemType: 'Minifig',
    minifigures: [],
    search: null,
  }),

  methods: {
    async fetchMinifigures() {
      await this.$store.dispatch(GET_MINIFIGURES);
      this.minifigures = this.allMinifigs;
    },
  },

  watch: {
    allMinifigs(newVal) {
      this.minifigures = newVal;
    },
  },

  computed: {
    ...mapState({
      layout: 'layout',
      allMinifigs: 'minifigures',
      moreThenOne: ({ minifigures }) => minifigures.filter((minifig) => minifig.qty > 1),
    }),
  },

  created() {
    eventBus.$on('changeSearchValue', ({ search }) => {
      this.search = search;
    });

    eventBus.$on('changeFilter', (value) => {
      if (value === 'moreThenOneOnly') this.minifigures = this.moreThenOne;
      else this.minifigures = this.allMinifigs;
    });

    eventBus.$on('changeYearFilter', (value) => {
      if (!value || !value.length) this.minifigures = this.allMinifigs;
      else {
        this.minifigures = this.minifigures
          .filter((minifig) => value.includes(minifig.year));
      }
    });

    eventBus.$on('changeCategoryFilter', (value) => {
      if (!value || !value.length) this.minifigures = this.allMinifigs;
      else {
        this.minifigures = this.minifigures
          .filter((minifig) => value.includes(minifig.categoryId));
      }
    });
  },

  mounted() {
    this.fetchMinifigures();
  },
};
</script>
