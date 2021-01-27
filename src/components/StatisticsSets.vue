<template>
  <v-card
    class="mt-6"
    flat
    :rounded="false"
  >
    <v-card-title>{{ $t('sets') }}</v-card-title>
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
import { GET_SETS } from '@/store/types';
import { mapState } from 'vuex';

export default {
  name: 'StatisticsSets',

  computed: {
    ...mapState({
      stats({ sets }) {
        return [
          {
            title: this.$t('total'),
            value: sets.reduce((acc, set) => {
              if (set.qty) {
                return acc + set.qty;
              }
              return acc;
            }, 0),
          },
          {
            title: this.$t('unique'),
            value: sets.length || 0,
          },
          {
            title: this.$t('dups'),
            value: sets.reduce((acc, set) => {
              if (set.qty) {
                return acc + set.qty;
              }
              return acc;
            }, 0) - sets.length,
          },
          {
            title: this.$t('overallPrice'),
            value: sets.reduce((acc, set) => {
              if (set.price) {
                return acc + set.price;
              }
              return acc;
            }, 0),
          },
        ];
      },
    }),
  },

  created() {
    this.$store.dispatch(GET_SETS);
  },
};
</script>
