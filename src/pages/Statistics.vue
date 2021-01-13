<template>
  <v-container :style="{ marginBottom: '110px' }" fluid>
    <statistics-minifigures v-if="$store.state.statistics.minifigures" />
    <statistics-sets v-if="$store.state.statistics.sets" />
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
