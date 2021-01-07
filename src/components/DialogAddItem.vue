<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600px"
      persistent
    >
      <v-form
        v-model="valid"
        @submit.prevent="handleSave"
        lazy-validation
        ref="addForm"
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{ 'Add ' + title }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="dialogData.itemId"
                    :rules="[computedRules]"
                    autofocus
                    label="Item ID"
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
                    label="Price"
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
                    label="Sealed"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="dialogData.comment"
                    label="Comment (optional)"
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
              Close
            </v-btn>
            <v-btn
              :disabled="!valid"
              :loading="$store.state.saving"
              color="blue darken-1"
              text
              type="submit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { ADD_MINIFIGURE, ADD_SET } from '../store/types';
import { eventBus } from '../main';
import { getThemeIdByItemIdPrefix } from '../helpers/themeHelper';

export default {
  data: () => ({
    valid: true,
    title: 'item',
    dialogData: {
      sealed: null,
      itemId: null,
      comment: null,
      price: null,
    },
  }),

  props: {
    dialog: { type: Boolean, default: false },
  },

  methods: {
    handleClose() {
      this.$emit('update:dialog', false);
      this.$refs.addForm.reset();
    },

    handleSave() {
      const setter = this.$route.name === 'Minifigures' ? ADD_MINIFIGURE : ADD_SET;

      if (this.$refs.addForm.validate()) {
        this.$store.dispatch(setter, this.dialogData)
          .then(() => this.handleClose())
          .catch(() => {});
      }
    },
  },

  computed: {
    errorMessage() {
      return this.$store.state.error && this.$store.state.error.message;
    },

    message() {
      return this.$route.name === 'Minifigures' ? 'e.g. sw1060' : 'e.g. 70666-1';
    },

    computedRules() {
      return (value) => {
        const lowerValue = value && value.toLowerCase();

        const { sets, minifigures } = this.$store.state;

        if (sets.find((set) => set.itemId === lowerValue)
          || minifigures.find((minifig) => minifig.itemId === lowerValue)
        ) {
          return 'You already have this item';
        }

        if (!lowerValue) {
          return 'ID is required';
        }

        return null;
      };
    },
  },

  created() {
    eventBus.$on('search', ({ search }) => {
      getThemeIdByItemIdPrefix.call(this, search);
    });

    eventBus.$on('select', ({ select }) => {
      this.dialogData.select = select;
    });
  },
};
</script>
