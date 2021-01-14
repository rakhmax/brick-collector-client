<template>
  <div>
    <v-list
      v-if="$vuetify.breakpoint.xsOnly"
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
    <v-select
      v-else
      v-model="categoryFilter"
      class="mr-2"
      clearable
      dense
      flat
      hide-details
      :items="categories"
      :label="$t('category')"
      multiple
      solo
      :style="{ maxWidth: '300px' }"
      @change="handleCategoryFilter"
    ></v-select>
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
              text: this.categoryName(category),
              value: category,
            }),
          );
        }
        if (this.$route.name === 'Minifigures') {
          return Array.from(
            new Set(state.minifigures.map((minifig) => minifig.categoryId)),
            (category) => ({
              text: this.categoryName(category),
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
