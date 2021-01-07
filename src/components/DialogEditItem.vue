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
        ref="editForm"
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{ 'Edit ' + dialogData.itemId }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
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
                  sm="4"
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
                    required
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              @click="handleClose"
              text
            >
              Close
            </v-btn>
            <v-btn
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
import { UPDATE_SET, UPDATE_MINIFIGURE } from '../store/types';
import { eventBus } from '../main';
import { getThemeIdByItemIdPrefix } from '../helpers/themeHelper';

export default {
  name: 'DialogEditItem',

  data: () => ({
    valid: true,
    dialog: false,
    dialogData: {
      itemId: null,
      sealed: null,
      comment: null,
      price: null,
    },
  }),

  methods: {
    handleClose() {
      this.dialog = false;
      this.$refs.editForm.reset();
    },

    handleSave() {
      const setter = this.$route.name === 'Minifigures' ? UPDATE_MINIFIGURE : UPDATE_SET;

      if (this.$refs.editForm.validate()) {
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
  },

  created() {
    eventBus.$on('open', ({ dialog, item }) => {
      const {
        itemId, sealed, comment, price,
      } = item;

      this.dialogData = {
        sealed,
        comment,
        price,
        itemId,
      };
      this.dialog = dialog;
    });

    eventBus.$on('search', ({ search }) => {
      getThemeIdByItemIdPrefix.call(this, search);
    });

    eventBus.$on('select', ({ select }) => {
      this.dialogData.select = select;
    });
  },
};
</script>
