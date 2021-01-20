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
    text: Vue.prototype.$t('category'),
    value: 'categoryId',
  },
  {
    text: Vue.prototype.$t('qtyShort'),
    value: 'qty',
    width: 90,
    filterable: false,
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
