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
    <cards-minifigures :search="search" v-if="isCardView" />
    <table-minifigures :search="search" v-else />
    <dialog-edit-item v-show="false" />
  </div>
</template>

<script>
import { eventBus } from '@/main';
import CardsMinifigures from '@/components/CardsMinifigures.vue';
import DialogEditItem from '@/components/DialogEditItem.vue';
import TableMinifigures from '@/components/TableMinifigures.vue';
import { GET_MINIFIGURES } from '@/store/types';

export default {
  name: 'Minifigures',

  components: {
    CardsMinifigures,
    DialogEditItem,
    TableMinifigures,
  },

  data: () => ({
    isCardView: true,
    search: null,
  }),

  methods: {
    fetchMinifigures() {
      this.$store.dispatch(GET_MINIFIGURES);
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
