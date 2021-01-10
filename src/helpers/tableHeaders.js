export default [
  {
    text: 'ID',
    value: 'itemId',
    width: 90,
  },
  {
    text: 'Name',
    align: 'start',
    value: 'name',
  },
  { text: 'Theme', value: 'categoryId' },
  {
    text: 'Price (₽)',
    value: 'price',
    width: 105,
    filterable: false,
  },
  // {
  //   sortable: false,
  //   text: 'Comment',
  //   value: 'comment',
  // },
  {
    sortable: false,
    text: '',
    value: 'actions',
    width: 1,
  },
];
