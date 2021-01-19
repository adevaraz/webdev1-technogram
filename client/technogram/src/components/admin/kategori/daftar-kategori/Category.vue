<template>
<v-row  class="list px-3 mx-auto">

  <v-col cols="20" sm="20">
    <h1 style=" margin-bottom:20px ; font-family:'Playfair Display' ">Daftar Kategori </h1>
    <v-btn small color="#41916c" class="white--text font-weight-regular" style ="margin-top:10px; margin-right:20px; font-family:'work sans'" @click="newItem"> <v-icon style= "margin-right: 3px; margin-bottom: 1px" small>mdi-plus</v-icon> Tambah kategori</v-btn>
    <!-- <v-btn small color="#E52B38" class="white--text font-weight-regular" style ="margin-top:10px; font-family:'work sans'" @click="deleteAll"> <v-icon style= "margin-right: 3px; margin-bottom: 1px" small>mdi-close</v-icon>Hapus semua kategori</v-btn> -->
    
    <v-data-table :headers="headers" 
                  :items="kategori" 
                  :loading="loadingItem"
                  hide-default-footer
                  class="elevation-3"
                  style="margin-top: 20px; margin-left: auto; margin-right: auto; width:600px; font-family:'work sans'"
    >
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
    <template v-slot:top="">
        <v-dialog v-model="dialog" :loading="loading" lazy-validation max-width="300px">
          <v-card :loading="loading" max-width="300">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="3"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-card-title>
              <div class="headline">{{formTitle}}</div>
            </v-card-title>
            <v-form ref="form" v-model="isFormValid" lazy-validation>
            <v-card-text>
                <v-row>
                  <div v-if="dialogDelete === false">                 
                    <v-col class="pa-6">
                      <v-text-field :rules='rules()' style="max-width: 300px;" v-model="editedItem.nama_kategori" label="Nama kategori" ></v-text-field>
                      <div class="text-h8">Pilih Foto Header</div>
                      <v-file-input
                        class="text-h8"
                        @change="Preview_image"
                        @click:clear="close_image"
                        v-model="url_gambar"
                        placeholder="Pilih Gambar"
                        prepend-icon="mdi-camera"
                        accept=".webp"
                        :rules="imgRules"
                      >
                      </v-file-input>
                      <div v-if="urlTemp != null">
                        <v-img
                          :src="urlTemp"
                          :aspect-ratio="16 / 9"
                          contain
                          class="grey darken-4"
                        ></v-img>
                      </div>
                    </v-col>
                  </div>                 
                </v-row>
             
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
                <div v-if="dialogDelete === false">
                  <v-btn color="blue darken-1" text="" @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text="" @click="save" :disabled="!isFormValid" >Save</v-btn>
                </div>
            </v-card-actions>
            </v-form>
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
                  Apakah anda yakin ingin menghapus kategori "{{editedItem.nama_kategori}}" ?
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
      <v-btn depressed small color="#FAB339" class="text-capitalize font-weight-regular white--text" style="margin-right:5px" @click="editItem(item)"> edit </v-btn>
      <v-btn depressed small color="#E52B38" class="text-capitalize font-weight-regular white--text" @click="deleteItem(item)"> delete</v-btn>        
    </template>

  </v-data-table>
  </v-col>
</v-row>
</template>

