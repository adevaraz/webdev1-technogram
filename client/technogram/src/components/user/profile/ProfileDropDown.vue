<template>
    <v-container>
    

        <v-list-item >
          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Email</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list
        dense
        nav
      >
        <v-list-item-content>
          <v-list-item-title class="item" @click="$router.push({ name: 'profile' })">Saved News</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title class="item" @click="signOut()">Sign Out</v-list-item-title>
        </v-list-item-content>
      </v-list>
     
    </v-container>
</template>

<script>
import { store } from "../../../store/index";

  export default {
    data: () => ({
      error: [
        { 
          message: '',
          isError: false
        }
      ]
    }),

    methods: {
      async signOut() {
        const before = await store.getters["user/isTokenExist"];
        console.log("before: ");
        console.log(before);

        const signOutRes = await store.dispatch("user/signOut");

        if(signOutRes instanceof Error) {
          this.error.message = signOutRes.cause;
          this.error.isError = true;
        } else {
          const after = await store.getters["user/isTokenExist"];
          console.log("after: ");
          console.log(after);

          this.$router.push("/");
        }
      }
    }
  }
</script>

<style scoped>
.notification-header {
  border-bottom: 1px solid #d9d9d9;
}
.item {
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