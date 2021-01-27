<template>
  <v-card
    flat
    :rounded="false"
  >
    <v-card-title>{{ $t('minifigures') }}</v-card-title>
    <v-row>
      <v-col
        v-for="(stat, idx) in stats"
        :key="stat.title + idx"
        cols="12"
        md="3"
        sm="6"
      >
        <v-card-text>
          <div>{{ stat.title }}</div>
          <p class="display-1 text--primary">
            <number
              easing="Power1.easeOut"
              :from="0"
              :to="stat.value"
            ></number>
          </p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { GET_MINIFIGURES } from '@/store/types';

export default {
  name: 'StatisticsMinifigures',

  computed: {
    ...mapState({
      stats({ minifigures }) {
        return [
          {
            title: this.$t('total'),
            value: minifigures.reduce((acc, minifigure) => {
              if (minifigure.qty) {
                return acc + minifigure.qty;
              }
              return acc;
            }, 0),
          },
          {
            title: this.$t('unique'),
            value: minifigures.length || 0,
          },
          {
            title: this.$t('dups'),
            value: minifigures.reduce((acc, minifigure) => {
              if (minifigure.qty) {
                return acc + minifigure.qty;
              }
              return acc;
            }, 0) - minifigures.length,
          },
          {
            title: this.$t('overallPrice'),
            value: minifigures.reduce((acc, minifigure) => {
              if (minifigure.price) {
                return acc + minifigure.price;
              }
              return acc;
            }, 0),
          },
        ];
      },
    }),
  },

  created() {
    this.$store.dispatch(GET_MINIFIGURES);
  },
};
</script>
