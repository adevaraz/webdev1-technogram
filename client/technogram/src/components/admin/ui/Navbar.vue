<template>
  <v-navigation-drawer
    absolute
    permanent
    left
  >
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <img src="../../../assets/technogram-creator-b.png">
          <v-list-item-title>Jane Smith</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        items: [
          { title: 'Home' },
          { title: 'My Account' },
          { title: 'Users' },
        ],
      }
    },
  }
</script>