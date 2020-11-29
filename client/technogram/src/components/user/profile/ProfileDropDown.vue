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
        <v-list-item
          v-for="menu in items"
          :key="menu.title"
          link
        >
         
          <v-list-item-content>
            <v-list-item-title @click="$router.push({ name: menu.route })">{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
     
    </v-container>
</template>

<script>
  export default {

    data: () => ({
      items: [
        { title: 'Saved News', route: 'profile' },
        { title: 'Sign Out', route: 'log-out' },

      ],
    }),
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