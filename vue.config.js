module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  transpileDependencies: [
    'vuetify',
  ],
  pwa: {
    name: 'BrickCollector',
    themeColor: '#BDBDBD',
    manifestOptions: {
      background_color: '#FFFFFF',
    },
  },
};
