<template>
  <v-card flat :rounded="false" class="mt-6">
    <v-card-title>Sets</v-card-title>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="(stat, idx) in setsStatistics"
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
import { GET_SETS } from '../store/types';

export default {
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
