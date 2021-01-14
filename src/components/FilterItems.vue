<template>
  <div :style="{ width: '100%' }">
    <v-select
      v-if="$vuetify.breakpoint.xsOnly"
      v-model="filterValue"
      dense
      flat
      hide-details
      :items="filters"
      label="Filter"
      solo
      @change="handleFilter"
    ></v-select>
    <v-radio-group
      v-else
      v-model="filterValue"
      hide-details
      row
      @change="handleFilter"
    >
      <v-radio
        v-for="filter in filters"
        :key="filter.value"
        :label="filter.text"
        :value="filter.value"
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
import { eventBus } from '@/main';

export default {
  name: 'FilterItems',

  data: () => ({
    filters: [],
    filterValue: 'all',
  }),

  watch: {
    $route({ name }) {
      this.filterValue = 'all';

      if (name === 'Sets') {
        this.filters.push(
          {
            text: this.$t('sealedOnly'),
            value: 'sealedOnly',
          },
        );
      } else {
        this.filters = this.filters.filter((filter) => filter.value !== 'sealedOnly');
      }
    },
    '$vuetify.lang.current': function () {
      this.filters = this.filters.map(({ value }) => ({
        value,
        text: this.$t(value),
      }));
    },
  },

  methods: {
    handleFilter(value) {
      eventBus.$emit('changeFilter', value);
    },
  },

  mounted() {
    this.filters = [
      {
        text: this.$t('all'),
        value: 'all',
      },
      {
        text: this.$t('moreThenOneOnly'),
        value: 'moreThenOneOnly',
      },
    ];
  },
};
</script>
