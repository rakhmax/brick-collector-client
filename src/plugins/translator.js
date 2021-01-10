import Vue from 'vue';
import Vuetify from './vuetify';

const Translator = {
  install(VueClass) {
    // eslint-disable-next-line no-param-reassign
    VueClass.prototype.$t = function (...methodOptions) {
      const { current, locales } = Vuetify.framework.lang;

      return locales[current][methodOptions];
    };
  },
};

Vue.use(Translator);

export default Translator;
