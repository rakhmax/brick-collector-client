import Vue from 'vue';

export default [
  {
    text: 'ID',
    value: 'itemId',
    width: 90,
  },
  {
    text: Vue.prototype.$t('name'),
    align: 'start',
    value: 'name',
  },
  {
    text: Vue.prototype.$t('theme'),
    value: 'categoryId',
    width: 180,
  },
  {
    text: `${Vue.prototype.$t('price')} (₽)`,
    value: 'price',
    width: 105,
    filterable: false,
  },
  {
    sortable: false,
    text: '',
    value: 'actions',
    width: 1,
  },
];
