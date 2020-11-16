<template>
  <v-card width="1200px">
    <v-card-title>
      Berita
      <v-spacer></v-spacer>
      <v-text-field
        v-model="key"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        v-on:keydown.enter="searchBerita"
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
            <v-btn v-if="item.waktu_publikasi!=null"  class="ma-1" color="success" dark
            @click.prevent="publishBerita(item.id_berita)">
                Unpublish
            </v-btn>
            <v-btn v-else class="ma-1" color="success" dark
            v-on:click="publishBerita(item.id_berita)">
                Publish
            </v-btn>
            <v-btn class="ma-1" color="warning" dark>
                Edit
            </v-btn>
            <v-btn class="ma-1" color="error" dark
            @click.prevent="deleteBerita(item.id_berita)">
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

      async searchBerita(){
        if(this.key === ''){
          this.retrieveBerita()
        }else{
          const response = await daftarBerita.searchBy(this.key);
          if(response instanceof Error){
            // Munculkan error dialog
            return
          } 
          console.log(response.data)
          this.berita = response.data;
        }
      },

      deleteBerita(id) {
        daftarBerita.deleteBy(id)
        .then(response => {
          console.log(id);
          this.retrieveBerita();
          console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          })
      },

      publishBerita(id) {
        daftarBerita.publish(id)
        .then(response => {
          console.log(id);
          this.berita = response.data;
          this.retrieveBerita();
          console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          })
      }
    },

    mounted() {
      this.searchBerita();
      this.deleteBerita();
    }
  };
</script>
