<template>
  <div :style="{ marginBottom: '110px' }">
    <cards-items
      v-if="true"
      :items="sets"
      :search="search"
    >
      <template #item="{ item }">
        <card-item :item="item">
          <template #info>
            <div>
              <p v-if="item.price">Price: {{ item.price }}</p>
              <p v-if="item.minifiguresCount">Minifigures: {{ item.minifiguresCount }}</p>
              <p>Parts: {{ item.pieces }}</p>
              <p v-if="item.price">
                Price per piece: {{ Number(item.price / item.pieces).toFixed(2) }}
              </p>
              <p v-if="item.extraPieces">Extra parts: {{ item.extraPieces }}</p>
              <p>Release year: {{ item.year }}</p>
              <p>Count: {{ item.count }}</p>
              <p v-if="item.comment">Comment: {{ item.comment }}</p>
            </div>
          </template>
        </card-item>
      </template>
    </cards-items>
    <table-items
      v-else
      :items="sets"
      :search="search"
      itemType="Set"
    >
      <template #info="{ item }">
        <div>
          <p v-if="item.minifiguresCount">Minifigures: {{ item.minifiguresCount }}</p>
          <p>Parts: {{ item.pieces }}</p>
          <p v-if="item.price">
            Price per piece: {{ Number(item.price / item.pieces).toFixed(2) }}
          </p>
          <p v-if="item.extraPieces">Extra parts: {{ item.extraPieces }}</p>
          <p>Release year: {{ item.year }}</p>
          <p>Count: {{ item.count }}</p>
          <p v-if="item.comment">Comment: {{ item.comment }}</p>
        </div>
      </template>
    </table-items>
    <dialog-edit-item />
  </div>
</template>

<script>
import { eventBus } from '@/main';
import CardsItems from '@/components/CardsItems.vue';
import CardItem from '@/components/CardItem.vue';
import DialogEditItem from '@/components/DialogEditItem.vue';
import TableItems from '@/components/TableItems.vue';
import { GET_SETS } from '@/store/types';

export default {
  name: 'Sets',

  components: {
    CardItem,
    CardsItems,
    DialogEditItem,
    TableItems,
  },

  data: () => ({
    checkbox: false,
    search: null,
  }),

  methods: {
    fetchSets() {
      this.$store.dispatch(GET_SETS);
    },
  },

  computed: {
    sets() {
      if (this.checkbox) {
        return this.$store.state.sets.filter((set) => set.sealed);
      }

      return this.$store.state.sets;
    },
  },

  created() {
    eventBus.$on('changeSearchValue', ({ search }) => {
      this.search = search;
    });
  },

  mounted() {
    this.fetchSets();
  },
};
</script>
