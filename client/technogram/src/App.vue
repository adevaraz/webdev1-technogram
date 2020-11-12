<template>
  <div class="app">
    <navbar></navbar>
    <login-admin></login-admin>
  </div>
</template>

<script>
import Navbar from "./components/admin/ui/Navbar"
import AddAdmin from './components/admin/berita/AddAdmin.vue';
export default {
  components: {
    "navbar": Navbar,
    "login-admin" : AddAdmin
  }
};
</script>

<style>
  
</style>
