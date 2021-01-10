import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors';

import en from 'vuetify/lib/locale/en';
import ru from 'vuetify/lib/locale/ru';

import enUs from '@/locales/en.json';
import ruRu from '@/locales/ru.json';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { en: { ...en, ...enUs }, ru: { ...ru, ...ruRu } },
    current: localStorage.getItem('lang') || navigator.language.substring(0, 2),
  },
  theme: {
    themes: {
      light: {
        primary: colors.green,
      },
      dark: {
        primary: colors.green,
      },
    },
  },
});
