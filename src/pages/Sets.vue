<template>
  <div :style="{ marginBottom: '110px' }">
    <card-view
      v-if="layout === '0'"
      :items="sets"
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
      :items="sets"
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
      :items="sets"
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
import { GET_SETS } from '@/store/types';

export default {
  name: 'Sets',

  components: {
    CardItem,
    CardView,
    DialogAddItem,
    DialogEditItem,
    TableView,
    TableItem,
    ListItem,
    ListView,
  },

  data: () => ({
    itemType: 'Set',
    search: null,
    sets: [],
    filterRules: {},
  }),

  methods: {
    async fetchSets() {
      await this.$store.dispatch(GET_SETS);
      this.sets = this.allSets;
    },
  },

  watch: {
    allSets(newVal) {
      this.sets = newVal;
    },
  },

  computed: {
    ...mapState({
      layout: 'layout',
      allSets: 'sets',
      sealedOnly: ({ sets }) => sets.filter((set) => set.sealed),
      moreThenOne: ({ sets }) => sets.filter((set) => set.qty > 1),
    }),
  },

  created() {
    eventBus.$on('changeSearchValue', ({ search }) => {
      this.search = search;
    });

    eventBus.$on('changeFilter', (value) => {
      if (value === 'sealedOnly') this.sets = this.sealedOnly;
      else if (value === 'moreThenOneOnly') this.sets = this.moreThenOne;
      else this.sets = this.allSets;
    });

    // eventBus.$on('changeYearFilter', (value) => {
    //   if (!value || !value.length) this.sets = this.allSets;
    //   else {
    //     this.sets = this.sets
    //       .filter((set) => value.includes(set.year));
    //   }
    // });

    eventBus.$on('changeCategoryFilter', (value) => {
      // this.filterRules
      if (!value || !value.length) this.sets = this.allSets;
      else {
        this.sets = this.sets
          .filter((set) => value.includes(set.categoryId) && value.includes(set.categoryId));
      }
    });
  },

  mounted() {
    this.fetchSets();
  },
};
</script>
