/* eslint-disable no-param-reassign */
import Vue from 'vue';

const PriceFormatter = {
  install(VueClass) {
    VueClass.prototype.formatPrice = function (price) {
      return Number(price).toFixed(2);
    };
  },
};

const SetIdFormatter = {
  install(VueClass) {
    VueClass.prototype.formatSetId = function (setId) {
      if (this.$route.name === 'Sets') {
        return setId.slice(0, -2);
      }

      return setId;
    };
  },
};

Vue.use(PriceFormatter);
Vue.use(SetIdFormatter);

export default {
  PriceFormatter,
  SetIdFormatter,
};
