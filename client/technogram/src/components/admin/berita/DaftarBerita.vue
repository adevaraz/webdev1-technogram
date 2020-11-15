<template>
  <v-card width="1200px">
    <v-card-title>
      Berita
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-simple-table height="500px" width="600px" class="grey lighten-5" dense>
    <template v-slot:default>
    <thead>
        <tr>
          <th>id</th>
          <th>Judul</th>
          <th>Waktu Publikasi</th>
          <th>Kategori</th>
          <th class="text-center">Pilihan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in berita"
            :key="item.id_berita">
          <td class="text-xs-center">{{ item.id_berita }}</td>
          <td class="text-xs-center">{{ item.judul }}</td>
          <td class="text-xs-center">{{ item.waktu_publikasi }}</td>
          <td class="text-xs-center">{{ item.kategori_berita }}</td>
          <td class="text-center">
            <v-btn v-if="item.waktu_publikasi!=null" class="ma-1" color="success" dark
            v-on:click="publish(item.id_berita)">
                Unpublish
            </v-btn>
            <v-btn v-else class="ma-1" color="success" dark
            v-on:click="publish(item.id_berita)">
                Publish
            </v-btn>
            <v-btn class="ma-1" color="warning" dark>
                Edit
            </v-btn>
            <v-btn class="ma-1" color="error" dark
            v-on:click="deleteBerita(item.id_berita)">
                Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import daftarBerita from "../../../api/admin/daftarberita";
  export default {
    data () {
      return {
      berita: [],
      key: "",
      id: ""
      }
    },

    methods: {
      retrieveBerita() {
        daftarBerita.getAll()
        .then(response => {
          this.berita = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        })
      },

      searchBerita() {
        if(this.key=="") {
          this.retrieveBerita();
        } else {
          daftarBerita.searchBy(this.key)
          .then(response => {
          this.berita = response.data;
          console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          })
        }
      },

      deleteBerita(id) {
        daftarBerita.deleteBy(id)
        this.retrieveBerita();
      },

      publish(id) {
        daftarBerita.publish(id)
        .then(response => {
          this.berita = response.data
          console.log('ada apa ini');
          console.log(id);
          console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          })
        this.retrieveBerita();
      }
    },

    mounted() {
      this.searchBerita();
    }
  };
</script>
