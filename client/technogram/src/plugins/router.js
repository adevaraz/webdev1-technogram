import Vue from "vue";
import Router from "vue-router";
import routes from '../routes.js';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

Vue.use(Router);

const router =  new Router({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  })
  router.afterEach(() => {
    NProgress.done()
  })

export default router
