<template>
    <v-container
     fluid
     class="pa-0"
     >
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
import Navbar from './ui/Navbar.vue';
export default {
  components: {
    "navbar" : Navbar,
  }
};
</script>

<style>
.full-height {
    height: 100vh;
}
</style>