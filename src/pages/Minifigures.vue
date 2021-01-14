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
        >
          <template #info>
            <div>
              <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
              <p v-if="item.price">{{ $t('price') }}: {{ formatPrice(item.price) }}</p>
              <p>{{ $t('qty') }}: {{ item.count }}</p>
              <p v-if="item.comment">{{ $t('comment') }}: {{ item.comment }}</p>
            </div>
          </template>
        </card-item>
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
        >
          <template #info>
            <div>
              <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
              <p v-if="item.price">{{ $t('price') }}: {{ formatPrice(item.price) }}</p>
              <p>{{ $t('qty') }}: {{ item.count }}</p>
              <p v-if="item.comment">{{ $t('comment') }}: {{ item.comment }}</p>
            </div>
          </template>
        </list-item>
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
        >
          <template #info>
            <div>
              <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
              <p>{{ $t('qty') }}: {{ item.count }}</p>
              <p v-if="item.comment">{{ $t('comment') }}: {{ item.comment }}</p>
            </div>
          </template>
          <template #actions="{ item }">
            <actions
              :item="item"
              :item-type="itemType"
            ></actions>
          </template>
        </table-item>
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

  computed: {
    ...mapState({
      layout: ({ layout }) => layout,
      moreThenOne: ({ minifigures }) => minifigures.filter((minifig) => minifig.count > 1),
      allMinifigs: ({ minifigures }) => minifigures,
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

    eventBus.$on('changeCategoryFilter', (value) => {
      if (!value || !value.length) this.minifigures = this.allMinifigs;
      else {
        this.minifigures = this.allMinifigs
          .filter((minifig) => value.includes(minifig.categoryId));
      }
    });
  },

  mounted() {
    this.fetchMinifigures();
  },
};
</script>
