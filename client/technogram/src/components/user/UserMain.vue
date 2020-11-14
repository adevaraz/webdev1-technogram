<template>
    <div>
        <nav-bar></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import NavBar from './ui/navigation/NavBar.vue'
export default {
   components : {
       NavBar
   } 
}
</script>
