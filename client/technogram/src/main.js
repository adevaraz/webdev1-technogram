import Vue from 'vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'
import App from './App.vue'
import {store} from './store/index'
import 'nprogress/nprogress.css'
import VirtualList from 'vue-virtual-scroll-list'

Vue.component('virtual-list', VirtualList)
Vue.config.productionTip = false


new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),  
}).$mount('#app')
