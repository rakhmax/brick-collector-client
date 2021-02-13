<template>
  <div>
    <v-list
      dense
      flat
      :style="{ textAlign: 'left' }"
    >
      <v-subheader>{{ $t('category') }}</v-subheader>
      <v-list-item-group
        v-model="categoryFilter"
        multiple
        @change="handleCategoryFilter"
      >
        <v-list-item
          v-for="category in categories"
          :key="category.value"
          :value="category.value"
        >
          <template #default="{ active }">
            <v-list-item-content>
              <v-list-item-title>{{ category.text }}</v-list-item-title>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '@/main';

export default {
  name: 'FilterCategory',

  data: () => ({
    categoryFilter: [],
  }),

  methods: {
    handleCategoryFilter(value) {
      eventBus.$emit('changeCategoryFilter', value);
    },
  },

  computed: {
    ...mapState({
      categories(state) {
        if (this.$route.name === 'Sets') {
          return Array.from(
            new Set(state.sets.map((set) => set.categoryId)),
            (category) => ({
              text: `${this.categoryName(category)} (${state.sets.reduce((acc, set) => {
                if (set.categoryId === category) {
                  return acc + set.qty;
                }

                return acc;
              }, 0)})`,
              value: category,
            }),
          );
        }
        if (this.$route.name === 'Minifigures') {
          return Array.from(
            new Set(state.minifigures.map((minifig) => minifig.categoryId)),
            (category) => ({
              text: `${this.categoryName(category)} (${state.minifigures.reduce((acc, minifig) => {
                if (minifig.categoryId === category) {
                  return acc + minifig.qty;
                }

                return acc;
              }, 0)})`,
              value: category,
            }),
          );
        }

        return [];
      },
    }),
  },
};
</script>
