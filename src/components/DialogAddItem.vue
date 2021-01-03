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
                <search-box v-if="dialog" />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-select
                  v-model="dialogData.theme"
                  :items="$store.state.themes"
                  item-text="name"
                  item-value="id"
                  label="Theme"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <v-text-field
                  v-model="dialogData.select.legoId"
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
            :disabled="disabledSave"
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
import { SET_MINIFIGURES } from '@/store/types';
import SearchBox from './SearchBox.vue';
import { eventBus } from '../main';
import { getThemeIdByItemIdPrefix } from '../helpers/themeHelper';

export default {
  components: {
    SearchBox,
  },

  data: () => ({
    title: 'item',
    dialogData: {
      comment: null,
      price: null,
      select: {},
      theme: null,
    },
  }),

  props: {
    dialog: { type: Boolean, default: false },
  },

  methods: {
    handleClose() {
      this.$emit('update:dialog', false);

      this.dialogData = {
        comment: null,
        price: null,
        select: {},
        theme: null,
      };
    },

    handleSave() {
      const {
        comment,
        price,
        select,
        theme,
      } = this.dialogData;

      if (select) {
        const data = {
          ...select,
          theme,
          price,
          comment,
        };

        this.$store.dispatch(SET_MINIFIGURES, data)
          .then(() => this.handleClose());
      } else {
        this.error = { message: 'Select an item' };
      }
    },
  },

  computed: {
    disabledSave() {
      return !(this.dialogData.select && this.dialogData.price) || this.$store.state.saving;
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