<script>
import { BASE_URL } from "../../../../api/const";
import categoriesData from "../../../../api/kategori/daftarKategori"
import { store } from '../../../../store/index'
export default {
  data: () => ({
    dialogDelete: false,
    dialog: false,
    loading: false,
    loadingItem: false,
    isFormValid: false,
    isNewAdd: false,
    progressBar: false,
    headers: [
      { text: "Id", value: "id_kategori"},
      { text: "Category Name", align: "left", sortable: true, value: "nama_kategori" },
      { text: "Pilihan", value: "pilihan", sortable: false}
    ],
    kategori: [],
    editedIndex: -1,
    editedItem: {
      nama_kategori: "",
      url_gambar_kategori: null
    },
    defaultItem: {
      id_kategori: "",
      nama_kategori: "",
      url_gambar_kategori: null
    },
    imgRules: [],
    url_gambar: null,
    urlTemp: null,
    url_gambar_ori: null,
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
    url_gambar: function (val) {
      if (val instanceof File) {
        this.imgRules = [
          (v) => {
            if (v == null) {
              return true;
            } else {
              if (v.type === "image/webp") {
                return true;
              } else {
                return "Gambar harus bertipe *.webp";
              }
            }
          },
        ];
      } else {
        this.imgRules = [];
      }
    },
  },

  methods: {
    Preview_image() {
      if (this.url_gambar instanceof File) {
        this.urlTemp = URL.createObjectURL(this.url_gambar);
        console.log(this.url_gambar);
        console.log(this.urlTemp);
        console.log(this.editedItem.url_gambar_kategori);
      }
    },
    close_image() {
      this.urlTemp = null;
      this.url_gambar = null;
      if (!this.isFormValid) {
        this.imgRules = [];
      }
    },
    refreshList() {
      this.kategori = [],
      this.retrieveKategori()
    },
    reset () {
      this.$refs.form.reset()
    },
    rules() {
     const rules = [
       (v) => {
          const lowerArray = [];
          for (var i = 0; i < this.kategori.length; i++) {
            lowerArray.push(this.kategori[i]);
          }
          if(v!=null && this.isNewAdd){
            const lowercasedInput = v.toLowerCase();
            for (var j = 0; j < lowerArray.length; j++) {
              if(lowerArray[j].nama_kategori.toLowerCase()===lowercasedInput){
                return 'Kategori sudah ada'
              }
            }
          }
          return true
        },
        (v) => (!!v || "") || 'Kategori tidak boleh kosong',
        
      ]
      return rules;
    },

  
    async retrieveKategori() {
      this.loadingItem= true;
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
          this.loadingItem=false;
        }
      } catch (error) {
        console.error(error);
      }
    },

    newItem(){
      this.isNewAdd = true;
      this.urlTemp = null;
      this.url_gambar = null;
      this.url_gambar_ori = null;
      this.dialog = true;
      this.dialogDelete= false;
    },
    
    async editItem(item) {
      if (item.url_gambar_kategori) {
        this.urlTemp = BASE_URL + `/` + item.url_gambar_kategori;
        this.url_gambar = await this.getImageObj(this.urlTemp);
        this.url_gambar_ori = item.url_gambar_kategori;
      }
      this.dialogDelete = false;
      this.editedIndex = this.kategori.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem.id_kategori);
      this.dialog = true;
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.editedIndex = this.kategori.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },

    close() {
      this.isNewAdd = false;
      this.dialog = false;
      this.loading=false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.dialogDelete = false;
        this.reset();
      }, 300);
    },

    async save() {
      this.loading=true;
      if (this.editedIndex > -1) {  // Edited save
        let data = new FormData();
        data.append("namakategori", this.editedItem.nama_kategori);
        data.append("url_gambar_kategori", this.url_gambar);
        const updateResult = await categoriesData.updateKategori(this.editedItem.id_kategori, data, store.getters['admin/getToken']);
        if (updateResult instanceof Error) {
          throw updateResult;
        } else {
          console.error(updateResult);
        }     
      } else {  // New save 
        let data = new FormData();
        data.append("namakategori", this.editedItem.nama_kategori);
        data.append("url_gambar_kategori", this.url_gambar);  
        const addResult = await categoriesData.addKategori(data, store.getters['admin/getToken']);
         if (addResult instanceof Error) {
          throw addResult;
        } else {
          console.error(addResult);
        }
      }
      this.close();
      this.refreshList();
    },

    async remove() {
      this.loading=true;
      if(this.editedIndex>-1){ //delete one
        this.kategori.splice(this.editedIndex, 1);
        await categoriesData.deleteOneKategori(this.editedItem.id_kategori, store.getters['admin/getToken']);
      }
      
      this.close();
      this.refreshList();
      
    },

    async getImageObj(ImageUrl) {
      try {
        const path = require("path");
        const result = await fetch(ImageUrl);
        if (result instanceof Error) throw result;
        const blobObj = await result.blob();
        if (blobObj instanceof Error) throw blobObj;
        return new File([blobObj], path.basename(ImageUrl), {
          type: blobObj.type,
        });
      } catch (error) {
        console.log(error);
      }
    },
    
  },  mounted() {
    this.retrieveKategori();
  },
};
</script>

<style scoped>
.h1{
  font-family: 'Playfair Display';
}
</style>

