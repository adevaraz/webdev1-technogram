<template>
  <v-app>
    <add-berita></add-berita>
  </v-app>
</template>

<script>
// import Navbar from "./components/admin/ui/Navbar"
// export default {
//   components: {
//     "navbar": Navbar
//   }
// };
import AddBerita from "./components/admin/berita/AddBerita";
export default {
  components: {
    AddBerita,
  },
};
</script>

<style>
</style>
