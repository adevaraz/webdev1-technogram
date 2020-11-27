<template>
  <v-app>
    <!--router-view></router-view-->
    <search-result></search-result>
  </v-app>
</template>

<script>
import SearchResult from '../src/components/user/Search/SearchResult'
export default {
  name: "app",
  components: {
    SearchResult
  }
}
</script>

<style>
#nprogress .bar {
  background: #E52B38 !important;
}
</style>

