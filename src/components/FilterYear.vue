<template>
  <div>
    <v-list
      dense
      flat
      :style="{ textAlign: 'left' }"
    >
      <v-subheader>Год</v-subheader>
      <v-list-item-group
        v-model="yearFilter"
        multiple
        @change="handleYearFilter"
      >
        <v-list-item
          v-for="year in years"
          :key="year.value"
          :value="year.value"
        >
          <template #default="{ active }">
            <v-list-item-content>
              <v-list-item-title>{{ year.text }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-checkbox
                color="primary"
                :input-value="active"
              ></v-checkbox>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <!-- <v-select
      v-else
      v-model="yearFilter"
      class="mr-2"
      clearable
      dense
      flat
      hide-details
      :items="years"
      :label="$t('year')"
      multiple
      solo
      :style="{ maxWidth: '300px' }"
      @change="handleYearFilter"
    ></v-select> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '@/main';

export default {
  name: 'FilterYear',

  data: () => ({
    yearFilter: [],
  }),

  methods: {
    handleYearFilter(value) {
      eventBus.$emit('changeYearFilter', value);
    },
  },

  computed: {
    ...mapState({
      years(state) {
        if (this.$route.name === 'Sets') {
          return Array.from(
            new Set(state.sets.map((set) => set.year)),
            (year) => ({
              text: year,
              value: year,
            }),
          );
        }
        if (this.$route.name === 'Minifigures') {
          return Array.from(
            new Set(state.minifigures.map((minifig) => minifig.year)),
            (year) => ({
              text: year,
              value: year,
            }),
          );
        }

        return [];
      },
    }),
  },
};
</script>
