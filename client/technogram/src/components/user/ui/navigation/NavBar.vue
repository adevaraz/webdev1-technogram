<template v-slot:activator="{ on, attrs }">
  <div :class="navbarClass">
    <nav>
      <div class="header">
        <div class="left">
          <div
            ref="greetingText"
            class="greeting-text font-weight-bold"
            v-if="!isMobile"
          >{{getGreetings}}</div>
          <div @click="slideDrawer" ref="burger" class="burger" v-else>
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
          </div>
        </div>
        <div class="middle">
          <div ref="logo" class="logo">
            <img src="../../../../assets/technogram-logo.png" />
          </div>
        </div>
        <div class="right" >
          <div class="navigation" v-if="!isMobile">
            <v-dialog v-model="dialog" persistent>
              <template v-slot:activator="{ on, attrs }">
                <img class="item img-btn" v-bind="attrs" v-on="on" src="../../../../assets/icons/search-icon.png" />        
              </template>
              <v-card max-height="1080px">
                <v-card-title></v-card-title>
                <v-card-text>
                  <v-container d-block>
                    <div class="d-flex flex-row-reverse cross-icon">
                        <img class="cross-icon" @click="dialog = false" src='../../../../assets/icons/cross.png'>
                    </div>
                    <div class="d-flex flex-row search" align-center>
                        <v-text-field 
                            v-model="key"
                            placeholder="Enter keyword here..."
                            prepend-inner-icon="mdi-magnify"
                            v-on:keydown.enter="$router.push({ name: 'recent-result', query: {q: key} }); dialog = false"
                        >
                        </v-text-field>
                    </div>
                </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
            
            <div class="loggedin" v-if="isLoggedIn">
              <div class="">
                <img class="item img-btn" @click="showNotification = !showNotification" src="../../../../assets/icons/bell.png" /> 
                <div class="notification"  v-if="showNotification">
                  <notification-dropdown></notification-dropdown>
                </div>
                  <img class="item img-btn" @click="showProfile = !showProfile" src="../../../../assets/icons/profile.png" />
                  <div class="profile" v-if="showProfile">
                    <profile-drop-down></profile-drop-down>
                  </div>
                </div>
            </div>
            <div class="public" v-else>

            <v-flex>  
            <LoginUser>
            </LoginUser>
            </v-flex>

            </div>
          </div>
          <div class="navigation" v-if="isMobile && isLoggedIn">
            <img class="item img-btn" src="../../../../assets/icons/bell.png" @click="$router.push({name : 'notification'})"/>
          </div>
        </div>
      </div>
      <div class="item" v-if="!isMobile">
        <v-btn
          text
          small
          class="text-capitalize"
          :class="menuClass(index)"
          v-for="(menu,index) in menus"
          :key="menu.routerName"
          @click="onMenuSelected(index)"
          :ripple="false"
        >{{menu.name}}</v-btn>
      </div>
    </nav>
    <transition :name="transitionName">
      <div class="drawer" v-if="shouldShowDrawer">
        <nav-drawer
          :onSearch="onSearch"
          :menus="menus"
          :onClicked="onDrawerMenuSelected"
          :currentSelected="selectedMenuIndex"
          :isLoggedIn="isLoggedIn"
        ></nav-drawer>
      </div>
    </transition>
  </div>
</template>

<script>
import NotificationDropdown from '../../notifications/NotificationDropdown.vue';
import ProfileDropDown from '../../profile/ProfileDropDown.vue';
import NavDrawer from "./NavDrawer.vue";

import categoriesData from "../../../../api/kategori/daftarKategori";
import { mapActions } from 'vuex'

import LoginUser from "./../../auth/LoginUser.vue";

const TEN_MINUTES = 1000 * 60 * 10;

const getFullRoute = (name, query) => {
  if (query) {
    return `/${name}?q=${query}`;
  }
  return `/${name}`;
};

