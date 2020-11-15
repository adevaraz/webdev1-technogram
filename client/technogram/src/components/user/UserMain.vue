<template>
  <div>
    <nav-bar :toogleDrawer="toogleDrawer"></nav-bar>
    <transition name="fade">
      <div class="container" v-if="isContentShown">
        <router-view class="content-container"></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
import NavBar from "./ui/navigation/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      isContentShown: true,
    };
  },
  methods: {
    toogleDrawer(isDrawerShown) {
      this.isContentShown = !isDrawerShown;
      console.log(this.isContentShown);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Work Sans", sans-serif;
}

.container {
  display: flex;
  min-width: 100%;
  justify-content: center;
}
.content-container {
  padding: 10rem 1rem 0 1rem;
  width: 100%;
  max-width: 1488px;
}

@media screen and (max-width: 960px){
    .content-container {
        padding: 7rem 1rem 0 1rem;
    }
}

/* fade */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}
</style>
