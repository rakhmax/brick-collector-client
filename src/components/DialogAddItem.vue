<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-form
        v-model="valid"
        @submit.prevent="handleSave"
        lazy-validation
        ref="addForm"
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{ $t(`add${$route.name.slice(0, -1)}`) }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="dialogData.itemId"
                    :rules="[computedRules]"
                    autofocus
                    label="ID"
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-text-field
                    v-model="dialogData.price"
                    :label="$t('price')"
                    required
                    type="number"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-checkbox
                    v-if="$route.name === 'Sets'"
                    v-model="dialogData.sealed"
                    :label="$t('sealed')"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="dialogData.comment"
                    :label="$t('comment')"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="handleClose"
              text
            >
              {{ $t('close') }}
            </v-btn>
            <v-btn
              :disabled="!valid"
              :loading="$store.state.saving"
              color="green"
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
import { ADD_MINIFIGURE, ADD_SET } from '@/store/types';

export default {
  name: 'DialogAddItem',

  props: { itemType: String },

  data: () => ({
    dialog: false,
    valid: true,
    dialogData: {
      sealed: null,
      itemId: null,
      comment: null,
      price: null,
    },
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

      return {};
    },

    computedRules() {
      return (value) => {
        const lowerValue = value && value.toLowerCase();

        const { sets, minifigures } = this.$store.state;

        if (sets.find((set) => set.itemId === lowerValue)
          || minifigures.find((minifig) => minifig.itemId === lowerValue)
        ) {
          return this.$t(`youAlreadyHaveThis${this.$route.name.slice(0, -1)}`);
        }

        if (!lowerValue) {
          return `ID ${this.$t('isRequired').toLowerCase()}`;
        }

        return true;
      };
    },
  },

  created() {
    eventBus.$on('openAddDialog', (value) => {
      this.dialog = value;
    });
  },
};
</script>
