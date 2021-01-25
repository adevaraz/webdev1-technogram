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

function getRoutesList(routes, pre) {
  return routes.reduce((array, route) => {
    const path = `${pre}${route.path}`;

    if (route.path !== '*') {
      array.push(path);
    }

    if (route.children) {
      array.push(...getRoutesList(route.children, `${pre}`));
    }

    return array;
  }, []);
}

const list = getRoutesList(router.options.routes, 'https://technogram.tech');

export { router, list };
