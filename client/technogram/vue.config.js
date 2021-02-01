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
        "theme_color": "#E52B38",
        "background_color": "#ffffff",
        "icons": [
            {
                "src": "/public/img/icon/apple-touch-icon-60x60.png",
                "sizes": "60x60",
                "type": "image/png"
            },
            {
                "src": "/public/img/icon/apple-touch-icon-76x76.png",
                "sizes": "76x76",
                "type": "image/png"
            },
            {
                "src": "/public/img/icon/apple-touch-icon-152x152.png",
                "sizes": "152x152",
                "type": "image/png"
            },
            {
                "src": "/public/img/icon/apple-touch-icon-180x180.png",
                "sizes": "180x180",
                "type": "image/png"
            }
        ]
    }
}