<template>
  <v-card flat :rounded="false">
    <v-card-title>{{ $t('minifigures') }}</v-card-title>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="(stat, idx) in minifiguresStatistics"
        :key="stat.title + idx"
      >
        <v-card-text>
          <div>{{ stat.title }}</div>
          <p class="display-1 text--primary">
            <number
              :from="0"
              :to="stat.value"
              easing="Power1.easeOut"
            />
          </p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { GET_MINIFIGURES } from '@/store/types';

export default {
  name: 'StatisticsMinifigures',

  computed: {
    minifiguresStatistics() {
      return this.$store.getters.minifiguresStatistics;
    },
  },

  created() {
    this.$store.dispatch(GET_MINIFIGURES);
  },
};
</script>
