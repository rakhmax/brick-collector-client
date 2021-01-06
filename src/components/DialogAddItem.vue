<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600px"
      persistent
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
                  v-model="dialogData.id"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                  messages="e.g. 70666-1 or sw1060"
                  autofocus
                  label="Lego ID"
                  required
                ></v-text-field>
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
                ></v-text-field>
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
          <v-spacer></v-spacer>
          <v-btn
            @click="handleClose"
            color="blue darken-1"
            text
          >
            Close
          </v-btn>
          <v-btn
            :loading="$store.state.saving"
            @click="handleSave"
            color="blue darken-1"
            text
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { SET_MINIFIGURES, SET_SETS } from '@/store/types';
import { eventBus } from '../main';
import { getThemeIdByItemIdPrefix } from '../helpers/themeHelper';

export default {
  data: () => ({
    title: 'item',
    dialogData: {
      id: null,
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

      this.dialogData = {
        id: null,
        comment: null,
        price: null,
      };
    },

    handleSave() {
      const { id } = this.dialogData;
      const setter = this.$route.name === 'Minifigures' ? SET_MINIFIGURES : SET_SETS;

      if (id) {
        this.$store.dispatch(setter, this.dialogData)
          .then(() => this.handleClose())
          .catch(() => {});
      } else {
        this.error = { message: 'Select an item' };
      }
    },
  },

  computed: {
    disabledSave() {
      return !(this.dialogData.select && this.dialogData.price) || this.$store.state.saving;
    },

    errorMessage() {
      return this.$store.state.error && this.$store.state.error.message;
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
