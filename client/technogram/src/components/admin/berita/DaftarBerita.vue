<template>
  <v-card width="1000px">
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
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="berita"
      :pagination.sync="pagination"
      select-all
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:headers="props">
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.text"
          >
            {{ header.text }}
          </th>
          <th>
            Pilihan
          </th>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td class="text-xs-center">{{ props.item.id_berita }}</td>
          <td class="text-xs-center">{{ props.item.judul_berita }}</td>
          <td class="text-xs-center">{{ props.item.waktu_publikasi }}</td>
          <td class="text-xs-center">{{ props.item.kategori }}</td>
          <td class="text-xs-center">
            <v-btn color="success" dark>
                Publish
            </v-btn>
            <v-btn color="warning" dark>
                Edit
            </v-btn>
            <v-btn color="error" dark>
                Delete
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
      pagination: {
      sortBy: 'id'
    },
    selected: [],
    headers: [
          {
            text: 'id',
            align: 'left',
            sortable: false,
            value: 'id_berita',
          },
          { text: 'Judul', value: 'judul_berita'},
          { text: 'Waktu Publikasi', value: 'waktu_publikasi' },
          { text: 'Kategori', value: 'kategori' }
        ],
        berita: [
          {
            id_berita: 1,
            judul_berita: 'judul#1',
            waktu_publikasi: null,
            kategori: 'AI',
          },
          {
            id_berita: 2,
            judul_berita: 'judul#2',
            waktu_publikasi: null,
            kategori: 'Mobile Apps',
          },
          {
            id_berita: 3,
            judul_berita: 'judul#3',
            waktu_publikasi: null,
            kategori: 'Operating Systems',
          },
        ],
      }
    },
  }
</script>
