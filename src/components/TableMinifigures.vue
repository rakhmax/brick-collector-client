<template>
  <v-data-table
    :expanded="expanded"
    :headers="headers"
    :items="minifigures"
    :items-per-page="15"
    :loading="$store.state.loading"
    :search="search"
    item-key="itemId"
    loading-text="Loading minifigures..."
    show-expand
    single-expand
    sort-by="itemId"
  >
    <template #top>
      <dialog-edit-item v-show="false" />
      <v-container fluid>
        <v-checkbox
          v-model="checkbox"
          label="More than 1 only"
        />
      </v-container>
    </template>
    <template #item.categoryId="{ item }">
      {{themeName(item.categoryId)}}
    </template>
    <template #item.price="{ item }">
      <span v-if="item.price">
        {{ Number(item.price).toFixed(2) }}
      </span>
    </template>
    <template #item.actions="{ item }">
      <table-actions
        :item="item"
        itemType="Minifig"
      />
    </template>
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length" class="pa-0">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-img max-width="100%"
                :lazy-src="'http:' + item.image.base"
                :src="'http:' + item.image.base"
                contain
                max-height="200"
              ></v-img>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <div>
                <p>Release year: {{ item.year }}</p>
                <p>Count: {{ item.count }}</p>
                <p v-if="item.comment">Comment: {{ item.comment }}</p>
              </div>
            </v-col>
            <v-col cols="12">
              <table-price-guide
                :item="item"
                itemType="Minifig"
              />
            </v-col>
          </v-row>
        </v-container>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { eventBus } from '@/main';
import DialogEditItem from '@/components/DialogEditItem.vue';
import TableActions from '@/components/TableActions.vue';
import TablePriceGuide from '@/components/TablePriceGuide.vue';
import { GET_MINIFIGURES } from '@/store/types';
import tableHeaders from '@/helpers/tableHeaders';
import { getThemeNameById } from '@/helpers/themeHelper';

export default {
  name: 'TableMinifigures',

  components: {
    DialogEditItem,
    TableActions,
    TablePriceGuide,
  },

  data: () => ({
    checkbox: false,
    search: null,
    expanded: [],
    headers: tableHeaders,
  }),

  methods: {
    fetchMinifigures() {
      this.$store.dispatch(GET_MINIFIGURES);
    },
  },

  computed: {
    themeName() {
      return (themeId) => getThemeNameById.call(this, themeId);
    },

    minifigures() {
      if (this.checkbox) {
        return this.$store.state.minifigures.filter((minifig) => minifig.count > 1);
      }

      return this.$store.state.minifigures;
    },
  },

  created() {
    eventBus.$on('changeSearchValue', ({ search }) => {
      this.search = search;
    });
  },

  mounted() {
    this.fetchMinifigures();
  },
};
</script>
