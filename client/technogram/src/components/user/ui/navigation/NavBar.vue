<template>
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
        <div class="right">
          <div class="navigation" v-if="!isMobile">
            <img @click="$router.push({name: search})" class="item img-btn" src="../../../../assets/icons/search-icon.png" />
            <div class="loggedin" v-if="isLoggedIn">
              <img class="item img-btn" src="../../../../assets/icons/bell.png" />
              <img class="item img-btn" src="../../../../assets/icons/profile.png" />
            </div>
            <div class="public" v-else>
              <v-btn class="item btn text-none" color="#E52B38" small>Sign in</v-btn>
            </div>
          </div>
          <div class="navigation" v-if="isMobile && isLoggedIn">
            <img class="item img-btn" src="../../../../assets/icons/bell.png" />
          </div>
        </div>
      </div>
      <div class="item" v-if="!isMobile">
        <v-btn
          text
          small
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
import NavDrawer from "./NavDrawer.vue";
const TEN_MINUTES = 1000 * 60 * 10;

const getFullRoute = (name, query) => {
  if (query) {
    return `/${name}?category=${query}`;
  }
  return `/${name}`;
};

export default {
  created() {
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
  components: { NavDrawer },
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    toogleDrawer: Function,
  },
  data() {
    return {
      navbarClass: "navbar",
      isDrawerShown: false,
      isDrawerAnimationNeeded: false,
      menus: [
        { name: "Home", routeName: "home", route: "", query: null },
        {
          name: "Software",
          routeName: "search-result",
          route: "search",
          query: "software",
        },
        {
          name: "Brainware",
          routeName: "search-result",
          route: "search",
          query: "brainware",
        },
        {
          name: "Hardware",
          routeName: "search-result",
          route: "search",
          query: "hardware",
        },
        { name: "More", routeName: "more-categories", route: "categories" },
      ],
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
      this.isDrawerShown = !this.isDrawerShown;
      //burger animation
      this.$refs.burger.classList.toggle("toogle");
      this.onMenuSelected(index);
    },
    onMenuSelected(index) {
      this.$router
        .push({
          name: this.menus[index].routeName,
          query: this.menus[index].query
            ? {
                category: this.menus[index].query,
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
</style>