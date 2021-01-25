<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-form
        ref="addForm"
        v-model="valid"
        lazy-validation
        @submit.prevent="handleSave"
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{ $t(`add${$route.name.slice(0, -1)}`) }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <search-box></search-box>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="dialogData.price"
                    :label="$t('price')"
                    min="0"
                    required
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-checkbox
                    v-if="$route.name === 'Sets'"
                    v-model="dialogData.sealed"
                    :label="$t('sealed')"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="dialogData.comment"
                    :label="$t('comment')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              @click="handleClose"
            >
              {{ $t('close') }}
            </v-btn>
            <v-btn
              color="green"
              :disabled="!valid"
              :loading="$store.state.saving"
              text
              type="submit"
            >
              {{ $t('add') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { eventBus } from '@/main';
import SearchBox from '@/components/SearchBox.vue';
import {
  ADD_MINIFIGURE,
  ADD_SET,
  ADD_WISHLIST,
} from '@/store/types';

export default {
  name: 'DialogAddItem',

  components: {
    SearchBox,
  },

  props: { itemType: String },

  data: () => ({
    dialog: false,
    valid: true,
    dialogData: {},
  }),

  methods: {
    handleClose() {
      this.dialog = false;
      this.$refs.addForm.reset();
    },

    handleSave() {
      if (this.$refs.addForm.validate()) {
        this.$store.dispatch(this.actionTypes.add, this.dialogData)
          .then(() => this.handleClose())
          .catch(() => {});
      }
    },
  },

  computed: {
    errorMessage() {
      return this.$store.state.error && this.$store.state.error.message;
    },

    title() {
      return this.$t(this.$route.meta.title).toLowerCase();
    },

    actionTypes() {
      if (this.itemType === 'Minifig') return { add: ADD_MINIFIGURE };
      if (this.itemType === 'Set') return { add: ADD_SET };
      if (this.itemType === 'Wishlist') return { add: ADD_WISHLIST };

      return {};
    },
  },

  created() {
    eventBus.$on('openAddDialog', (value) => {
      this.dialog = value;
    });

    eventBus.$on('select', ({ select }) => {
      this.dialogData.itemId = select.itemId;
      this.dialogData.type = select.type;
    });
  },
};
</script>
