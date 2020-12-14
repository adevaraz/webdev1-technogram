<template>
  <v-container fluid class="pa-0">
    <v-row class="full-height">
      <v-col cols="3" class="pa-0">
        <navbar></navbar>
      </v-col>
      <v-col cols="9">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Navbar from "./ui/Navbar.vue";
import { store } from "../../store/index";
export default {
  components: {
    navbar: Navbar,
  },
  async beforeRouteEnter(to, from, next) {
    //Check if access token ready in vuex
    if (!store.getters["admin/isTokenExist"]) {
      //Try to get access token
      await store.dispatch("admin/getNewToken");
      const isTokenExist = store.getters["admin/isTokenExist"];
      if (!isTokenExist) {
        console.log("not authorized");
        next("/admin/signin");
      }
    }
    console.log("ini Token : " + store.getters["admin/getToken"]);
    next();
  },
};
</script>

<style>
.full-height {
  height: 100vh;
}
</style>