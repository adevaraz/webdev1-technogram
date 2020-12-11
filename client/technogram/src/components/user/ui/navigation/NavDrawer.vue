<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="key"
          class="text-caption"
          placeholder="Masukan kata kunci pencarian disini ...."
          prepend-inner-icon="mdi-magnify"
          v-on:keydown.enter="onSearch(key)"
        ></v-text-field>
      </v-col>
      <v-col cols="12" v-if="isLoggedIn">
        <v-row>
          <v-col cols="12" class="pl-6 profile button">
            <div text class="text-start text-none button-content">
              <v-col
                cols="1"
                class="img-container pa-0 ma-0"
                align-self="center"
              >
                <img
                  class="item img-btn"
                  src="../../../../assets/icons/profile.png"
                />
              </v-col>
              <v-col cols="11" class="pa-0 ma-0 pl-5 pl-xs-1">
                <div class="username-text">{{ username }}</div>
                <div class="email-text">{{ email }}</div>
              </v-col>
            </div>
          </v-col>
          <v-col cols="12">
            <v-btn
              text
              small
              class="worksans-font text-none"
              @click="$router.push({ name: 'profile' })"
              >Saved news</v-btn
            >
            <v-btn text small class="worksans-font text-none" @click="signOut()"
              >Sign Out</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-if="!isLoggedIn">
        <LoginUser></LoginUser>
      </v-col>
      <v-col cols="12">
        <div class="border-btm mt-1"></div>
      </v-col>
      <v-col v-for="(menu, index) in menus" cols="6" :key="menu.id">
        <v-btn text small :class="menuClass(index)" @click="onClicked(index)">{{
          menu.name
        }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { store } from "../../../../store/index";
import LoginUser from "./../../auth/LoginUser.vue";

export default {
  components: {
    LoginUser,
  },

  props: {
    menus: {
      type: Array,
    },
    onClicked: Function,
    currentSelected: Number,
    isLoggedIn: {
      type: Boolean,
      default() {
        return false;
      },
    },
    onSearch: Function,
  },
  data() {
    return {
      key: "",
      username: "",
      email: "",
    };
  },

  methods: {
    ...mapActions({
      loggedInToggle: "user/loginToogle",
    }),
    menuClass(index) {
      const basicClass =
        "font-weight-bold text-caption worksans-font text-none";
      return index === this.currentSelected
        ? basicClass + " text-decoration-underline"
        : basicClass;
    },

    getUserData() {
      console.log("user token" + store.getters["user/isTokenExist"]);
      this.username = store.getters["user/getUsername"];
      console.log("uname" + this.username);
      this.email = store.getters["user/getUserEmail"];
    },

    async signOut() {
      const before = await store.getters["user/isTokenExist"];
      console.log("before: ");
      console.log(before);

      const signOutRes = await store.dispatch("user/signOut");

      if (signOutRes instanceof Error) {
        this.error.message = signOutRes.cause;
        this.error.isError = true;
      } else {
        const after = await store.getters["user/isTokenExist"];
        console.log("after: ");
        console.log(after);

        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapGetters({
      getUsername: "user/getUsername",
      getEmail: "user/getUserEmail",
    }),
  },
  watch: {
    getUsername(value) {
      this.username = value;
    },
    getEmail(value) {
      this.email = value;
    },
  },

  mounted() {
    this.getUserData();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");
.border-btm {
  border-bottom: 1px solid #bab4b8;
}

.worksans-font {
  font-family: "Work Sans", sans-serif;
}

.username-text {
  font-family: "Work Sans", sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
}

.email-text {
  font-family: "Work Sans", sans-serif;
  font-weight: 300;
}

.button {
  cursor: pointer;
}
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");
.border-btm {
  border-bottom: 1px solid #bab4b8;
}

.button:hover {
  background: #eeeeee;
  border-radius: 16px;
}

.button-content {
  display: flex;
  justify-content: flex-start;
}

.item {
  max-height: 2em;
}
</style>