export default {
  created() {
    this.retrieveKategori();

    console.log(this.menus[1].query);
    this.menus.forEach((item, index) => {
      if (
        this.$router.currentRoute.fullPath ===
        getFullRoute(this.menus[index].route, this.menus[index].query || null)
      ) {
        this.selectedMenuIndex = index;
        this.selectedMenu = this.$router.currentRoute.fullPath;
      }
    });

    this.currentTime = new Date().getHours();
    setInterval(() => {
      this.currentTime = new Date().getHours();
    }, TEN_MINUTES);

    window.addEventListener("scroll", this.handleScroll);
  },
  components: { 
    NavDrawer, 
    ProfileDropDown,
    NotificationDropdown,
    LoginUser
  },

  props: {
    isLoggedIn: {
      type: Boolean,
      default: true,
    },
    toogleDrawer: Function,
  },
  data() {
    return {
      navbarClass: "navbar",
      isDrawerShown: false,
      isDrawerAnimationNeeded: false,
      showNotification : false,
      dialog: false,
      showProfile: false,
      menus: [
        { name: "Home", routeName: "home", route: "", query: null },
        {
          name: "Software",
          routeName: "recent-result",
          route: "search-result/recent",
          query: "software",
        },
        {
          name: "Brainware",
          routeName: "recent-result",
          route: "search-result/recent",
          query: "brainware",
        },
        {
          name: "Hardware",
          routeName: "recent-result",
          route: "search-result/recent",
          query: "hardware",
        },
        { name: "More", routeName: "more-categories", route: "categories" },
       
      ],
      kategori: [],
      selectedMenu: this.$router.currentRoute.name,
      selectedMenuIndex: 0,
      currentTime: null,
    };
  },
  computed: {
    getGreetings() {
      const MORNING = this.currentTime > 0 && this.currentTime < 11;
      const NOON = this.currentTime > 11 && this.currentTime < 14;
      const AFTERNOON = this.currentTime > 14 && this.currentTime < 18;

      if (MORNING) {
        return "Good Morning!";
      }
      if (NOON) {
        return "Good Day !";
      }
      if (AFTERNOON) {
        return "Good Afternoon !";
      }
      return "Good Evening !";
    },
    isMobile() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return true;
      } else {
        return false;
      }
    },
    shouldShowDrawer() {
      return this.isMobile && this.isDrawerShown;
    },
    transitionName() {
      console.log(this.isMobile);
      return this.isMobile ? "slide" : "";
    },
  },
  methods: {
    ...mapActions({
      loggedInToggle : 'user/loginToogle'
    }),
    handleScroll() {
      if (!this.isMobile) {
        if (window.top.scrollY > 100) {
          this.$refs.logo.classList.add("toogle");
          this.$refs.greetingText.classList.add("toogle");
          this.navbarClass = "navbar floating";
        } else {
          this.$refs.logo.classList.remove("toogle");
          this.$refs.greetingText.classList.remove("toogle");
          this.navbarClass = "navbar";
        }
      }
    },
    slideDrawer() {
      this.isDrawerShown = !this.isDrawerShown;
      //burger animation
      this.$refs.burger.classList.toggle("toogle");
      this.toogleDrawer(this.isDrawerShown);
    },
    menuClass(index) {
      return this.selectedMenu ===
        getFullRoute(this.menus[index].route, this.menus[index].query || null)
        ? "button text-decoration-underline text-none"
        : "button  text-none";
    },
    onDrawerMenuSelected(index) {
      this.closeDrawer();
      this.onMenuSelected(index);
    },
    closeDrawer(){
      this.isDrawerShown = !this.isDrawerShown;
      //burger animation
      this.$refs.burger.classList.toggle("toogle");
    },
    onSearch(key){
      this.closeDrawer();
      this.$router.push({ name: 'recent-result', query: {q: key} });
      this.toogleDrawer(this.isDrawerShown);
    },
    onMenuSelected(index) {
      this.$router
        .push({
          name: this.menus[index].routeName,
          query: this.menus[index].query
            ? {
                q: this.menus[index].query,
              }
            : null,
        })
        .catch((err) => {
          err;
        });
      this.selectedMenuIndex = index;
      this.selectedMenu = this.$router.currentRoute.fullPath;
      this.toogleDrawer(this.isDrawerShown);
    },

    async retrieveKategori() {
      try {
        const kategoriResult = await categoriesData.retrieveAll();
        if (kategoriResult instanceof Error) {
          throw kategoriResult;
        } else {
          if (kategoriResult.data.length > 0) {
            kategoriResult.data.forEach((element) => {
              this.kategori.push(element);
            });
          }

          var i;
          for(i = 1; i <= 3; i++) {
            const nameTmp = this.kategori[i - 1].nama_kategori;
            this.menus[i].name = nameTmp.charAt(0).toUpperCase() + nameTmp.slice(1);
            this.menus[i].query = this.kategori[i - 1].nama_kategori;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    isMobile(value) {
      if (this.isDrawerShown) {
        value;
        this.isDrawerShown = false;
        this.$refs.burger.classList.toggle("toogle");
      }
    },
  },
  destroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Work Sans", sans-serif;
}

.cross-icon {
  margin-top: 0px;
  height: 24px;
  max-height: 24px;
  margin-right: 15px;
  cursor: pointer;
}
.search {
  margin-right: 200px;
  margin-left: 200px;
  height: 36px;
  max-height: 36px;
}

.v-card {
  padding-top: 200px;
  padding-bottom: 200px;
}

.v-text-field {
  width: 200px;
}

.navbar {
  background: white;
  border-bottom: 0.1px solid rgb(112, 112, 112, 0.3);
  max-height: 9rem;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 5;
}

.floating {
  border-bottom: 0.1px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.356);
}

nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

/* Header */
nav .header {
  padding: 1rem;
  display: flex;
  width: 100%;
  height: 10%;
  border-bottom: 0.1px solid rgb(112, 112, 112, 0.3);
}

/* Left section */
nav .header .left {
  flex: 0 1 42.5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.greeting-text {
  font-size: 1.2rem;
  transition: width 0.15s ease-in;
}

.left .toogle {
  font-size: 0.8rem;
}
/* Middle section */
nav .header .middle {
  flex: 3 1 15%;
  display: flex;
  justify-content: center;
}

nav .header .middle .logo img {
  width: 8rem;
  height: auto;
  cursor: pointer;
  transition: width 0.15s ease-in;
}

nav .header .middle .toogle img {
  width: 5rem;
}

/* Right section */
nav .header .right img {
  width: 1.2rem;
  height: 1.2rem;
}

nav .header .right {
  flex: 0 1 42.5%;
  display: flex;
  align-items: center;
}

nav .header .right .navigation {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

nav .header .right .navigation .loggedin {
  display: flex;
}
nav .header .right .navigation .item {
  margin-right: 1rem;
  cursor: pointer;
}

.notification{
  background: white;
  position: absolute;
  height:500px;
  width: 250px;
  padding:1rem;
  right: 2%;
  overflow-y: scroll;
  overflow-x : hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.356);
}

::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}


.img-btn:hover {
  background: rgba(80, 80, 80, 0.164);
}

nav .header .right .btn {
  color: white;
  font-weight: 600;
  font-family: "Work Sans", sans-serif;
}

.button {
  margin: 0.25rem 1rem 0.25rem 1rem;
}

@media screen and (max-width: 960px) {
  .navbar {
    max-height: 6rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.356);
  }

  nav .header {
    border-bottom: none;
  }

  nav .header .middle .logo img {
    width: 6rem;
  }

  .burger {
    cursor: pointer;
  }
  .burger div {
    width: 18px;
    height: 1px;
    background: #707070;
    margin: 5px;
    cursor: pointer;
    transition: all 500ms;
  }

  .drawer {
    background: white;
    padding: 1rem;
    width: 100%;
    position: absolute;
    top: 4rem;
    z-index: 5;
  }

  /* Animations */

  /* slide */
  .slide-enter {
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in 0.5s ease-out forwards;
    transition: opacity 1s;
  }

  .slide-leave-active {
    animation: slide-out 0.5s ease-out forwards;
    transition: opacity 1s;
    opacity: 0;
    position: absolute;
  }

  @keyframes slide-in {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0%);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-100%);
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

  /* Burger rotation */
  .toogle .line1 {
    transform: rotate(-45deg) translate(-5px, 5px);
  }

  .toogle .line2 {
    opacity: 0;
  }

  .toogle .line3 {
    transform: rotate(45deg) translate(-3px, -4px);
  }

 
}
 .profile{
    background: white;
    position: absolute;
    height:200px;
    width: 200px;
    padding:1rem;
    right: 2%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.356);
  }
</style>