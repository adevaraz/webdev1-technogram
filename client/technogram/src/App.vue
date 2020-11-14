<template>
<div id="app">
  <v-app>
    <daftar-berita></daftar-berita>
  </v-app>
</div>
</template>

<script>
//import Navbar from "./components/admin/ui/Navbar"
import DaftarBerita from './components/admin/berita/DaftarBerita.vue';
export default {
  components: {
  //  "navbar": Navbar, <navbar></navbar>
    DaftarBerita
  }
};
</script>

<style>
  
</style>
