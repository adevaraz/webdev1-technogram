<template>
  <v-app>
    <v-row>
      <v-col cols="3">
        <navbar></navbar>
      </v-col>
      <v-col>
        <daftar-berita></daftar-berita>
      </v-col>
    </v-row>
    
    <!--
    <router-view></router-view>
    -->
  </v-app>
</template>

<script>
import DaftarPembaca from "./components/admin/daftar-user/DaftarPembaca"
import Navbar from './components/admin/ui/Navbar.vue';
export default {
  components: {
    "daftar-berita" : DaftarPembaca,
    "navbar" : Navbar,
  }
};
</script>

<style scoped>
</style>
