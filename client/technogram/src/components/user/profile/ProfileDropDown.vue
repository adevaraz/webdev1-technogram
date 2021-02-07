<template>
  <v-container>
    <v-list-item :style="{background : currentTheme.backgroundVariant}">
      <v-list-item-content>
        <v-list-item-title :style="{color : currentTheme.onBackgroundVariant}">{{ username }}</v-list-item-title>
        <v-list-item-subtitle :style="{color : currentTheme.onBackgroundVariant}">{{ userEmail }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav :style="{background : currentTheme.backgroundVariant}">
      <v-list-item-content>
        <v-list-item-title
            class="profile-item"
            @click="$router.push({ name: 'profile' })"
            :style="{color : currentTheme.onBackgroundVariant}"
        >Berita Tersimpan</v-list-item-title>
          <v-switch
              v-model="localIsDark"
              class="profile-item px-1"
              inset
              :color="currentTheme.toggleColor"
          >
            <template v-slot:label>
              <span :style="{color : currentTheme.onBackgroundVariant}">Dark Mode</span>
            </template>
          </v-switch>
        <v-list-item-content>
          <v-list-item-title class="profile-item" @click="signOut()" :style="{color : currentTheme.onBackgroundVariant}">Keluar</v-list-item-title>
        </v-list-item-content>
      </v-list-item-content>
    </v-list>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import {store} from "../../../store/index";
import {mapActions} from "vuex";

export default {
  created() {
    this.getUserData();
    this.localIsDark = this.isDark
  },

  data: () => ({
    username: "",
    userEmail: "",
    isLoading: false,
    childMessage: false,
    localIsDark :  false,
    items: [
      {title: "Saved News", route: "profile"},
      {title: "Sign Out", route: "log-out"},
    ],
    error: [
      {
        message: "",
        isError: false,
      },
    ],
  }),

  methods: {
    ...mapActions({
      toogleTheme : "theme/toogleDark"
    }),
    getUserData() {
      this.username = store.getters["user/getUsername"];
      this.userEmail = store.getters["user/getUserEmail"];
    },

    async signOut() {
      this.childMessage = true;
      const before = await store.getters["user/isTokenExist"];
      console.log("before: ");
      console.log(before);
      this.$emit('childToParent', this.childMessage);

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
    }
  },
  computed: {
    ...mapGetters({
      getUsername: "user/getUsername",
      getEmail: "user/getUserEmail",
      isDark : "theme/getIsDark",
      currentTheme : "theme/getCurrentColor"
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
  },

};
</script>

<style scoped>
.notification-header {
  border-bottom: 1px solid #d9d9d9;
}

.profile-item {
  cursor: pointer;
}

.more {
  cursor: pointer;
  border-top: 1px solid #eeeeee;
}

.more:hover {
  background: rgb(214, 214, 214);
}
</style>