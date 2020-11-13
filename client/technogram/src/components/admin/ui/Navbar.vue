<template>
  <v-card height="700">
    <v-navigation-drawer
      absolute
      permanent
      left
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <img src="../../../assets/technogram-creator-b.png">
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <!-- Home Button -->
      <v-list-item>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <!-- Berita Button Group -->
      <v-list-group
        :value="false"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Berita</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="menu in beritas"
          :key="menu.submenu"
          link
        >
          <v-list-item-title>{{ menu.submenu }}</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <!-- Pembaca Button Group -->
      <v-list-group
        :value="false"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Pembaca</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="menu in pembacas"
          :key="menu.submenu"
          link
        >
          <v-list-item-title>{{ menu.submenu }}</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <!-- Admin Button Group -->
      <v-list-group
        :value="false"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="menu in admins"
          :key="menu.submenu"
          link
        >
          <v-list-item-title>{{ menu.submenu }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    name: 'navbar',
    data: () => ({
        beritas: [
          { submenu: 'Daftar Berita' },
          { submenu: 'Unggah Berita' },
          { submenu: 'Kategori' }
        ],
        pembacas: [
          { submenu: 'Daftar Akun' }
        ],
        admins: [
          { submenu: 'Daftar Admin' },
          { submenu: 'Tambah Admin' }
        ]
    })
  }
</script>