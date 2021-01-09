<template>
  <div :style="{ marginBottom: '110px' }">
    <cards-items
      v-if="isCardLayout"
      :items="minifigures"
      :search="search"
    >
      <template #item="{ item }">
        <card-item :item="item" :itemType="itemType">
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
      :itemType="itemType"
      :search="search"
    >
      <template #info="{ item }">
        <div>
          <p>Release year: {{ item.year }}</p>
          <p>Count: {{ item.count }}</p>
          <p v-if="item.comment">Comment: {{ item.comment }}</p>
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

    ...mapState({ isCardLayout: (state) => state.isCardLayout }),
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
