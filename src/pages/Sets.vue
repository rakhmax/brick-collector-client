<template>
  <div :style="{ marginBottom: '110px' }">
    <cards-view
      v-if="layout === '0'"
      :items="sets"
      :search="search"
    >
      <template #item="{ item }">
        <card-item
          :item="item"
          :itemType="itemType"
        >
          <template #info>
            <div>
              <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
              <p v-if="item.minifiguresCount">
                {{ $t('minifigures') }}: {{ item.minifiguresCount }}
              </p>
              <p>{{ $t('parts') }}: {{ item.pieces }}</p>
              <p v-if="item.extraPieces">{{ $t('extraParts') }}: {{ item.extraPieces }}</p>
              <p v-if="item.price">{{ $t('price') }}: {{ formatPrice(item.price) }}</p>
              <p v-if="item.price">
                {{ $t('ppp') }}: {{ formatPrice(item.price / item.pieces) }}
              </p>
              <p>{{ $t('qty') }}: {{ item.count }}</p>
              <p v-if="item.comment">{{ $t('comment') }}: {{ item.comment }}</p>
              <p>
                <a :href="'https://www.lego.com/en-us/service/buildinginstructions/' + formatSetId(item.itemId)">
                  {{ $t('instruction') }}
                </a>
              </p>
            </div>
          </template>
        </card-item>
      </template>
    </cards-view>
    <list-view
      v-if="layout === '1'"
      :items="sets"
      :itemType="itemType"
      :search="search"
    >
      <template #item="{ item }">
        <list-item :item="item" :itemType="itemType">
          <template #info>
            <div>
              <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
              <p v-if="item.minifiguresCount">
                {{ $t('minifigures') }}: {{ item.minifiguresCount }}
              </p>
              <p>{{ $t('parts') }}: {{ item.pieces }}</p>
              <p v-if="item.extraPieces">{{ $t('extraParts') }}: {{ item.extraPieces }}</p>
              <p v-if="item.price">{{ $t('price') }}: {{ formatPrice(item.price) }}</p>
              <p v-if="item.price">
                {{ $t('ppp') }}: {{ formatPrice(item.price / item.pieces) }}
              </p>
              <p>{{ $t('qty') }}: {{ item.count }}</p>
              <p v-if="item.comment">{{ $t('comment') }}: {{ item.comment }}</p>
              <p>
                <a :href="'https://www.lego.com/en-us/service/buildinginstructions/' + formatSetId(item.itemId)">
                  {{ $t('instruction') }}
                </a>
              </p>
            </div>
          </template>
        </list-item>
      </template>
    </list-view>
    <table-view
      v-if="layout === '2'"
      :items="sets"
      :itemType="itemType"
      :search="search"
    >
      <template #item="{ item }">
        <table-item
          :item="item"
          :itemType="itemType"
        >
          <template #info>
            <div>
              <p>{{ $t('releaseYear') }}: {{ item.year }}</p>
              <p v-if="item.minifiguresCount">
                {{ $t('minifigures') }}: {{ item.minifiguresCount }}
              </p>
              <p>{{ $t('parts') }}: {{ item.pieces }}</p>
              <p v-if="item.extraPieces">{{ $t('extraParts') }}: {{ item.extraPieces }}</p>
              <p v-if="item.price">
                {{ $t('ppp') }}: {{ formatPrice(item.price / item.pieces) }}
              </p>
              <p>{{ $t('qty') }}: {{ item.count }}</p>
              <p v-if="item.comment">{{ $t('comment') }}: {{ item.comment }}</p>
              <p>
                <a :href="'https://www.lego.com/en-us/service/buildinginstructions/' + formatSetId(item.itemId)">
                  {{ $t('instruction') }}
                </a>
              </p>
            </div>
          </template>
        </table-item>
      </template>
    </table-view>
    <dialog-add-item :itemType="itemType" />
    <dialog-edit-item :itemType="itemType" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '@/main';
import CardItem from '@/components/CardItem.vue';
import ListItem from '@/components/ListItem.vue';
import TableItem from '@/components/TableItem.vue';
import DialogAddItem from '@/components/DialogAddItem.vue';
import DialogEditItem from '@/components/DialogEditItem.vue';
import CardsView from '@/views/CardsView.vue';
import TableView from '@/views/TableView.vue';
import ListView from '@/views/ListView.vue';

import { GET_SETS } from '@/store/types';

export default {
  name: 'Sets',

  components: {
    CardItem,
    CardsView,
    DialogAddItem,
    DialogEditItem,
    TableView,
    TableItem,
    ListItem,
    ListView,
  },

  data: () => ({
    itemType: 'Set',
    search: null,
    sets: [],
  }),

  methods: {
    async fetchSets() {
      await this.$store.dispatch(GET_SETS);
      this.sets = this.allSets;
    },
  },

  computed: {
    ...mapState({
      layout: ({ layout }) => layout,
      sealedOnly: ({ sets }) => sets.filter((set) => set.sealed),
      moreThenOne: ({ sets }) => sets.filter((set) => set.count > 1),
      allSets: ({ sets }) => sets,
    }),
  },

  created() {
    eventBus.$on('changeSearchValue', ({ search }) => {
      this.search = search;
    });

    eventBus.$on('changeFilter', (value) => {
      if (value === 'sealedOnly') this.sets = this.sealedOnly;
      else if (value === 'moreThenOneOnly') this.sets = this.moreThenOne;
      else this.sets = this.allSets;
    });

    eventBus.$on('changeThemeFilter', (value) => {
      if (!value || !value.length) this.sets = this.allSets;
      else {
        this.sets = this.allSets
          .filter((set) => value.includes(set.categoryId));
      }
    });
  },

  mounted() {
    this.fetchSets();
  },
};
</script>
