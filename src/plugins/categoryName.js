import Vue from 'vue';

const CategoryFormatter = {
  install(VueClass) {
    // eslint-disable-next-line no-param-reassign
    VueClass.prototype.categoryName = function (categoryId) {
      const themeToConvert = this.$store.state.themes
        .find((theme) => theme.id === categoryId) || {};

      return themeToConvert.name;
    };
  },
};

Vue.use(CategoryFormatter);

export default CategoryFormatter;
