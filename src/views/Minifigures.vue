<template>
  <div :style="{ marginBottom: '110px' }">
    <v-btn
      class="mx-2"
      fab
      dark
      small
      outlined
      @click="isCardView = !isCardView"
    >
      <v-icon dark>
        {{ isCardView ? 'mdi-view-list' : 'mdi-view-grid' }}
      </v-icon>
    </v-btn>
    <cards-items
      v-if="isCardView"
      :items="minifigures"
      :search="search"
    >
      <template #item="{ item }">
        <card-item :item="item">
          <template #info>
            <div>
              <p v-if="item.price">Price: {{ item.price }}</p>
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
      :items="minifigures"
      :search="search"
      itemType="Minifig"
    >
      <template #info="{ item }">
        <div>
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
import { GET_MINIFIGURES } from '@/store/types';

export default {
  name: 'Minifigures',

  components: {
    CardItem,
    CardsItems,
    DialogEditItem,
    TableItems,
  },

  data: () => ({
    checkbox: false,
    isCardView: true,
    search: null,
  }),

  methods: {
    fetchMinifigures() {
      this.$store.dispatch(GET_MINIFIGURES);
    },
  },

  computed: {
    minifigures() {
      if (this.checkbox) {
        return this.$store.state.minifigures.filter((minifig) => minifig.count > 1);
      }

      return this.$store.state.minifigures;
    },
  },

  created() {
    eventBus.$on('changeSearchValue', ({ search }) => {
      this.search = search;
    });
  },

  mounted() {
    this.fetchMinifigures();
  },
};
</script>
