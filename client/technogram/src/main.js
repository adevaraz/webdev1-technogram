import Vue from 'vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'
import App from './App.vue'
import {store} from './store/index'
import 'nprogress/nprogress.css'
import VirtualList from 'vue-virtual-scroll-list'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
  toast: true,
  position : 'bottom-end'
};

Vue.use(VueSweetalert2 , options);
Vue.component('virtual-list', VirtualList)
Vue.config.productionTip = false


new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),  
}).$mount('#app')
