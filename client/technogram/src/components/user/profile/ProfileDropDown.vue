<template>
    <v-container>
    

        <v-list-item >
          <v-list-item-content>
            <v-list-item-title>{{ username }}</v-list-item-title>
            <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
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
    created() {
      this.getUserData();
    },

    data: () => ({
      username: '',
      userEmail: '',
      isLoading: false,
      childMessage: false,
      items: [
        { title: 'Saved News', route: 'profile' },
        { title: 'Sign Out', route: 'log-out' },

      ],
      error: [
        { 
          message: '',
          isError: false
        }
      ]
    }),

    methods: {
      getUserData(){
        this.username = store.getters['user/getUsername'];
        this.userEmail = store.getters['user/getUserEmail'];
        console.log(this.username + ' -- ' + this.userEmail);
      },
      async signOut() {
        this.childMessage = true;
        const before = await store.getters["user/isTokenExist"];
        console.log("before: ");
        console.log(before);
        this.$emit('childToParent', this.childMessage)
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
    },
    
    mounted(){
      this.getUserData();
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