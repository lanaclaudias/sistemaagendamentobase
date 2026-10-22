const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // URL do seu back-end
        changeOrigin: true, // Permite que o front-end se comunique com o back-end
        secure: false, // Se estiver usando HTTPS, defina como true
        logLevel: 'debug', // Para debug, você pode visualizar o que está acontecendo no proxy
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      }),
    ],
  },
});
