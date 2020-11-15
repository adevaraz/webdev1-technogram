<template>
<v-row class="list px-3 mx-auto">
  <v-col cols="20" sm="20">
    <h1 style="margin-top:20px; margin-bottom:20px">Daftar Kategori </h1>
    <v-btn small color="#41916c" class="white--text" style ="margin-top:20px; margin-right:20px" @click="newItem"> <v-icon style= "margin-right: 3px; margin-bottom: 1px" small>mdi-plus</v-icon> Tambah kategori</v-btn>
    <v-btn small color="#E52B38" class="white--text" style ="margin-top:20px" @click="deleteAll"> <v-icon style= "margin-right: 3px; margin-bottom: 1px" small>mdi-close</v-icon>Hapus semua kategori</v-btn>
     
    <v-data-table :headers="headers" 
                  :items="kategori" 
                  hide-default-footer
                  class="elevation-3"
                  style="margin-top: 20px; margin-left: auto; margin-right: auto; width:600px"
    >
    <template v-slot:top="">
        <v-dialog v-model="dialog" max-width="300px">
          <v-card :loading="loading" max-width="300">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="3"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-card-title>
              <span style="margin-bottom: 40px;" class="headline">{{formTitle}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <div v-if="dialogDelete === false && dialogDeleteAll=== false">                 
                    <v-col cols="20" sm="10" md="10">
                      <v-text-field :rules="[(v) => !!v || 'Kategori tidak boleh kosong']" style="max-width: 200px; margin-top=20px" v-model="editedItem.nama_kategori" label="Nama kategori" ></v-text-field>
                    </v-col>
                  </div>                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
                <div v-if="dialogDelete === false">
                  <v-btn color="blue darken-1" text="" @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text="" @click="save">Save</v-btn>
                </div>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="400px">  
          <v-card  :loading="loading" max-width="400">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="3"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-card-title>
              <span style="margin-bottom: 40px;" class="headline">{{formTitle}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <div v-if="dialogDeleteAll=== false">
                  Apakah anda yakin ingin menghapus kategori "{{editedItem.nama_kategori}}" ?
                </div>
                <div v-else-if="dialogDeleteAll===true">
                  Apakah anda yakin ingin menghapus semua kategori?
                </div>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
                  <v-btn color="blue darken-1" text="" @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text="" @click="remove">Delete</v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
    </template>

    <template v-slot:[`item.pilihan`]="{ item }">
      <v-btn small color="#FAB339" class="white--text" style="margin-right:5px" @click="editItem(item)"> edit </v-btn>
      <v-btn small color="#E52B38" class="white--text" @click="deleteItem(item)"> delete</v-btn>        
    </template>

  </v-data-table>
  </v-col>
</v-row>
</template>

<script>
import categoriesData from "../../../../api/kategori/daftarKategori";
export default {
  data: () => ({
    dialogDelete: false,
    dialogDeleteAll: false,
    dialog: false,
    loading: false,
    headers: [
      { text: "Id", value: "id_kategori"},
      { text: "Category Name", align: "left", sortable: true, value: "nama_kategori" },
      { text: "Pilihan", value: "pilihan", sortable: false}
    ],
    kategori: [],
    editedIndex: -1,
    editedItem: {
      nama_kategori: " "
    },
    defaultItem: {
      nama_kategori: " "
    }
  }),


  computed: {
    formTitle() {
      if (this.dialogDelete) {
        return "Delete Category";
      } else if (this.editedIndex === -1) {
        return "New Category";
      } else if (this.editedIndex > -1) {
        return "Edit Category";
      }
      
      return "Form Title"
    },
    
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    loading (val) {
        if (!val) return

        setTimeout(() => (this.loading = false), 3000)
      },
  },


  methods: {
    refreshList() {
      this.kategori = []
      this.retrieveKategori();
    },
    async retrieveKategori() {
      try {
        const kategoriResult = await categoriesData.retrieveAll();
        if (kategoriResult instanceof Error) {
          throw kategoriResult;
        } else {
          if (kategoriResult.data.length > 0) {
            kategoriResult.data.forEach((element) => {
              this.kategori.push(element);
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    newItem(){
      this.dialog = true;
      this.dialogDeleteAll = false;
      this.dialogDelet= false;
    },
    editItem(item) {
      this.dialogDelete = false;
      this.dialogDeleteAll = false;
      this.editedIndex = this.kategori.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.editedIndex = this.kategori.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDeleteAll=false
    },

    deleteAll() {
      this.dialogDeleteAll = true;
      this.dialogDelete= true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.dialogDelete = false;
        this.dialogDeleteAll = false;
      }, 300);
    },

    async save() {
      this.loading=true;
      if (this.editedIndex > -1) {  // Edited save
        Object.assign(this.kategori[this.editedIndex], this.editedItem);
        await categoriesData.updateKategori(this.editedItem.nama_kategori, this.editedItem.id_kategori);
      
      } else {  // New save
        this.kategori.push(this.editedItem);
        const addResult = await categoriesData.addKategori(this.editedItem.nama_kategori);
         if (addResult instanceof Error) {
          throw addResult;
        } else {
          console.log(addResult);
        }
      }
      
      this.close();
      this.refreshList();
    },

    async remove() {
      this.loading=true;
      if(this.editedIndex>-1){ //delete one
        this.kategori.splice(this.editedIndex, 1);
        await categoriesData.deleteOneKategori(this.editedItem.id_kategori);
      } else {  // delete all
        const deleteResult = await categoriesData.deleteAllKategori();
         if (deleteResult instanceof Error) {
          throw deleteResult;
        } else {
          console.log(deleteResult);
        }
      }
      
      this.close();
      this.refreshList();
    },
    
  },  mounted() {
    this.retrieveKategori();
  },
};
</script>

