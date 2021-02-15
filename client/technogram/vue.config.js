require = require('esm')(module);
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
    pwa : {
        name: 'Technogram',
        themeColor: '#e52b38',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#E52B38',
        manifestOptions: {
            background_color: "#ffffff"
        }
    },
    configureWebpack: {
        output: {
            crossOriginLoading: 'anonymous'
        }
    }
}