import Vue from "vue";
import Router from "vue-router";
import routes from '../routes.js';
Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
          path: "/admin/berita/create",
          name: "add-berita",
          component: () => import("../components/admin/berita/AddBerita"),
        },
        {
            path: "/admin/berita/:id",
            name: "edit-berita",
            component: () => import("../components/admin/berita/EditBerita"),
        }
      ]
});