require = require('esm')(module);
// const { list } = require('./src/plugins/router');
const { routes } = require('./src/routes'); 

module.exports = {
  pluginOptions: {
      sitemap: {
          // urls: list,
          baseURL: 'https://technogram.tech',
          routes
      }
  },
  chainWebpack: config => {
    // remove the prefetch plugin
    config.plugins.delete('prefetch')
  },
}