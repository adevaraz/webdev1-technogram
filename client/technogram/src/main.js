import Vue from 'vue'
import vuetify from './plugins/vuetify'
import { router } from './plugins/router'
import App from './App.vue'
import {store} from './store/index'
import 'nprogress/nprogress.css'
import VirtualList from 'vue-virtual-scroll-list'
import VueAnalytics from 'vue-analytics';
import VueMeta from 'vue-meta'
 
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.use(VueAnalytics, {
    id: 'UA-183633936-2',
    router
})

Vue.component('virtual-list', VirtualList)
Vue.config.productionTip = false


new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),  
}).$mount('#app')
