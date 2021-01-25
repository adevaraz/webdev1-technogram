require = require('esm')(module);
const { list } = require('./src/plugins/router');

module.exports = {
  pluginOptions: {
      sitemap: {
          urls: list,
      }
  },
  chainWebpack: config => {
    // remove the prefetch plugin
    config.plugins.delete('prefetch')
  },
}