<template>
  <v-container
    fluid
    :style="{ marginBottom: '110px' }"
  >
    <statistics-minifigures></statistics-minifigures>
    <statistics-sets></statistics-sets>
  </v-container>
</template>

<script>
import StatisticsMinifigures from '@/components/StatisticsMinifigures.vue';
import StatisticsSets from '@/components/StatisticsSets.vue';

export default {
  name: 'Statistics',

  components: {
    StatisticsMinifigures,
    StatisticsSets,
  },
};
</script>
