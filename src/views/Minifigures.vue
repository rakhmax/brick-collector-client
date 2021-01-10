<template>
  <div :style="{ marginBottom: '110px' }">
    <cards-items
      v-if="isCardLayout"
      :items="filteredMinifigures"
      :search="search"
    >
      <template #item="{ item }">
        <card-item :item="item" :itemType="itemType">
          <template #info>
            <div>
              <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
              <p v-if="item.price">{{ $t('price') }}: {{ item.price }}</p>
              <p>{{ $t('qty') }}: {{ item.count }}</p>
              <p v-if="item.comment">{{ $t('comment') }}: {{ item.comment }}</p>
            </div>
          </template>
        </card-item>
      </template>
    </cards-items>
    <table-items
      v-else
      :items="filteredMinifigures"
      :itemType="itemType"
      :search="search"
    >
      <template #info="{ item }">
        <div>
          <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
          <p>{{ $t('qty') }}: {{ item.count }}</p>
          <p v-if="item.comment">{{ $t('comment') }}: {{ item.comment }}</p>
        </div>
      </template>
    </table-items>
    <dialog-add-item :itemType="itemType" />
    <dialog-edit-item :itemType="itemType" />
  </div>
</template>

<script>
import { eventBus } from '@/main';
import CardsItems from '@/components/CardsItems.vue';
import CardItem from '@/components/CardItem.vue';
import DialogAddItem from '@/components/DialogAddItem.vue';
import DialogEditItem from '@/components/DialogEditItem.vue';
import TableItems from '@/components/TableItems.vue';
import { GET_MINIFIGURES } from '@/store/types';
import { mapState } from 'vuex';

export default {
  name: 'Minifigures',

  components: {
    CardItem,
    CardsItems,
    DialogAddItem,
    DialogEditItem,
    TableItems,
  },

  data: () => ({
    itemType: 'Minifig',
    checkbox: false,
    isCardView: true,
    search: null,
    minifigures: [],
  }),

  methods: {
    async fetchMinifigures() {
      await this.$store.dispatch(GET_MINIFIGURES);
      this.minifigures = this.$store.state.minifigures;
    },
  },

  computed: {
    ...mapState({
      isCardLayout: (state) => state.isCardLayout,
      moreThenOne: ({ minifigures }) => minifigures.filter((minifig) => minifig.count > 1),
    }),

    filteredMinifigures: {
      get() {
        return this.minifigures;
      },
      set(newVal) {
        this.minifigures = newVal;
      },
    },
  },

  created() {
    eventBus.$on('changeSearchValue', ({ search }) => {
      this.search = search;
    });

    eventBus.$on('changeFilter', (value) => {
      if (value === 'moreThenOneOnly') this.minifigures = this.moreThenOne;
      else this.minifigures = this.$store.state.minifigures;
    });
  },

  mounted() {
    this.fetchMinifigures();
  },
};
</script>
