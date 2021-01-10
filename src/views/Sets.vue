<template>
  <div :style="{ marginBottom: '110px' }">
    <cards-items
      v-if="isCardLayout"
      :items="filteredSets"
      :search="search"
    >
      <template #item="{ item }">
        <card-item
          :item="item"
          :itemType="itemType"
        >
          <template #info>
            <div>
              <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
              <p v-if="item.minifiguresCount">
                {{ $t('minifigures') }}: {{ item.minifiguresCount }}
              </p>
              <p>{{ $t('parts') }}: {{ item.pieces }}</p>
              <p v-if="item.extraPieces">{{ $t('extraParts') }}: {{ item.extraPieces }}</p>
              <p v-if="item.price">{{ $t('price') }}: {{ item.price }}</p>
              <p v-if="item.price">
                {{ $t('ppp') }}: {{ Number(item.price / item.pieces).toFixed(2) }}
              </p>
              <p>{{ $t('qty') }}: {{ item.count }}</p>
              <p v-if="item.comment">{{ $t('comment') }}: {{ item.comment }}</p>
            </div>
          </template>
        </card-item>
      </template>
    </cards-items>
    <table-items
      v-else
      :items="filteredSets"
      :itemType="itemType"
      :search="search"
    >
      <template #info="{ item }">
        <div>
          <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
          <p v-if="item.minifiguresCount">{{ $t('minifigures') }}: {{ item.minifiguresCount }}</p>
          <p>{{ $t('parts') }}: {{ item.pieces }}</p>
          <p v-if="item.extraPieces">{{ $t('extraParts') }}: {{ item.extraPieces }}</p>
          <p v-if="item.price">
            {{ $t('ppp') }}: {{ Number(item.price / item.pieces).toFixed(2) }}
          </p>
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
import { mapState } from 'vuex';
import { eventBus } from '@/main';
import CardsItems from '@/components/CardsItems.vue';
import CardItem from '@/components/CardItem.vue';
import DialogAddItem from '@/components/DialogAddItem.vue';
import DialogEditItem from '@/components/DialogEditItem.vue';
import TableItems from '@/components/TableItems.vue';
import { GET_SETS } from '@/store/types';

export default {
  name: 'Sets',

  components: {
    CardItem,
    CardsItems,
    DialogAddItem,
    DialogEditItem,
    TableItems,
  },

  data: () => ({
    itemType: 'Set',
    checkbox: false,
    search: null,
    sets: [],
  }),

  methods: {
    async fetchSets() {
      await this.$store.dispatch(GET_SETS);
      this.sets = this.$store.state.sets;
    },
  },

  computed: {
    ...mapState({
      isCardLayout: ({ isCardLayout }) => isCardLayout,
      sealedOnly: ({ sets }) => sets.filter((set) => set.sealed),
      moreThenOne: ({ sets }) => sets.filter((set) => set.count > 1),
    }),

    filteredSets: {
      get() {
        return this.sets;
      },
      set(newVal) {
        this.sets = newVal;
      },
    },
  },

  created() {
    eventBus.$on('changeSearchValue', ({ search }) => {
      this.search = search;
    });

    eventBus.$on('changeFilter', (value) => {
      if (value === 'sealedOnly') this.sets = this.sealedOnly;
      else if (value === 'moreThenOneOnly') this.sets = this.moreThenOne;
      else this.sets = this.$store.state.sets;
    });
  },

  mounted() {
    this.fetchSets();
  },
};
</script>
