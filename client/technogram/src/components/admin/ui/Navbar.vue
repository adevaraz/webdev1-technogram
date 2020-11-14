<template>
  <v-card
    height="700"
    color="#F4F4F4"
  >
    <v-navigation-drawer
      permanent
      left
      color="#3c3d40"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <img src="../../../assets/technogram-creator-w.png">
        </v-list-item>
      </template>

      <v-divider></v-divider>
      
      <!-- Home Button -->
      <v-list-group
        :value="false"
        color="white"
        active-class="grey darken-4"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-group>
      
      <!-- Berita Button Group -->
      <v-list-group
        :value="false"
        color="white"
        active-class="grey darken-4"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Berita</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="menu in beritas"
          :key="menu.text"
          link
        >
          <v-list-item-title>{{ menu.text }}</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <!-- Pembaca Button Group -->
      <v-list-group
        :value="false"
        color="white"
        active-class="grey darken-4"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Pembaca</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="menu in pembacas"
          :key="menu.text"
          link
        >
          <v-list-item-title>{{ menu.text }}</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <!-- Admin Button Group -->
      <v-list-group
        :value="false"
        color="white"
        active-class="grey darken-4"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="menu in admins"
          :key="menu.text"
          link
        >
          <v-list-item-title>{{ menu.text }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    name: 'navbar',
    data: () => ({
        menus: [
          {
            text: 'Home',
            submenu: ''
          },
          {
            text: 'Berita',
            submenu: 'beritas'
          },
          {
            text: 'Pembaca',
            submenu: 'pembacas'
          },
          {
            text: 'Admin',
            submenu: 'admins'
          }
        ],
        beritas: [
          { text: 'Daftar Berita' },
          { text: 'Unggah Berita' },
          { text: 'Kategori' }
        ],
        pembacas: [
          { text: 'Daftar Akun' }
        ],
        admins: [
          { text: 'Daftar Admin' },
          { text: 'Tambah Admin' }
        ]
    })
  }
</script>

<style scoped>
* {
  color: white;
}

v-card {
  justify-content: center;
}

img {
  max-width: 200px;
}
</style>