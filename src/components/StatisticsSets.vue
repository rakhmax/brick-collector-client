<template>
  <v-card
    class="mt-6"
    flat
    :rounded="false"
  >
    <v-card-title>{{ $t('sets') }}</v-card-title>
    <v-row>
      <v-col
        v-for="(stat, idx) in setsStatistics"
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

export default {
  name: 'StatisticsSets',

  computed: {
    setsStatistics() {
      return this.$store.getters.setsStatistics;
    },
  },

  created() {
    this.$store.dispatch(GET_SETS);
  },
};
</script>
