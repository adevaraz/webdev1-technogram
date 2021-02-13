<template>
  <v-container :style="{background : currentTheme.background}">
    <v-row>
      <v-col cols="12">
        <v-text-field
            v-if="isDark"
            dark
            color= "#e52b38"
            class="text-caption"
            v-model="key"
            placeholder="Masukkan kata kunci..."
            prepend-inner-icon="mdi-magnify"
            v-on:keydown.enter="onSearch(key)"
        >
        </v-text-field>
        <v-text-field
            v-else
            color= "#e52b38"
            class="text-caption"
            v-model="key"
            placeholder="Masukkan kata kunci..."
            prepend-inner-icon="mdi-magnify"
            v-on:keydown.enter="onSearch(key)"
        >
        </v-text-field>
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
                  src="../../../../assets/icons/profile.svg"
                  alt="profile icon"
                />
              </v-col>
              <v-col cols="11" class="pa-0 ma-0 pl-5 pl-xs-1"  :style="{color : currentTheme.onBackground}">
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
              :style="{color : currentTheme.onBackground}"
              >Berita Tersimpan</v-btn
            >
            <v-btn text small class="worksans-font text-none" @click="signOut()"  :style="{color : currentTheme.onBackground}"
              >Keluar</v-btn
            >

            <v-switch
              v-model="localIsDark"
              class="px-4"
              inset
              :color="currentTheme.toggleColor"
            >
              <template v-slot:label>
                <span :style="{color : currentTheme.onBackground}">Dark Mode</span>
              </template>
            </v-switch>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-else>
        <auth-user v-if="isLoginDialogShown" :onDialogClosed="()=>{isLoginDialogShown = false}"></auth-user>
          <v-btn
            class="login-btn"
            :color="currentTheme.primary"
            small
            @click="isLoginDialogShown = !isLoginDialogShown"
            >Masuk</v-btn
          >
      </v-col>
      <v-col cols="12">
        <div class="border-btm mt-1"></div>
      </v-col>
      <v-col v-for="(menu, index) in menus" cols="6" :key="menu.id">
        <v-btn text small :class="menuClass(index)" @click="onClicked(index)" :style="{color : currentTheme.onBackground}">{{
          menu.name
        }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { store } from "../../../../store/index";

const AuthUser = () => import("./../../auth/AuthUser.vue");
export default {
  components: {
    AuthUser,
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
      isLoginDialogShown : false,
      localIsDark: false
    };
  },

  methods: {
    ...mapActions({
      loggedInToggle: "user/loginToogle",
      toogleTheme : "theme/toogleDark"
    }),
    menuClass(index) {
      const basicClass =
        "font-weight-bold text-caption worksans-font text-none";
      return index === this.currentSelected
        ? basicClass + " text-decoration-underline"
        : basicClass;
    },

    getUserData() {
      this.username = store.getters["user/getUsername"];
      this.email = store.getters["user/getUserEmail"];
    },

    async signOut() {
      await store.getters["user/isTokenExist"];

      const signOutRes = await store.dispatch("user/signOut");

      if (signOutRes instanceof Error) {
        this.error.message = signOutRes.cause;
        this.error.isError = true;
      } else {
        await store.getters["user/isTokenExist"];
        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapGetters({
      getUsername: "user/getUsername",
      getEmail: "user/getUserEmail",
      currentTheme : "theme/getCurrentColor",
      isDark : "theme/getIsDark"
    }),
  },
  watch: {
    getUsername(value) {
      this.username = value;
    },
    getEmail(value) {
      this.email = value;
    },
    localIsDark(value){
      if(value === this.isDark) return;
      this.toogleTheme()
    }
  },

  mounted() {
    this.getUserData();
    this.localIsDark = this.isDark;
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

.login-btn{
  color:white;
}
</style>