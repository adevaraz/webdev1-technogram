<template>
  <v-app>
    <v-row>
      <v-col cols="3">
        <navbar></navbar>
      </v-col>
      <v-col>
        <daftar-kategori></daftar-kategori>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import daftarKategori from "./components/admin/kategori/daftar-kategori/Category"
import Navbar from './components/admin/ui/Navbar.vue';
export default {
  components: {
    "daftar-kategori" : daftarKategori,
    "navbar" : Navbar
  }
};
</script>
    AddKategori

<style>
  
</style>

