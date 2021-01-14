import Vue from 'vue';

const CategoryFormatter = {
  install(VueClass) {
    // eslint-disable-next-line no-param-reassign
    VueClass.prototype.categoryName = function (categoryId) {
      const categoryToConvert = this.$store.state.categories
        .find((category) => category.id === categoryId) || {};

      return categoryToConvert.name;
    };
  },
};

Vue.use(CategoryFormatter);

export default CategoryFormatter;
