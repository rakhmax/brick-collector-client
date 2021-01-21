<template>
  <v-data-iterator
    class="mt-8"
    hide-default-footer
    :items="parts"
    :items-per-page="-1"
    :loading="loading"
  >
    <template #default>
      <div
        v-if="minifigs.qty"
        class="mb-8"
      >
        <h3 class="mb-4">{{ $t('minifigures') }} ({{ minifigs.qty }})</h3>
        <v-badge
          v-for="part in minifigs.items"
          :key="part.name + part.color"
          bordered
          class="ma-2"
          color="error"
          :content="part.qty"
          overlap
          :value="part.qry"
        >
          <v-card
            v-if="part.type === 'MINIFIG' && !part.isCounterpart"
            outlined
            width="200px"
          >
            <v-img
              contain
              height="200px"
              :lazy-src="`https://img.bricklink.com/${part.type.charAt(0)}${part.color ? `/${part.color}` : ''}L/${part.no}.jpg`"
              light
              :src="`https://img.bricklink.com/${part.type.charAt(0)}${part.color ? `/${part.color}` : ''}L/${part.no}.jpg`"
              :style="{ background: '#fff' }"
              width="200px"
            ></v-img>
            <v-card-title
              class="d-block text-caption"
              :style="{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }"
              :title="part.name"
              v-html="part.name"
            ></v-card-title>
            <v-card-subtitle
              class="d-block text-caption"
              :style="{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }"
              :title="part.no"
              v-html="part.no"
            ></v-card-subtitle>
          </v-card>
        </v-badge>
      </div>
      <div
        v-if="parties.qty"
        class="mb-8"
      >
        <h3 class="mb-4">{{ $t('parts') }} ({{ parties.qty }})</h3>
        <v-badge
          v-for="part in parties.items"
          :key="part.name + part.color"
          bordered
          class="ma-2"
          color="error"
          :content="part.qty"
          overlap
          :value="part.qty"
        >
          <v-card
            height="125px"
            outlined
            :style="{ overflow: 'hidden' }"
            width="100px"
          >
            <div class="pa-2">
              <v-img
                class="mb-3"
                :lazy-src="`https://img.bricklink.com/${part.type.charAt(0)}${part.color ? `/${part.color}` : ''}/${part.no}.jpg`"
                :src="`https://img.bricklink.com/${part.type.charAt(0)}${part.color ? `/${part.color}` : ''}/${part.no}.jpg`"
                width="100px"
              ></v-img>
              <v-card-title class="pa-0">
                <span
                  class="text-caption"
                  :title="part.name"
                  v-html="part.name"
                ></span>
              </v-card-title>
            </div>
          </v-card>
        </v-badge>
      </div>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  name: 'ListParts',

  props: {
    loading: Boolean,
    parts: Array,
  },

  computed: {
    parties() {
      return {
        items: this.parts.filter((part) => part.type === 'PART' && !part.isCounterpart),
        qty: this.parts.reduce((acc, part) => {
          if (part.type === 'PART' && !part.isCounterpart) {
            return acc + part.qty;
          }
          return acc;
        }, 0),
      };
    },

    minifigs() {
      return {
        items: this.parts.filter((part) => part.type === 'MINIFIG' && !part.isCounterpart),
        qty: this.parts.reduce((acc, part) => {
          if (part.type === 'MINIFIG' && !part.isCounterpart) {
            return acc + part.qty;
          }
          return acc;
        }, 0),
      };
    },
  },
};
</script>
