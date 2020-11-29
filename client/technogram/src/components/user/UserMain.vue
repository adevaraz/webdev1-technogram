<template>
  <div>
    <nav-bar :toogleDrawer="toogleDrawer" :isLoggedIn="isLoggedIn"></nav-bar>
    <transition name="fade">
      <div class="container" v-if="isContentShown">
        <div class="content-container">
          <router-view></router-view>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import NavBar from "./ui/navigation/NavBar.vue";

import {mapGetters} from 'vuex'
import openSocket from "socket.io-client";
import {BASE_URL} from '../../api/const.js';

//import LoginUser from "./LoginUser.vue";

export default {
  created()  {
      this.socket = openSocket.connect(BASE_URL);
      this.socket.emit("room", 'software');
      this.socket.on('notification', result => {
        console.log(result);
      });
  },
  components: {
    NavBar,
  },
  
  data() {
    return {
      isContentShown: true,
      socket : null,
    };
  },
  methods: {
    toogleDrawer(isDrawerShown) {
      this.isContentShown = !isDrawerShown;
      console.log(this.isContentShown);
    },
  },

  computed : {
    ...mapGetters(
      {
        isLoggedIn : 'user/isLoggedIn'
      }
    )
  }
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

@media screen and (max-width: 960px) {
  .content-container {
    padding: 6rem 1rem 0 1rem;
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
