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
      return setId.split('-')[0];
    };
  },
};

Vue.use(PriceFormatter);
Vue.use(SetIdFormatter);

export default {
  PriceFormatter,
  SetIdFormatter,
};
